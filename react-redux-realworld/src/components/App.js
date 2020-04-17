import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Home from './Home';
import agent from '../agent';

// race condition: globalfeed shown initially since props.token not set until APP_LOAD action
// gets processed, so modify App component to not render current view until its fetched the
// currently logged in user.

const mapStateToProps = (state) => {
  console.log('appstate', state);
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    // App needs to know when redirect changes
    redirectTo: state.common.redirectTo,
    appLoaded: state.common.appLoaded,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // redirect success => dispatch redirect action
  onRedirect: () => dispatch({type: 'REDIRECT'}),
  // onLoad dispatches app load event
  onLoad: (payload, token) => dispatch({type: 'APP_LOAD', payload, token}),
});

class App extends React.Component {
  // if token's stored in localstorage, set the token in agent,
  componentWillMount() {
    // check if token excists
    const token = window.localStorage.getItem('jwt');
    // if it does, set it
    if (token) {
      agent.setToken(token);
    }
    // if token is set, get current user and token and trigger onLoad function
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  // if we have redirectTo, take router, set current url to redirectTo prop
  // and then dispatch the redirect action
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    console.log('app props', this.props);
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          {this.props.children}
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
