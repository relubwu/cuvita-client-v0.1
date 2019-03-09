const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

Page({
  data: {
    locale: Store.getState().global.locale,
    systemInfo: Store.getState().global.systemInfo
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: localepkg[this.data.locale].title
    });
  }
});