import * as actions from './actions';
const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/gourmet/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = "/vendor/fetch";

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
    if (this.data.current !== newState.pages.gourmet.list.currentCategory)
      this.setData({
        current: newState.pages.gourmet.list.currentCategory
      });
  },
  handleChangeScroll({ detail: { key } }) {
    Store.dispatch(actions.switchCategory(key));
    this.fetchData(key);
  },
  fetchData(category) {
    let that = this;
    wx.showNavigationBarLoading();
    app.request(FETCH_URL, 'GET', {
      realm: 'gourmet',
      category: category
    }).then(data => {
      that.setData({
        vendors: data
      });
      setTimeout(() => wx.hideNavigationBarLoading(), 1000);
    });
  }
})