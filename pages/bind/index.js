const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/bind
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const POST_URL = '/member/bind';
const PAGE_INDEX = '/pages/index/index';

Page({
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg
  },
  onLoad(options) {
    let that = this;
    this.setData({
      locale: Store.getState().global.locale
    });
    wx.setNavigationBarTitle({
      title: localepkg[that.data.locale].title
    });

  },
  explainCardNo() {
    let that = this;
    wx.showModal({
      title: localepkg[that.data.locale].cardnotitle,
      content: localepkg[that.data.locale].cardnodescription,
      showCancel: !!0,
      confirmColor: '#d1233e'
    });
  },
  onSubmit({ detail: { value: { cardno, name } } }) {
    let that = this;
    let sanity = { cardno: !!0, name: !!0 }
    if (!cardno) {
      this.setData({
        'errorMessage.cardno': localepkg[that.data.locale].cardnoerrempty
      });
    } else if (!!cardno.match(/\D/g)) {
      this.setData({
        'errorMessage.cardno': localepkg[that.data.locale].cardnoerrnondigit
      });
    } else {
      this.setData({
        'errorMessage.cardno': ''
      });
      sanity.cardno = !0;
    }
    if (!name) {
      this.setData({
        'errorMessage.name': localepkg[that.data.locale].nameerrempty
      });
    } else if (!!name.match(/[\$\*]/g)) {
      this.setData({
        'errorMessage.name': localepkg[that.data.locale].nameerrillegalchar
      });
    } else {
      this.setData({
        'errorMessage.name': ''
      });
      sanity.name = !0;
    }
    if (!sanity.cardno || !sanity.name)
      return;
    wx.showLoading({
      title: localepkg[that.data.locale].loading,
      mask: !0
    });
    request(POST_URL, 'POST', {
      cardno,
      name,
      openid: Store.getState().global.userInfo.openid
    }).then(memberInfo => {
      wx.hideLoading();
      wx.setStorage({
        key: 'memberInfo',
        data: memberInfo
      });
      Store.dispatch(app.globalActions.updateMemberInfo(memberInfo));
      wx.showModal({
        title: localepkg[that.data.locale].successtitle,
        content: localepkg[that.data.locale].success,
        showCancel: !!0,
        confirmColor: '#d1233e',
        success() {
          wx.redirectTo({
            url: PAGE_INDEX
          });
        }
      });
    }).catch(e => {
      wx.hideLoading();
      wx.removeStorage({
        key: 'memberInfo'
      });
      Store.dispatch(app.globalActions.purgeMemberInfo());
      wx.showModal({
        title: localepkg[that.data.locale].failtitle,
        content: localepkg[that.data.locale].fail,
        showCancel: !!0,
        confirmColor: '#d1233e'
      });
    })
  }
})