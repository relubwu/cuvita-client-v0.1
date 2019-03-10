const app = getApp();
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/qrcode/background
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    systemInfo: Store.getState().global.systemInfo,
  }
})
