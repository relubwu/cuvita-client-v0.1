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
      console.group(` %cpageData %c/page/vitae %c@ ${new Date().toLocaleTimeString("en-US")}`, "font-weight: normal; color: #888888", "font-weight: bold", "font-weight: normal; color: #888888");
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
    },
    onScanQr() {
      wx.scanCode({
        onlyFromCamera: true,
        scanType: ['qrCode'],
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
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
