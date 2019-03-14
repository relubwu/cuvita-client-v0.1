import { combineReducers } from '../../lib/redux.min';
import PAGE_REDUCER_GOURMET_LIST from 'list/reducers';

/**
 * CUVita Client Side Implementations - reducers.js
 * @scope /pages/gourmet
 * @author relubwu
 * @version 0.1.5
 * @copyright  © CHINESE UNION 2019
 */

const reducers = combineReducers({
  list: PAGE_REDUCER_GOURMET_LIST
});

export default reducers;