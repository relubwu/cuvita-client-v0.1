const app = getApp();
const { request, API } = app;
const Store = app.store;
const localepkg = require('./localepkg');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/bind
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

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
      title: localepkg[that.data.locale].cardnoTitle,
      content: localepkg[that.data.locale].cardnoDescription,
      showCancel: !!0,
      confirmColor: '#d1233e'
    });
  },
  onSubmit({ detail: { value: { cardno, name } } }) {
    let that = this;
    let sanity = { cardno: !!0, name: !!0 }
    if (!cardno) {
      this.setData({
        'errorMessage.cardno': localepkg[that.data.locale].cardnoErrEmpty
      });
    } else if (!!cardno.match(/\D/g)) {
      this.setData({
        'errorMessage.cardno': localepkg[that.data.locale].cardnoErrNonDigit
      });
    } else {
      this.setData({
        'errorMessage.cardno': ''
      });
      sanity.cardno = !0;
    }
    if (!name) {
      this.setData({
        'errorMessage.name': localepkg[that.data.locale].nameErrEmpty
      });
    } else if (!!name.match(/[\$\*]/g)) {
      this.setData({
        'errorMessage.name': localepkg[that.data.locale].nameErrIllegalChar
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
    request(API.URL_MEMBER_BIND, 'POST', {
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
        title: localepkg[that.data.locale].successTitle,
        content: localepkg[that.data.locale].success,
        showCancel: !!0,
        confirmColor: '#d1233e',
        success() {
          wx.reLaunch({
            url: API.URL_PAGE_INDEX
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
        title: localepkg[that.data.locale].failTitle,
        content: localepkg[that.data.locale].fail,
        showCancel: !!0,
        confirmColor: '#d1233e'
      });
    })
  }
})