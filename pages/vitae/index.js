import * as actions from './actions';
const app = getApp();
const { request } = app;
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
const FETCH_URL = '/member/fetchCredit';
const ACCREDIT_URL = 'api.relubwu.com/acc';

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
      if (!!newState.global.memberInfo)
        if (this.data.credit !== newState.global.memberInfo.credit) {
          this.setData({
            credit: newState.global.memberInfo.credit
          })
        }
    },
    onShowQr() {
      this.tapFeedback({ currentTarget: { dataset: { id: "qrcode" } } });
      let context = 
        encodeURIComponent(
          ACCREDIT_URL.concat(`?p=${Store.getState().global.memberInfo.cardno}`)
        );
      wx.navigateTo({
        url: `/pages/qrcode/index?context=${context}`
      });
    },
    onUpdateCredit() {
      let that = this;
      this.tapFeedback({ currentTarget: { dataset: { id: "card" } } });
      wx.showLoading({
        title: localepkg[Store.getState().global.locale].loading,
      });
      request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid })
        .then(credit => {
          Store.dispatch(actions.updateCredit(credit));
          Store.dispatch(app.globalActions.updateMemberInfo(credit));
          wx.hideLoading();
        }).catch(e => console.error(e));
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
    }
  }
})
