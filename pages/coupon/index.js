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
    currentCoupon: Store.getState().pages.coupon.currentCoupon,
    localepkg: localepkg,
    coupons: []
  },
  onLoad() {
    this.throttle = DEFAULT_THROTTLE_GROUP;
    let that = this;
    this.unsubscribe = Store.subscribe(() => {
      this.relaySubscription();
    });
    this.worker = wx.createWorker('/async/drawqr/index.js');
    this.setData({
      locale: Store.getState().global.locale
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
  onUnload() {
    Store.dispatch(actions.resetCouponDetail());
    this.unsubscribe();
    this.worker.terminate();
  },
  relaySubscription() {
    let newState = Store.getState();
    if (this.data.currentCoupon !== newState.pages.coupon.currentCoupon)
      this.setData({
        currentCoupon: newState.pages.coupon.currentCoupon,
      });
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
    Store.dispatch(actions.toggleCouponDetail(id));
    if (!this.throttle[`${actions.TAP_FEEDBACK}$${id}`]) {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`] = debounce(() =>
        wx.vibrateShort()
        , 250);
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    } else {
      this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
    }
    this.worker.postMessage({
      context: `https://cuvita.relubwu.com/coupon/use?id=${id}`,
      screenWidth: Store.getState().global.systemInfo.screenWidth
    });
    this.worker.onMessage(context => {
      this.setData({
        ...context
      });
    });
  },
  showActionList({ currentTarget: { dataset } }) {
    let that = this;
    let { id, vendorid, realm } = dataset;
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
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: `/pages/${realm}/detail/index?vendorid=${vendorid}`
            });
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
        that.formatCoupons();
      }, 500);
    });
  }
})