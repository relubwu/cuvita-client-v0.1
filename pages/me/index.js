import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_THROTTLE_GROUP = {};

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    locale: {
      type: String,
      value: Store.getState().global.locale
    }
  },
  data: {
    systemInfo: Store.getState().global.systemInfo,
    activeSetting: Store.getState().pages.me.activeSetting,
    layout: {
      localeOptions: ['简体中文', 'English']
    },
    localepkg: localepkg
  },
  lifetimes: {
    attached() {
      this.throttle = DEFAULT_THROTTLE_GROUP;
      this.unsubscribe = Store.subscribe(() => {
        this.relaySubscription();
      });
    },
    unattached() {
      this.unsubscribe();
    }
  },
  methods: {
    relaySubscription() {
      let newState = Store.getState();
      if (this.data.locale !== newState.global.locale)
        this.setData({
          locale: newState.global.locale
        });
      if (this.data.activeSetting !== newState.pages.me.activeSetting)
        this.setData({
          activeSetting: newState.pages.me.activeSetting
        });
    },
    toggleSettings({ detail }) {
      Store.dispatch(actions.toggleSettings(detail));
    },
    setLocale({ currentTarget: { dataset: { locale } } }) {
      wx.showLoading({
        title: localepkg[this.data.locale].setlocale,
        mask: true
      });
      wx.setStorage({
        key: 'locale',
        data: locale,
      });
      setTimeout(() => {
        Store.dispatch(app.globalActions.setLocale(locale));
        wx.hideLoading();
      }, 1000);
    }
  }
})
