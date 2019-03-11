const app = getApp();
const Store = app.store;

/**
 * CUVita Client Side Implementations - index.js
 * @scope /pages/qrcode/pane
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    context: {
      type: String
    },
    instruction: {
      type: String,
      value: Store.getState().global.locale
    }
  },
  lifetimes: {
    attached() {
      let that = this;
      wx.startAccelerometer({
        interval: 'ui',
        success() {
          wx.onAccelerometerChange(res => {
            that.setData({
              orientation: that.normalize(res.x, res.y, res.z)
            });
          });
        }
      });
    },
    detached() {
      wx.stopAccelerometer({});
    }
  },
  methods: {
    normalize (x, y, z) {
      let mag = Math.sqrt(x * x + y * y + z * z);
      // normalization
      x /= mag;
      y /= mag;
      z /= mag;
      return {
        x, y, z
      }
    }
  }
})
