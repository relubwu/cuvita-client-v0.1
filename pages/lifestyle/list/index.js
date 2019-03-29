import * as actions from './actions';
const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/lifestyle/list
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
    current: Store.getState().pages.lifestyle.list.currentCategory,
    categories: [
      "salon",
      "fitness",
      "fashion",
      "game",
      "ktv"
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
    if (this.data.current !== newState.pages.lifestyle.list.currentCategory)
      this.setData({
        current: newState.pages.lifestyle.list.currentCategory
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
    let category = Store.getState().pages.lifestyle.list.currentCategory.value;
    if (!!this.data.vendors[category])
      return;
    wx.showLoading({
      title: localepkg[that.data.locale].loading,
      mask: !0
    });
    request(FETCH_URL, 'GET', {
      realm: 'lifestyle',
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
    let category = Store.getState().pages.lifestyle.list.currentCategory.value;
    request(FETCH_URL, 'GET', {
      realm: 'lifestyle',
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