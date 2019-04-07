/**
 * NPM Packages
 * @package redux - MIT - https://redux.js.org
 */
import { applyMiddleware, createStore } from '/lib/redux.min';
import ReduxThunk from 'redux-thunk';
import reducers from '/reducers';
import * as actions from '/actions';
import logger from 'redux-logger';
const store = createStore(reducers, applyMiddleware(logger, ReduxThunk));
const API = "https://cuvita.relubwu.com";
const localepkg = require('localepkg');

/**
 * CUVita Client Side Implementations - app.js
 * @description Global WeApp Instance
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DISPATCH_URL = '/dispatch';
const MEMBERINFO_URL = '/member/fetchInfo';

App({

  store,
  globalActions: actions,
  localepkg,

  onLaunch: function () {
    if (wx.getStorageSync('version') !== '0.1.5.2') {
      wx.clearStorageSync();
      wx.setStorage({
        key: 'version',
        data: '0.1.5.2',
      });
    }
    let app = this;
    app.onAppRoute();
    wx.getSystemInfo({
      success(res) {
        store.dispatch(actions.setSystemInfo(res));
      },
    });
    wx.getStorage({
      key: 'memberInfo',
      success({ data }) {
        store.dispatch(actions.setMemberInfo(data));
      }
    })
    wx.getNetworkType({
      success({ networkType }) {
        store.dispatch(actions.setNetworkStatus(networkType));
      }
    });
    wx.onNetworkStatusChange(({ networkType }) => {
      store.dispatch(actions.setNetworkStatus(networkType));
    });
    wx.showLoading({
      title: localepkg[store.getState().global.locale].login,
      mask: true
    });
    this.login()
      .then(code => app.fetchUserInfo(code))
      .then(openid => app.fetchMemberInfo(openid))
      .then(wx.hideLoading);
    wx.getLocation({
      success({ latitude, longitude, accuracy, horizontalAccuracy }) {
        store.dispatch(actions.setGeoLocation({ latitude, longitude, accuracy, horizontalAccuracy }));
      }
    });
  },

  onAppRoute() {
    wx.onAppRoute(res => {
      res.openType !== 'appLaunch' && store.dispatch(actions.switchPage(res.path, getCurrentPages().length - 1));
    });
  },

  /**
   * 封装wx.login()
   */
  login(e) {
    return new Promise((resolve, reject) => {
      wx.login({
        success({ code }) {
          resolve(code);
        }
      });
    });
  },

  /**
   * 封装wx.request()
   * @param directory, Object data, String method
   * @return Promise ? resolve() : reject()
   */
  request(directory, method, data) {
    let app = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: API.concat(directory),
        method,
        data,
        success({ data, statusCode }) {
          if (statusCode === 400 || statusCode === 404 || statusCode === 500)
            reject(statusCode);
          resolve(data);
        },
        fail(e) {
          wx.showToast({
            title: localepkg[store.getState().global.locale].requestfail,
            image: '/assets/icons/request-fail.png'
          });
          reject(e);
        }
      });
    });
  },

  /**
   * 封装wx.requestPayment()
   * @param package, paySign
   */
  requestPayment(prepayId, paySign) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: Date.now().toString(),
        nonceStr: Math.random().toString(32).substring(2, 15) + Math.random().toString(32).substring(2, 15),
        "package": prepayId,
        signType: 'MD5',
        paySign,
        success(res) {
          resolve(res);
        },
        fail(e) {
          reject(e);
        }
      })
    })
  },
  
  /**
   * 封装获取用户登陆态的接口
   * 向服务端的dispatcher进行注册
   * @param code wx.login()回调数据
   */
  fetchUserInfo(code) {
    let app = this;
    return new Promise((resolve, reject) => {
      app.request(DISPATCH_URL, 'GET', { code })
        .then(({ openid, session_key }) => {
          store.dispatch(actions.setUserInfo({ openid, session_key }));
          resolve(openid);
        }).catch(e => console.error(e));
    });
  },

  /**
   * 封装获取会员信息的接口
   * @param openid
   */
  fetchMemberInfo(openid) {
    let app = this;
    return new Promise((resolve, reject) => {
      app.request(MEMBERINFO_URL, 'GET', { openid })
        .then(memberInfo => {
          wx.setStorage({
            key: 'memberInfo',
            data: memberInfo
          })
          resolve(store.dispatch(actions.updateMemberInfo(memberInfo)))
        }).catch(e => {
          wx.removeStorage({
            key: 'memberInfo'
          })
          resolve(store.dispatch(actions.purgeMemberInfo()));
        });
    })
  }

})