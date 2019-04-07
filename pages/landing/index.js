const app = getApp();
const { request, API } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/bind
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    layout: ['https://cuvita-1254391499.cos.na-siliconvalley.myqcloud.com/landing/banner-discount.png', 'https://cuvita-1254391499.cos.na-siliconvalley.myqcloud.com/landing/banner-vip.png', 'https://cuvita-1254391499.cos.na-siliconvalley.myqcloud.com/landing/banner-gift.png'],
    localepkg
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale
    });
  },
  onBind() {
    wx.navigateTo({
      url: API.URL_PAGE_BIND
    });
  },
  onRegister() {
    wx.navigateTo({
      url: API.URL_PAGE_REGISTER
    });
  }
})