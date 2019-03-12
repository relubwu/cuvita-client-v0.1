import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');
import QR from "../../miniprogram_npm/wx-base64-qrcode/index";

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/qrcode
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    showDetail: Store.getState().pages.qrcode.showDetail,
    localepkg: localepkg
  },
  onLoad(options) {
    let that = this;
    this.unsubscribe = Store.subscribe(() => {
      this.relaySubscription();
    });
    this.setData({
      locale: Store.getState().global.locale,
      context: QR.createQrCodeImg(options.context || 'https://cuvita.relubwu.com', Store.getState().global.systemInfo.screenWidth * 0.7),
      instruction: options.instruction || localepkg[Store.getState().global.locale].instruction,
      brand: localepkg[Store.getState().global.locale].brand
    });
  },
  relaySubscription() {
    let newState = Store.getState();
    if (this.data.showDetail !== newState.pages.qrcode.showDetail)
      this.setData({
        showDetail: newState.pages.qrcode.showDetail,
      });
  },
  toggleDetail() {
    Store.dispatch(actions.toggleQRCodeDetails());
  }
});