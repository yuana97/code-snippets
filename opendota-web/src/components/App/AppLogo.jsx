import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';

// logo style
const StyledLink = styled(Link)`
  font-weight: ${constants.fontWeightMedium};
  color: ${constants.textColorPrimary};
  text-transform: uppercase;

  &:hover {
    color: ${constants.textColorPrimary};
    opacity: 0.6;
  }
`;

// render logo
const AppLogo = ({ size, strings, onClick }) => (
  <StyledLink to="/" onClick={onClick}>
    <span style={{ fontSize: size }}>
      {strings.app_name && `<${strings.app_name}/>`}
    </span>
  </StyledLink>
);

// type enforcement
AppLogo.propTypes = {
  size: PropTypes.string,
  strings: PropTypes.shape({}),
  onClick: PropTypes.func,
};

// extract strings from state
const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(AppLogo);