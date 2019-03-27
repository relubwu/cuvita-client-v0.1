const app = getApp();
const { request } = app;
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
    request(FETCH_URL, 'GET', { id: options.id }).then(res => {
      this.setData(res);
    }).catch(e => console.error(e));
  }
})