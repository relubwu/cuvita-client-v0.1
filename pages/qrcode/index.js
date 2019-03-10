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
    console.group(` %cpageData %c/page/qrcode %c@ ${new Date().toLocaleTimeString("en-US")}`, "font-weight: normal; color: #888888", "font-weight: bold", "font-weight: normal; color: #888888");
    console.log(this.data);
    console.groupEnd();
  }
})