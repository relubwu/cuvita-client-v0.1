const app = getApp();
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /custom-nav-bar
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    opacity: {
      type: Number,
      value: 1
    },
    title: {
      type: String,
      value: "CUVita"
    },
    dynamic: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: "bg-primary"
    }
  },
  data: {
    systemInfo: Store.getState().global.systemInfo
  },
  methods: {
    onNavigateBack() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
})
