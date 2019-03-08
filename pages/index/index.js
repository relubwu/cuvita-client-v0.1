const app = getApp();
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/index
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Page({
  data: {
    current: Store.getState().global.tabBar.current
  },
  onLoad() {
    this.unsubscribe = Store.subscribe(() => {
      this.setData({
        current: Store.getState().global.tabBar.current
      });
    });
  },
  onUnload() {
    this.unsubscribe();
  }
})
