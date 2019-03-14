import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');

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
    this.worker = wx.createWorker('/async/drawqr/index.js');
    this.worker.postMessage({
      context: options.context,
      screenWidth: Store.getState().global.systemInfo.screenWidth
    });
    this.setData({
      locale: Store.getState().global.locale,
      instruction: options.instruction || localepkg[Store.getState().global.locale].instruction,
      brand: localepkg[Store.getState().global.locale].brand
    });
    this.worker.onMessage(context => {
      // 单次渲染完成后直接detach
      that.worker.terminate();
      that.setData({
        ...context
      });
    })
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