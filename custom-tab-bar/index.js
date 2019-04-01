const app = getApp();
const localepkg = require('./localepkg');
const Store = app.store;
const DEFAULT_PAGE_PATH = [
  "/pages/discovery",
  "/pages/card",
  "/pages/me"
];
const LANDING_PAGE_PATH = '/pages/landing/index';

/**
 * CUVita Client Side Implementations - custom-tab-bar.js
 * @scope /custom-tab-bar
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    locale: {
      type: String,
      value: Store.getState().global.locale
    },
    current: {
      type: Number,
      value: Store.getState().global.tabBar.current
    }
  },
  data: {
    systemInfo: Store.getState().global.systemInfo,
    localepkg: localepkg,
    items: [
      {
        name: 'discovery',
        icon: '/assets/icons/tab-discovery-ia.png',
        iconActive: '/assets/icons/tab-discovery-a.png'
      },
      {
        name: 'vitae',
        icon: '/assets/icons/tab-vitae-ia.png',
        iconActive: '/assets/icons/tab-vitae-a.png'
      },
      {
        name: 'me',
        icon: '/assets/icons/tab-me-ia.png',
        iconActive: '/assets/icons/tab-me-a.png'
      },
    ]
  },
  lifetimes: {
    attached() {
      this.unsubscribe = Store.subscribe(() => {
        this.setData({
          locale: Store.getState().global.locale,
          current: Store.getState().global.tabBar.current
        });
      });
    },
    unattached() {
      this.unsubscribe()
    }
  },
  methods: {
    onSwitch({ currentTarget: { dataset } }) {
      if(dataset.index == 1 && !Store.getState().global.memberInfo)
        wx.navigateTo({
          url: LANDING_PAGE_PATH
        });
      else
        app.store.dispatch(app.globalActions.switchTabBar(dataset.index));
    }
  }
});