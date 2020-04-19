import ArticleList from './ArticleList';
import React, {Component} from 'react';
import {Link} from 'react-router';
import agent from '../agent';
import {connect} from 'react-redux';

// articles, user, profile
const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

// dispatch follow, unfollow, load, unload actions
const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: 'FOLLOW_USER',
      payload: agent.Profile.follow(username),
    }),
  onLoad: (payload) => dispatch({type: 'PROFILE_PAGE_LOADED', payload}),
  onSetPage: (page, payload) => dispatch({type: 'SET_PAGE', page, payload}),
  onUnfollow: (username) =>
    dispatch({
      type: 'UNFOLLOW_USER',
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({type: 'PROFILE_PAGE_UNLOADED'}),
});

// edit profile button
const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

// user => followbutton
const FollowUserButton = (props) => {
  if (props.isUser) {
    return null;
  }

  // fill in if following
  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }
  // click => follow/unfollow actions
  const handleClick = (ev) => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

// mount => put stuff in state, render
class Profile extends Component {
  // on load put profile and articles to state
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.params.username),
        agent.Articles.byAuthor(this.props.params.username),
      ])
    );
  }

  // clear state on unmount
  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.Articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  // render article/favorites tabs
  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser =
      this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    const onSetPage = (page) => this.onSetPage(page);

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" />
                <h1>{profile.username}</h1>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <ArticleList
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                onSetPage={onSetPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile as Profile, mapStateToProps as mapStateToProps };
