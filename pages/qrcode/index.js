const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');
import QR from "../../miniprogram_npm/wx-base64-qrcode/index";

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/qrcode
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const normalize = (x, y, z) => {
  let mag = Math.sqrt(x * x + y * y + z * z);
  // normalization
  x /= mag;
  y /= mag;
  z /= mag;
  return {
    x, y, z
  }
}

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    showInstruction: 0,
    localepkg: localepkg
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
      context: QR.createQrCodeImg(options.context || 'https://cuvita.relubwu.com', Store.getState().global.systemInfo.screenWidth * 0.7),
      instruction: options.instruction || localepkg[Store.getState().global.locale].instruction
    });
    console.group(` %cpageData %c/page/qrcode %c@ ${new Date().toLocaleTimeString("en-US")}`, "font-weight: normal; color: #888888", "font-weight: bold", "font-weight: normal; color: #888888");
    console.log(this.data);
    console.groupEnd();
    wx.startAccelerometer({
      interval: 'ui',
      success() {
        wx.onAccelerometerChange(res => {
          that.setData({
            orientation: normalize(res.x, res.y, res.z)
          });
        });
      }
    });
  },
  onReady() {
    setTimeout(() => {
      this.setData({
        showInstruction: 1
      });
    }, 500);
  },
  onUnload() {
    wx.stopAccelerometer({
      
    });
  }
});