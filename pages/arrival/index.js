import * as actions from './actions';
const app = getApp();
const { request, API } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/arrival
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg,
    services: []
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale
    });
    wx.showLoading({
      title: app.localepkg[Store.getState().global.locale].loading,
      mask: !0
    });
    request(API.URL_ARRIVAL_LAYOUT, {}).then(services => {
      this.setData({ services });
      wx.hideLoading();
    });
  },
  onScroll({ detail: { scrollTop } }) {
    this.setData({
      scrollTop: scrollTop
    });
  },
  tapFeedback({ currentTarget: { dataset: { is } } }) {
    wx.vibrateShort({});
  }
})