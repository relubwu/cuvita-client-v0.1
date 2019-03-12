import { combineReducers } from '../../lib/redux.min';
import {
  TOGGLE_QRCODE_DETAILS
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_ACTIVE_SETTINGS = false;

export function showDetail(state = DEFAULT_ACTIVE_SETTINGS, action) {
  switch (action.type) {
    case (TOGGLE_QRCODE_DETAILS):
      return !state
      break;
    default:
      return state;
      break;
  }
}

const reducers = combineReducers({
  showDetail
});

export default reducers;