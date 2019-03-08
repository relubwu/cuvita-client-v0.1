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
    }
  }
})
