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
    console.group(` %cpageData %c/page/me %c@ ${new Date().toLocaleTimeString("en-US")}`, "font-weight: normal; color: #888888", "font-weight: bold", "font-weight: normal; color: #888888");
    console.log(this.data);
    console.groupEnd();
  }
});