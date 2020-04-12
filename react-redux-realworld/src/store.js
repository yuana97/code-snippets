import { applyMiddleware, createStore, combineReducers } from 'redux';
// import localstoragemiddleware to use in store
import { localStorageMiddleware, promiseMiddleware } from './middleware';

import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/articleList';
import profile from './reducers/profile';

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  article,
  articleList,
  profile,
});

// add localstoragemiddleware to applymiddleware
const store = createStore(reducer, applyMiddleware(promiseMiddleware, localStorageMiddleware));

export default store;