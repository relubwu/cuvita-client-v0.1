import * as actions from './actions';
const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');
const { debounce } = require('../../utils/util');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/index
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
    },
    onShowQr() {
      this.tapFeedback({ currentTarget: { dataset: { id: "card" } } });
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/qrcode/index'
        });
      } , 250);
    },
    tapFeedback({ currentTarget: { dataset: { id } } }) {
      if (!this.throttle[`${actions.TAP_FEEDBACK}$${id}`]) {
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`] = debounce(() =>
          wx.vibrateShort()
          , 250);
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
      } else {
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
      }
    },
  }
})
