import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import React from 'react';
import store from './store';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Article from './components/Article';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import Profile from './components/Profile';
// import ProfileFavorites from './components/ProfileFavorites';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="settings" component={Settings} />
        {/* article detail route */}
        <Route path="article/:id" component={Article} />
        <Route path="@:username" component={Profile} />
        {/* <Route path="@:username/favorites" component={ProfileFavorites} /> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
