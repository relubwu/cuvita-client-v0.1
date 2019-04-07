const app = getApp();
const { request, API } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/arrival/pickup
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    currentStep: Store.getState().pages.arrival.pickup.currentStep,
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
    this.unsubscribe = Store.subscribe(() => {
      this.relaySubscription();
    });
  },
  onUnload() {
    this.unsubscribe();
  },
  relaySubscription() {
    let newState = Store.getState();
    if (this.data.currentStep !== newState.pages.arrival.pickup.currentStep)
      this.setData({
        currentStep: newState.pages.arrival.pickup.currentStep
      });
  },
  onSubmit({ detail: { value: { cardno, name } } }) {
    let that = this;
  }
})