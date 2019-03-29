import * as actions from './actions';
const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/gourmet/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = "/vendor/fetchList";
const DISPLAY_THRESHOLD = 5;

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg,
    current: Store.getState().pages.gourmet.list.currentCategory,
    categories: [
      "fastfood",
      "boba",
      "asia",
      "hotpot",
      "bbq",
      "dimsum",
      "chinese",
      "western"
    ],
    vendors: {}
  },
  onLoad() {
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({
      title: localepkg[this.data.locale].title
    });
    this.unsubscribe = Store.subscribe(() => {
      this.relaySubscription();
    });
    this.fetchData();
  },
  onUnload() {
    this.unsubscribe();
  },
  relaySubscription() {
    let newState = Store.getState();
    if (this.data.current !== newState.pages.gourmet.list.currentCategory)
      this.setData({
        current: newState.pages.gourmet.list.currentCategory
      });
  },
  onChange({ detail: { index } }) {
    let that = this;
    this.tapFeedback();
    Store.dispatch(actions.switchCategory(that.data.categories[index], index));
    this.fetchData();
  },
  tapFeedback() {
    wx.vibrateShort({});
  },
  fetchData() {
    let that = this;
    let category = Store.getState().pages.gourmet.list.currentCategory.value;
    if (!!this.data.vendors[category])
      return;
    wx.showLoading({
      title: localepkg[that.data.locale].loading,
      mask: !0
    });
    request(FETCH_URL, 'GET', {
      realm: 'gourmet',
      category
    }).then(data => {
      that.setData({
        vendors: { ...that.data.vendors, [category]: data }
      });
      setTimeout(() => wx.hideLoading(), 1000);
    }).catch(e => console.error(e));
  },
  onPullDownRefresh() {
    let that = this;
    this.tapFeedback();
    let category = Store.getState().pages.gourmet.list.currentCategory.value;
    request(FETCH_URL, 'GET', {
      realm: 'gourmet',
      category
    }).then(data => {
      that.setData({
        vendors: { ...that.data.vendors, [category]: data }
      });
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 500);
    }).catch(e => console.error(e));
  }
})