import React, { Component } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  // send add comment action
  onSubmit: payload =>
    dispatch({ type: 'ADD_COMMENT', payload })
});

// onChange => update state, onSubmit => fire action w/ req
class CommentInput extends Component {
  constructor() {
    super();
    // init state
    this.state = {
      body: ''
    };
    // update state
    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    }
    // create => fire onSubmit
    this.createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug,
        { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() { 
    console.log('commentinput props', this.props);
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img" />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}
 
export default connect(() => ({}), mapDispatchToProps)(CommentInput);