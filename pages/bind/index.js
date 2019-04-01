const app = getApp();
const { request } = app;
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
    localepkg
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale
    });
    wx.setNavigationBarTitle({
      title: localepkg[that.data.locale].title
    });

  },
  explainCardNo() {
    let that = this;
    wx.showModal({
      title: localepkg[that.data.locale].cardnotitle,
      content: localepkg[that.data.locale].cardnodescription,
      showCancel: !!0,
      confirmColor: '#d1233e'
    });
  }
})