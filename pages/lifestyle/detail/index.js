const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/gourmet/detail
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const FETCH_URL = '/vendor/fetchDetail';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg: localepkg,
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale,
    });
    wx.setNavigationBarTitle({
      title: localepkg[this.data.locale].title
    });
    request(FETCH_URL, 'GET', {
      vendorid: options.vendorid
    }).then(res => {
      that.setData({
        ...res,
        markers: [
          {
            id: 0,
            latitude: res.geoLocation.lat,
            longitude: res.geoLocation.long,
            iconPath: '/assets/icons/vendor-pin.png',
            width: 75,
            height: 75
          }
        ]
      });
    }).catch(e => console.error());
  },
  onUnload() {

  },
  call() {
    wx.vibrateShort();
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber
    });
  },
  navigate() {
    wx.vibrateShort();
    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude
    });
  },
  preview({ currentTarget }) {
    let that = this;
    wx.previewImage({
      urls: that.data.gallery,
      current: that.data.gallery[currentTarget.dataset.index]
    });
  },
  onNavigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})