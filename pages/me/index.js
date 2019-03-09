import * as actions from './actions';
const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

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
      console.group(` %cpageData %c/page/me %c@ ${new Date().toLocaleTimeString("en-US")}`, "font-weight: normal; color: #888888", "font-weight: bold", "font-weight: normal; color: #888888");
      console.log(this.data);
      console.groupEnd();
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
    setLocale({ detail: { index } }) {
      wx.showLoading({
        title: localepkg[this.data.locale].setlocale
      });
      wx.setStorage({
        key: 'locale',
        data: app.globalActions.DEFAULT_LOCALE_MAPPING[index],
      });
      setTimeout(() => {
        Store.dispatch(app.globalActions.setLocale(app.globalActions.DEFAULT_LOCALE_MAPPING[index]));
        wx.hideLoading();
      }, 1000);
    }
  }
})
