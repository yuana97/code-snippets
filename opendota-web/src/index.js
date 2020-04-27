import React from 'react';
import { createBrowserHistory } from 'history';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { getMetadata, getStrings} from './actions';

store.dispatch(getMetadata());
store.dispatch(getStrings());

const history = createBrowserHistory();

const rootElement = document.getElementById('root');

// app component wrapped with providers
const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

// render/hydrate app
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

// remove loader
const loader = document.getElementById('loader');
if (loader) {
  loader.remove();
}