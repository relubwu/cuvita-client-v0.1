import { combineReducers } from '../../lib/redux.min';
import {
  SET_DISCOVERY_PAGEDATA,
  PURGE_DISCOVERY_PAGEDATA,
  SHOW_BACKGROUND_LAYER,
  HIDE_BACKGROUND_LAYER,
  START_PULLDOWN_REFRESH,
  STOP_PULLDOWN_REFRESH,
  START_SCROLL_TO_UPPER,
  STOP_SCROLL_TO_UPPER,
  PULLDOWN_REFRESH_IDLE,
  PULLDOWN_REFRESH_ENGAGED,
  SCROLL_TO_UPPER_IDLE,
  SCROLL_TO_UPPER_ENGAGED
} from './actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/discovery
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_PAGEDATA = {
  backgroundBanner: {
    imageSrc: ""
  },
  recommendation: {
    title: {
      zh_CN: " ",
      en_US: " "
    },
    items: [{}, {}, {}, {}]
  },
  feed: {
    items: [{}, {}]
  },
  ready: !!0
}
export const DEFAULT_PULLDOWN_REFRESH = PULLDOWN_REFRESH_IDLE;
export const DEFAULT_SCROLL_TO_UPPER = SCROLL_TO_UPPER_IDLE;

export function pageData(state = DEFAULT_PAGEDATA, action) {
  switch (action.type) {
    case SET_DISCOVERY_PAGEDATA: 
      return { ...state, ...action.data };
      break;
    case PURGE_DISCOVERY_PAGEDATA:
      return DEFAULT_PAGEDATA;
      break;
    default: 
      return state;
      break;
  }
}

export function pullDownRefresh(state = DEFAULT_PULLDOWN_REFRESH, action) {
  switch (action.type) {
    case START_PULLDOWN_REFRESH:
      return PULLDOWN_REFRESH_ENGAGED;
      break;
    case STOP_PULLDOWN_REFRESH:
      return PULLDOWN_REFRESH_IDLE
      break;
    default:
      return state;
  }
}

export function scrollToUpper(state = DEFAULT_SCROLL_TO_UPPER, action) {
  switch (action.type) {
    case START_SCROLL_TO_UPPER:
      return SCROLL_TO_UPPER_ENGAGED;
      break;
    case STOP_SCROLL_TO_UPPER:
      return SCROLL_TO_UPPER_IDLE;
      break;
    default:
      return state;
  }
}

const reducers = combineReducers({
  pageData,
  pullDownRefresh,
  scrollToUpper
})

export default reducers;