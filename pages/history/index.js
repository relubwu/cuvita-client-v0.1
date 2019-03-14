import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');
const { debounce } = require('../../utils/util');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/index
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_THROTTLE_GROUP = {};
const FETCH_URL = '/membership/fetchHistory';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg: localepkg,
    history: []
  },
  onLoad() {
    this.throttle = DEFAULT_THROTTLE_GROUP;
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({ title: localepkg[that.data.locale].title });
    if (!!Store.getState().global.memberInfo) {
      app.request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid }).then(({ history }) => {
        that.formatHistory(history);
      });
    } else {
      this.setData({
        history: []
      });
    }
  },
  formatHistory(history) {
    let res = [];
    for (let e of history) {
      let time = new Date(e.time).toLocaleDateString('en-US', { month: "short", day: "numeric" });
      let accredited = [...e.accredited.split('.')];
      res.push({ ...e, time, accredited });
    }
    this.setData({
      history: res
    });
    
  },
  tapFeedback({ currentTarget: { dataset } }) {
    let that = this;
    let { id } = dataset;
    let { vendorid } = dataset;
    if (!this.throttle[`${actions.TAP_FEEDBACK}$${id}`]) {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`] = debounce(() =>
        wx.vibrateShort()
        , 250);
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    } else {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    }
    wx.showActionSheet({
      itemList: [localepkg[that.data.locale].visitvendor],
      success(res) {
        switch(res.tapIndex) {
          case 0:
            break;
          default:
            break;
        }
      }
    });
  },
  onPullDownRefresh() {
    let that = this;
    wx.vibrateShort({});
    app.request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid }).then(res => {
      setTimeout(() => {
        wx.stopPullDownRefresh();
        that.formatHistory();
      }, 500);
    });
  }
})