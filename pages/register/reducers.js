import { combineReducers } from '../../lib/redux.min';
import {
  REGISTER_STEP_PROCEED,
  REGISTER_STEP_FALLBACK,
  STEP_ALIAS
} from 'actions';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/me
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const DEFAULT_STEP = { index: 0, alias: STEP_ALIAS[0] };

export function currentStep(state = DEFAULT_STEP, action) {
  switch (action.type) {
    case REGISTER_STEP_PROCEED: 
      return { index: ++state.index, alias: STEP_ALIAS[state.index] };
    break;
    case REGISTER_STEP_FALLBACK:
      return { index: --state.index, alias: STEP_ALIAS[state.index] };
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
