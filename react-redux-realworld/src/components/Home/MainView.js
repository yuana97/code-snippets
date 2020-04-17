import React from 'react';
import {connect} from 'react-redux';
import ArticleList from '../ArticleList';
import agent from '../../agent';

// feed tab: click => action w/ promise
const YourFeedTab = (props) => {
  // have token => get feed for the user
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      // fire feed action with feed promise
      props.onTabClick('feed', agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a
          href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

// click => all action with allarticles promise
const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        // configure classes based on status
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

// display tag name in tab
const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
}

const mapStateToProps = (state) => ({
  ...state.articleList,
  token: state.common.token,
});

// dispatch tab change action w/ tab type, promise with articles
const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, payload) => dispatch({type: 'CHANGE_TAB', tab, payload}),
});

const MainView = (props) => {
  console.log('mainviewprops', props);
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {/* pass token, activetab, onTabClick to tabs */}
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />
          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
          <TagFilterTab tag={props.tag} />
        </ul>
      </div>

      <ArticleList articles={props.articles} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
