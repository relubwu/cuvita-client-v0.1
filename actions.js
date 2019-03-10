/**
 * CUVita Client Side Implementations - action.js
 * @description Root Redux Actions
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

/**
 * Action Types
 */
export const SWITCH_TABBAR = "SWITCH_TABBAR";
export const SWITCH_PAGE = "SWITCH_PAGE";
export const SET_LOCALE = "SET_LOCALE";
export const SET_REGION = "SET_REGION";
export const SET_SYSTEM_INFO = "SET_SYSTEM_INFO";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_NETWORK_STATUS = "SET_NETWORK_STATUS";

/**
 * Tuples
 */
export const DEFAULT_LOCALE =  wx.getStorageSync("locale") || "zh_CN";
export const DEFAULT_LOCALE_MAPPING = ["zh_CN", "en_US"];
export const DEFAULT_REGION = "sd";
export const DEFUALT_TABBAR_ITEMS = [ "discovery", "vitae", "me"];

/**
 * Action Constructors
 */
export function switchTabBar(index) {
  return { type: SWITCH_TABBAR, index };
}

export function switchPage(path, delta) {
  return {type: SWITCH_PAGE, path, delta};
}

export function setLocale(locale) {
  return { type: SET_LOCALE, locale };
}

export function setRegion(region) {
  return {type: SET_REGION, region };
}

export function setSystemInfo(res) {
  return { type: SET_SYSTEM_INFO, res};
} 

export function setUserInfo(res) {
  return { type: SET_USER_INFO, res };
}

export function setNetworkStatus(status) {
  return { type: SET_NETWORK_STATUS, status };
}