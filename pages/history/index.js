import * as actions from 'actions';
const app = getApp();
const Store = app.store;
const localepkg = require('localepkg');
const { debounce } = require('../../utils/util');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/index
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_THROTTLE_GROUP = {};
const FETCH_URL = '/membership/fetch';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg: localepkg
  },
  onLoad() {
    this.throttle = DEFAULT_THROTTLE_GROUP;
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
    });
    this.formatHistory();
  },
  formatHistory() {
    let memberInfo = Store.getState().global.memberInfo;
    if (!!memberInfo) {
      let { credit: { history } } = memberInfo;
      let res = [];
      for (let e of history) {
        let time = new Date(e.time).toLocaleDateString('en-US', { month: "short", day: "numeric" });
        let accredited = [...e.accredited.split('.')];
        res.push({ ...e, time, accredited });
      }
      this.setData({
        history: res
      });
    } else {
      this.setData({
        history: []
      });
    }
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
  onPullDownRefresh() {
    let that = this;
    app.request(FETCH_URL, 'GET', { openid: Store.getState().global.userInfo.openid }).then(res => {
      Store.dispatch(app.globalActions.setMemberInfo(res));
      setTimeout(() => {
        wx.stopPullDownRefresh();
        this.formatHistory();
      }, 500);
    });
  }
})