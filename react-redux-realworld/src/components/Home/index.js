import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Tags from './Tags';
import MainView from './MainView';
import Banner from './Banner';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  // have token => default tab = feed, else default tab = all
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  // dispatch filter method with promise
  onClickTag: (tag, payload) =>
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
  onLoad: (tab, payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
  onUnload: () =>
    dispatch({ type: 'HOME_PAGE_UNLOADED' })
});

class Home extends Component {
  // call api, dispatch action with payload, middleware extracts data from promise,
  // it hits the reducer and gets added to articles in global state, redux updates
  // MainView's props, MainView renders an article list with the new articles.
  componentWillMount() {
    // configure tab and promise for homepage
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed() :
      agent.Articles.all();
    // load tab, promise
    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
  }

  render() { 
    return (  
      <div className="home-page">
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                {/* pass tags, clickhandler to Tags */}
                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home);