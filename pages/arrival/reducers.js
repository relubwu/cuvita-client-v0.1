import { combineReducers } from '../../lib/redux.min';
import SUBPAGE_REDUCER_PICKUP from './pickup/reducers';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/coupon
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const reducers = combineReducers({
  pickup: SUBPAGE_REDUCER_PICKUP
});

export default reducers;