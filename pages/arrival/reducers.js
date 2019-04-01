import { combineReducers } from '../../lib/redux.min';
import {
  TOGGLE_ARRIVAL_BANNER_DETAIL,
  RESET_ARRIVAL_BANNER_DETAIL
} from './actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/coupon
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_ARRIVAL_BANNER_STATE = "";

export function currentBanner (state = DEFAULT_ARRIVAL_BANNER_STATE, action) {
  switch (action.type) {
    case TOGGLE_ARRIVAL_BANNER_DETAIL:
      if (state != action.is)
        return action.is;
      else
        return DEFAULT_ARRIVAL_BANNER_STATE;
      break;
    case RESET_ARRIVAL_BANNER_DETAIL:
      return DEFAULT_ARRIVAL_BANNER_STATE;
      break;
    default:
      return state;
      break;
  }
}

const SUBPAGE_REDUCER_INDEX = combineReducers({
  currentBanner
});

const reducers = combineReducers({
  index: SUBPAGE_REDUCER_INDEX
});

export default reducers;