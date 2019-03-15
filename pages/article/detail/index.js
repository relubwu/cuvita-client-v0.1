const app = getApp();
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/article/detail
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

let imgPreviewList;
const _generateImgPreviewList = (data) => {
  let resultArray = [];
  for (let i of data) {
    if (i.nodeType == 'article__img' && i.previewable) {
      resultArray.push(i.src);
    }
  }
  return resultArray;
}

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo
  },
  onLoad: function (options) {
    let that = this;
    app.request('/content/fetch', 'GET', { id: options.id }).then(res => {
      this.setData(res);
      imgPreviewList = _generateImgPreviewList(res.data);
    });
  },
  onShareAppMessage: function () {

  },
  previewImage({ currentTarget: { dataset } }) {
    if (dataset.previewable) {
      wx.previewImage({
        current: dataset.url,
        urls: imgPreviewList
      });
    }
  }
})