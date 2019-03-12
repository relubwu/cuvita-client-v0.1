import { combineReducers } from '../../lib/redux.min';
import { 
  TOGGLE_COUPON_DETAIL,
  RESET_COUPON_DETAIL
} from './actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/coupon
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_COUPON_STATE = "";

export function currentCoupon (state = DEFAULT_COUPON_STATE, action) {
  switch (action.type) {
    case TOGGLE_COUPON_DETAIL: 
      if (state !== action.id)
        return action.id;
      else
        return DEFAULT_COUPON_STATE;
      break;
    case RESET_COUPON_DETAIL:
      return DEFAULT_COUPON_STATE;
      break;
    default: 
      return state;
      break;
  }
}

const reducers = combineReducers({
  currentCoupon
});

export default reducers;