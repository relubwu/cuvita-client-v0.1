const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo
  },
  onLoad() {
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({
      title: localepkg[this.data.locale].title
    });
  }
});