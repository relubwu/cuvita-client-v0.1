import * as actions from './actions';
const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/arrival
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = '/arrival/layout';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg,
    services: []
  },
  onLoad(options) {
    let that = this;
    this.unsubscribe = Store.subscribe(() => {
      this.relaySubscription();
    });
    this.setData({
      locale: Store.getState().global.locale
    });
    wx.showLoading({
      title: app.localepkg[Store.getState().global.locale].loading,
      mask: !0
    });
    request(FETCH_URL, {}).then(services => {
      this.setData({ services });
      wx.hideLoading();
    });
  },
  relaySubscription() {
    let newState = Store.getState();
    if (this.data.currentBanner !== newState.pages.arrival.index.currentBanner)
      this.setData({
        currentBanner: newState.pages.arrival.index.currentBanner
      });
  },
  onScroll({ detail: { scrollTop } }) {
    this.setData({
      scrollTop: scrollTop
    });
  },
  tapFeedback({ currentTarget: { dataset: { is } } }) {
    wx.vibrateShort({});
    Store.dispatch(actions.toggleArrivalBannerDetail(is));
  },
  onUnload() {
    Store.dispatch(actions.resetArrivalBannerDetail());
    this.unsubscribe();
  },
})