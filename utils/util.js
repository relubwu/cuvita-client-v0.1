/**
 * CUVita Client Side Implementations - util.js
 * @description Global Utility Functions
 * @author relubwu
 * @version 0.1.0b
 * @copyright  © CHINESE UNION 2019
 */

function detectSafeAreaInset(model, screenHeight) {
  var iPhoneX = /iphone x/i.test(model);
  var iPhoneNew = /iPhone11/i.test(model) && screenHeight === 812;
  return iPhoneX || iPhoneNew;
}

function debounce(func, delay = 500) {
  var timer = 0;
  return function debouncedFn() {
    if (Date.now() - timer > delay) {
      func();
    }
    timer = Date.now();
  };
}

module.exports = {
  detectSafeAreaInset,
  debounce
}