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

const POST_URL = '/member/bind';
const PAGE_INDEX = '/pages/index/index';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    currentStep: Store.getState().pages.register.currentStep,
    localepkg,
    steps: [{
      zh_CN: '填写信息',
      en_US: 'Informations'
    }, {
      zh_CN: '支付',
      en_US: 'Payment'
    }, {
      zh_CN: '完成注册',
      en_US: 'Success'
    }]
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
    if (this.data.currentStep !== newState.pages.register.currentStep)
      this.setData({
        currentStep: newState.pages.register.currentStep
      });
  },
  onSubmit({ detail: { value: { name, email, tel } } }) {
    let sanity = !!0;
    if (!name) {
      sanity = !!0;
      this.setData({
        ['errorMessage.name']: localepkg[this.data.locale].nameErrEmpty
      });
    } else if (!!name.match(/\$/g)) {
      sanity = !!0;
      this.setData({
        ['errorMessage.name']: localepkg[this.data.locale].nameErrIllegalChar
      });
    } else {
      this.setData({
        ['errorMessage.name']: ''
      });
      sanity = !0;
    }
    if (!email) {
      sanity = !!0;
      this.setData({
        ['errorMessage.email']: localepkg[this.data.locale].emailErrEmpty
      });
    } else if (!email.match(/\w+\@\w+\.\w+/g)) {
      sanity = !!0;
      this.setData({
        ['errorMessage.email']: localepkg[this.data.locale].emailErrIllegalChar
      });
    } else {
      this.setData({
        ['errorMessage.name']: ''
      });
      sanity = !0;
    }
    if (!!tel && !!tel.match(/\$/g)) {
      sanity = !!0;
      this.setData({
        ['errorMessage.tel']: localepkg[this.data.locale].telErrIllegalChar
      });
    }
  }
})