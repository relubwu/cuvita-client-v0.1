import * as actions from './actions';
const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/lifestyle/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = "/vendor/fetch";
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
    ]
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
    this.fetchData(this.data.current);
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
  },
  tapFeedback() {
    wx.vibrateShort({});
  },
  fetchData() {
    let that = this;
    wx.showLoading({
      title: localepkg[that.data.locale].loading
    });
    app.request(FETCH_URL, 'GET', {
      realm: 'lifestyle',
      categories: that.data.categories
    }).then(data => {
      that.setData({
        vendors: data
      });
      setTimeout(() => wx.hideLoading(), 1000);
    });
  },
  onPullDownRefresh() {
    let that = this;
    wx.vibrateShort({});
    wx.showNavigationBarLoading();
    app.request(FETCH_URL, 'GET', {
      realm: 'lifestyle',
      categories: that.data.categories
    }).then(data => {
      that.setData({
        vendors: data
      });
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 500);
    });
  }
})