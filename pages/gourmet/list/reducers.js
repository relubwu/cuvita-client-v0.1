import { combineReducers } from '../../../lib/redux.min';
import {
  SWITCH_CATEGORY_GOURMET
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/gourmet/list
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

export const DEFAULT_CATEGORY_GOURMET = { value: "fastfood", index: 0 };

export function currentCategory(state = DEFAULT_CATEGORY_GOURMET, action) {
  switch (action.type) {
    case (SWITCH_CATEGORY_GOURMET):
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