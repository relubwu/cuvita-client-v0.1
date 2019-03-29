import * as actions from 'actions';
const app = getApp();
const { request } = app;
const Store = app.store;
const localepkg = require('./localepkg');
const { debounce } = require('../../utils/util');

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/discovery
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const REQUEST_PAGEDATA_BANNER = "/feed/fetchBanner";
const REQUEST_PAGEDATA_SEARCH = "/feed/fetchSearch";
const REQUEST_PAGEDATA_RECOMMENDATION = "/feed/fetchRecommendation";
const REQUEST_PAGEDATA_ARTICLES = "/feed/fetchArticles";
const DEFAULT_THROTTLE_GROUP = {};

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    locale: {
      type: String,
      value: Store.getState().global.locale
    }
  },
  data: {
    systemInfo: Store.getState().global.systemInfo,
    network: Store.getState().global.network,
    scrollTop: 0,
    pageData: Store.getState().pages.discovery.pageData,
    localepkg: localepkg,
    pullDownRefresh: Store.getState().pages.discovery.pullDownRefresh,
    scrollToUpper: Store.getState().pages.discovery.scrollToUpper,
    layout: {
      services: [
        {
          is: 'estate',
          icon: '/assets/icons/service-estate.png'
        }, 
        {
          is: 'car',
          icon: '/assets/icons/service-car.png'
        }, 
        {
          is: 'used',
          icon: '/assets/icons/service-used.png'
        }, 
        {
          is: 'finance',
          icon: '/assets/icons/service-finance.png'
        }, 
        {
          is: 'delivery',
          icon: '/assets/icons/service-delivery.png'
        },
        {
          is: 'notes',
          icon: '/assets/icons/service-notes.png'
        }, 
        {
          is: 'extra1',
          icon: '/assets/icons/service-extra1.png'
        },
        {
          is: 'extra2',
          icon: '/assets/icons/service-extra2.png'
        }
      ],
      functions: [
        {
          is: 'arrival',
          icon: '/assets/icons/arrival.png'
        },
        {
          is: 'events',
          icon: '/assets/icons/events.png'
        },
        {
          is: 'gourmet',
          icon: '/assets/icons/gourmet.png',
          url: '/pages/gourmet/list/index'
        },
        {
          is: 'lifestyle',
          icon: '/assets/icons/lifestyle.png',
          url: '/pages/lifestyle/list/index'
        }
      ]
    }
  },
  lifetimes: {
    attached() {
      this.throttle = DEFAULT_THROTTLE_GROUP;
      this.unsubscribe = Store.subscribe(() => {
        this.relaySubscription();
      });
      this.requestPageData();
    },
    unattached() {
      this.unsubscribe();
    }
  },
  methods: {
    relaySubscription() {
      let newState = Store.getState();
      if (this.data.locale !== newState.global.locale)
        this.setData({
          locale: newState.global.locale
        });
      if (this.data.network.connected !== newState.global.network.connected)
        if (!this.data.network.connected && newState.global.network.connected) {
          this.setData({
            network: Store.getState().global.network
          });
          this.requestPageData();
        }
      if (this.data.pullDownRefresh !== newState.pages.discovery.pullDownRefresh)
        this.setData({
          pullDownRefresh: newState.pages.discovery.pullDownRefresh,
        });
      if (this.data.scrollToUpper !== newState.pages.discovery.scrollToUpper)
        this.setData({
          scrollToUpper: newState.pages.discovery.scrollToUpper,
        });
      if (this.data.pageData !== newState.pages.discovery.pageData)
        this.setData({
          pageData: newState.pages.discovery.pageData,
        });
    },
    requestPageData() {
      request(REQUEST_PAGEDATA_BANNER, 'GET', {}).then(data => {
        Store.dispatch(actions.setPageData({ banner: data }));
      }).catch(e => console.error(e));
      request(REQUEST_PAGEDATA_SEARCH, 'GET', {}).then(data => {
        Store.dispatch(actions.setPageData({ search: data }));
      }).catch(e => console.error(e));
      request(REQUEST_PAGEDATA_RECOMMENDATION, 'GET', {}).then(data => {
        Store.dispatch(actions.setPageData({ recommendation: data }));
      }).catch(e => console.error(e));
      request(REQUEST_PAGEDATA_ARTICLES, 'GET', {}).then(data => {
        Store.dispatch(actions.setPageData({ feed: data }));
      }).catch(e => console.error(e));
    },
    onScroll({ detail: { scrollTop } }) {
      this.setData({
        scrollTop: scrollTop
      });
    },
    onScrollToUpper({ detail }) {
      if (!this.throttle.scrollToUpper) {
        this.throttle.scrollToUpper = debounce(() => {
          wx.vibrateShort();
          if (this.data.pullDownRefresh != actions.SCROLL_TO_UPPER_ENGAGED) {
            Store.dispatch(actions.startScrollToUpper());
          }
        }, 1000);
        this.throttle.scrollToUpper();
      } else {
        this.throttle.scrollToUpper();
      }
    },
    onScrollReleased({ detail }) {
      if (this.data.scrollToUpper == actions.SCROLL_TO_UPPER_ENGAGED) {
        Store.dispatch(actions.stopScrollToUpper());
        if (this.data.pullDownRefresh != actions.PULLDOWN_REFRESH_ENGAGED) {
          this.pullDownRefresh();
        }
      }
    },
    tapFeedback({ currentTarget: { dataset: { id } } }) {
      if (!this.throttle[`${actions.TAP_FEEDBACK}$${id}`]) {
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`] = debounce(() =>
          wx.vibrateShort()
        , 250);
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
      } else {
        this.throttle[`${actions.TAP_FEEDBACK}$${id}`]();
      }
    },
    pullDownRefresh() {
      Store.dispatch(actions.startPullDownRefresh());
      wx.showLoading({
        title: localepkg[this.data.locale].pulldownrefresh,
        mask: true
      });
      this.requestPageData();
      setTimeout(() => {
        wx.hideLoading();
        Store.dispatch(actions.stopPullDownRefresh());
      }, 1000);
    }
  }
})
