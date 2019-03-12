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

App({

  store,
  globalActions: actions,
  localepkg,

  onLaunch: function () {
    if (wx.getStorageSync('version') !== '0.1.5') {
      wx.clearStorageSync();
      wx.setStorage({
        key: 'version',
        data: '0.1.5',
      });
    }
    let that = this;
    that.onAppRoute();
    wx.getSystemInfo({
      success(res) {
        store.dispatch(actions.setSystemInfo(res));
      },
    });
    wx.getNetworkType({
      success({ networkType }) {
        store.dispatch(actions.setNetworkStatus(networkType));
      }
    });
    wx.onNetworkStatusChange(({ networkType }) => {
      store.dispatch(actions.setNetworkStatus(networkType));
    });
    wx.getStorage({
      key: 'memberInfo',
      success(res) {
        store.dispatch(actions.setMemberInfo(res));
      }
    });
    wx.showLoading({
      title: localepkg[store.getState().global.locale].login,
      mask: true
    });
    wx.login({
      success: res => {
        that.request('/dispatch', 'GET', {
          code: res.code
        }).then(data => {
          store.dispatch(actions.setUserInfo(data.userInfo));
          if (!!data.memberInfo) {
            store.dispatch(actions.updateMemberInfo(data.memberInfo));
            wx.setStorage({
              key: 'memberInfo',
              data: data.memberInfo
            });
          }
          wx.hideLoading();
        });
      }
    });
  },

  onAppRoute() {
    wx.onAppRoute(res => {
      res.openType !== 'appLaunch' && store.dispatch(actions.switchPage(res.path, getCurrentPages().length - 1));
    });
  },

  /**
   * 封装wx.request
   * @param directory, Object data, String method
   * @return Promise ? resolve() : reject()
   */
  request(directory, method, data, preventDefault = false) {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: API.concat(directory),
        method: method,
        data: data,
        success(res) {
          resolve(res.data);
        },
        fail(e) {
          if (!preventDefault) {
            that.requestFailed();
          } else {
            reject(e);
          }
        }
      });
    });
  },

  /**
   * 封装请求失败Toast
   */
  requestFailed() {
    wx.showToast({
      title: localepkg[store.getState().global.locale].requestfail,
      image: '/assets/icons/request-fail.png'
    });
  },

  /**
   * 封装请求URL
   * @param e 接口directory
   * @return String request URL
   */
  url(e) {
    return this.globalData.api.concat(e);
  },
  
  globalData: {

  }
})