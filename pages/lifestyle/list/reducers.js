import { combineReducers } from '../../../lib/redux.min';
import {
  SWITCH_CATEGORY_LIFESTYLE
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/lifestyle/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_CATEGORY_LIFESTYLE = { value: "salon", index: 0 };

export function currentCategory(state = DEFAULT_CATEGORY_LIFESTYLE, action) {
  switch (action.type) {
    case (SWITCH_CATEGORY_LIFESTYLE):
      return action.current;
      break;
    default:
      return state;
      break;
  }
}

const reducers = combineReducers({
  currentCategory
});

export default reducers;