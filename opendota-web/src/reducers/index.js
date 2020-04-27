import {combineReducers} from 'redux';
import reducer from './reducer';

export default combineReducers({
  metadata: reducer('metadata'),
  strings: (state = {}, action) =>
    action && action.type === 'strings' ? action.payload : state,
});
