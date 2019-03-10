import { combineReducers } from '../../lib/redux.min';
import {
  TOGGLE_SETTINGS
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_ACTIVE_SETTINGS = "";

export function activeSetting(state = DEFAULT_ACTIVE_SETTINGS, action) {
  switch(action.type) {
    case (TOGGLE_SETTINGS): 
      return action.current;
      break;
    default:
      return state;
      break;
  }
}

const reducers = combineReducers({
  activeSetting
});

export default reducers;