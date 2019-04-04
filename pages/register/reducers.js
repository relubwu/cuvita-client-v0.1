import { combineReducers } from '../../lib/redux.min';
import {
  REGISTER_STEP_PROCEED,
  REGISTER_STEP_ROLLBACK
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_STEP = 0;

export function currentStep(state = DEFAULT_STEP, action) {
  switch (action.type) {
    case REGISTER_STEP_PROCEED: 
      return ++state;
    break;
    case REGISTER_STEP_ROLLBACK:
      return --state;
    break;
    default:
      return state;
    break;
  }
}

const reducers = combineReducers({
  currentStep
});

export default reducers;
