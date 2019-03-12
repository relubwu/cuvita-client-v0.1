import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');
const { debounce } = require('../../utils/util');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/coupon
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_THROTTLE_GROUP = {};
const FETCH_URL = '/membership/fetchCoupons';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg: localepkg
  },
  onLoad() {
    this.throttle = DEFAULT_THROTTLE_GROUP;
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({ title: localepkg[that.data.locale].title });
    if (!!Store.getState().global.memberInfo) {
      app.request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid }).then(({ coupons }) => {
        that.formatCoupons(coupons);
      });
    } else {
      this.setData({
        coupons: []
      });
    }
  },
  formatCoupons(coupons) {
    let res = [];
    for (let e of coupons) {
      let d = new Date(e.assigned);
      let assigned = d.toLocaleDateString('en-US', { month: "short", day: "numeric" });
      d.setDate(d.getDate() + e.due);
      let due = d.toLocaleDateString('en-US', { month: "short", day: "numeric" });
      res.push({ ...e, assigned, due });
    }
    this.setData({
      coupons: res
    });
  },
  tapFeedback({ currentTarget: { dataset: { id } } }) {
    if (!this.throttle[`${actions.TAP_FEEDBACK}$${id}`]) {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`] = debounce(() =>
        wx.vibrateShort()
        , 250);
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    } else {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    }
  },
  onPullDownRefresh() {
    let that = this;
    app.request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid }).then(res => {
      setTimeout(() => {
        wx.stopPullDownRefresh();
        that.formatCoupons();
      }, 500);
    });
  }
})