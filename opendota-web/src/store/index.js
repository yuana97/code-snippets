import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
// middleware for async actions
import thunkMiddleware from 'redux-thunk';
import {
  createResponsiveStoreEnhancer,
  createResponsiveStateReducer,
} from 'redux-responsive';
import app from '../reducers';

const reducer = combineReducers({
  app,
  // put browser width in state
  browser: createResponsiveStateReducer(null, {
    extraFields: () => ({
      width: window.innerWidth,
    }),
  }),
});

const composeEnhancers = compose;

export default createStore(
  reducer,
  composeEnhancers(
    createResponsiveStoreEnhancer(),
    applyMiddleware(thunkMiddleware),
  ),
);
