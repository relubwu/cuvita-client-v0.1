const app = getApp();
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/article/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = '/content/fetchList';

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
    app.request(FETCH_URL, 'GET').then(res => {
      that.setData({
        data: res
      });
    })
  }
})