import { combineReducers } from './lib/redux.min';
import {
  SWITCH_TABBAR,
  SWITCH_PAGE,
  SET_LOCALE,
  SET_REGION,
  DEFAULT_LOCALE,
  DEFAULT_REGION,
  SET_SYSTEM_INFO,
  SET_USER_INFO,
  UPDATE_USER_INFO,
  SET_MEMBER_INFO,
  UPDATE_MEMBER_INFO,
  SET_NETWORK_STATUS
} from './actions';
import PAGE_REDUCER_DISCOVERY from './pages/discovery/reducers';
import PAGE_REDUCER_ME from './pages/me/reducers';
import PAGE_REDUCER_QRCODE from './pages/qrcode/reducers';
import PAGE_REDUCER_COUPON from './pages/coupon/reducers';
import PAGE_REDUCER_GOURMET from './pages/gourmet/reducers';
const { detectSafeAreaInset } = require('./utils/util');

/**
 * CUVita Client Side Implementations - reducers.js
 * @description Root Redux Reducers
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */
 
const DEFAULT_TABBAR = { current: 0 };
const DEFAULT_ROUTER = { path: "/pages/index/index", delta: 0 };
const DEFAULT_SYSTEM_INFO = null;
const DEFAULT_USER_INFO = null;
const DEFAULT_MEMBER_INFO = null;
const DEFAULT_NETWORK = { connected: true, type: null };

/**
 * Global Reducers
 */
function tabBar (state = DEFAULT_TABBAR, action) {
  switch (action.type) {
    case SWITCH_TABBAR: 
      return { ...state, current: action.index };
      break;
    default: 
      return state;
      break;
  }
}

function router (state = DEFAULT_ROUTER, action) {
  switch (action.type) {
    case SWITCH_PAGE: 
      return { path: action.path, delta: action.delta };
      break;
    default: 
      return state;
      break;
  }
}

function locale (state = DEFAULT_LOCALE, action) {
  switch (action.type) {
    case SET_LOCALE:
      return action.locale;
      break;
    default: 
      return state;
      break;
  }
}

function region (state = DEFAULT_REGION, action) {
  switch (action.type) {
    case SET_REGION: 
      return action.region;
      break;
    default: 
      return state;
      break;
  }
}

function systemInfo (state = DEFAULT_SYSTEM_INFO, action) {
  switch (action.type) {
    case SET_SYSTEM_INFO:
      let { res } = action;
      return {
        fontSizeSetting: res.fontSizeSetting,
        screenHeight: res.screenHeight,
        screenWidth: res.screenWidth,
        statusBarHeight: res.statusBarHeight,
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        safeAreaInset: detectSafeAreaInset(res.model, res.screenHeight),
        navigationBarHeight: detectSafeAreaInset(res.model, res.screenHeight) ? 88 : 64
      };
      break;
    default: 
      return state;
      break;
  }
}

function userInfo (state = DEFAULT_USER_INFO, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...action.res };
      break;
    case UPDATE_USER_INFO:
      return { ...action.res };
      break;
    default: 
      return state;
      break;
  }
}

function memberInfo (state = DEFAULT_MEMBER_INFO, action) {
  switch (action.type) {
    case SET_MEMBER_INFO:
      return { ...action.res };
      break;
    case UPDATE_MEMBER_INFO:
      return { ...action.res };
      break;
    default:
      return state;
      break;
  }
}

function network (state = DEFAULT_NETWORK, action) {
  switch (action.type) {
    case SET_NETWORK_STATUS:
      let connected = !0;
      if (action.status != 'wifi' &&
          action.status != '4g' &&
          action.status != '3g')
        connected = !!0;
      return {  connected, type: action.status };
      break;
    default:
      return state;
      break;
  }
}

const GLOBAL_REDUCERS = combineReducers({
  tabBar,
  router,
  locale,
  systemInfo,
  userInfo,
  memberInfo,
  network
});

/**
 * Page Reducers
 */
const PAGE_REDUCERS = combineReducers({
  discovery: PAGE_REDUCER_DISCOVERY,
  me: PAGE_REDUCER_ME,
  qrcode: PAGE_REDUCER_QRCODE,
  coupon: PAGE_REDUCER_COUPON,
  gourmet: PAGE_REDUCER_GOURMET
});

/**
 * Export
 */
const reducers = combineReducers({
  global: GLOBAL_REDUCERS,
  pages: PAGE_REDUCERS
});

export default reducers;
