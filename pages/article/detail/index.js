const app = getApp();
const { request, API } = app;
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/article/detail
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = "/article/fetchDetail";

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo
  },
  onLoad: function (options) {
    let that = this;
    wx.showNavigationBarLoading();
    request(API.URL_ARTICLE_DETAIL, 'GET', { id: options.id }).then(res => {
      this.setData(res);
      wx.hideNavigationBarLoading();
    }).catch(e => console.error(e));
  }
})