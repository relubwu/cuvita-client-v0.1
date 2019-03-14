import { combineReducers } from '../../lib/redux.min';
import PAGE_REDUCER_GOURMET_LIST from 'list/reducers';

const reducers = combineReducers({
  list: PAGE_REDUCER_GOURMET_LIST
});

export default reducers;