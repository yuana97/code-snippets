import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { ButtonsDiv } from './Styled';
import { IconSteam } from '../Icons';

const Buttons = ({ user, strings }) => {
  console.log('home buttons props', user, strings);
  return (<ButtonsDiv>
    {/* only show the login button if the user isn't logged in */}
    {
      !user &&
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_login}</b> {strings.home_login_desc}</span>}
          icon={<IconSteam />}
          href={`${process.env.REACT_APP_API_HOST}/login`}
        />
      </div>
    }
    <div className="bottomButtons">
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_parse}</b> {strings.home_parse_desc}</span>}
          containerElement={<Link to="/request">{strings.home_parse}</Link>}
        />
      </div>
    </div>
  </ButtonsDiv>);
}

Buttons.propTypes = {
  user: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { data } = state.app.metadata;
  return {
    user: data.user,
    strings: state.app.strings,
  };
};

export default connect(mapStateToProps, null)(Buttons);
