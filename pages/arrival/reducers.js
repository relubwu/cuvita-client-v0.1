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


const SUBPAGE_REDUCER_INDEX = combineReducers({
  
});

const reducers = combineReducers({
  index: SUBPAGE_REDUCER_INDEX
});

export default reducers;