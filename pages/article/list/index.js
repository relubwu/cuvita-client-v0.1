const app = getApp();
const { request, API } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/article/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg,
  },
  onLoad() {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({
      title: localepkg[this.data.locale].title
    });
    wx.showNavigationBarLoading();
    request(API.URL_ARTICLE_LIST, 'GET').then(res => {
      that.setData({
        data: res
      });
      wx.hideNavigationBarLoading();
    }).catch(e => console.error(e));
  }
})