import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import MainView from './MainView';
import Banner from './Banner';

const mapStateToProps = state => ({
  appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'HOME_PAGE_LOADED', payload })
});

class Home extends Component {
  // call api, dispatch action with payload, middleware extracts data from promise,
  // it hits the reducer and gets added to articles in global state, redux updates
  // MainView's props, MainView renders an article list with the new articles.
  componentWillMount() {
    this.props.onLoad(agent.Articles.all());
  }

  render() { 
    return (  
      <div className="home-page">
        <Banner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home);