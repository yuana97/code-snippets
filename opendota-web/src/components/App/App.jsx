// npm packages
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route,Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

// sibling files
import constants from '../constants';
import Home from '../Home';

// helpers
import GlobalStyle from './GlobalStyle';
import muiTheme from './muiTheme';

// global app styling
const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  // add space for left panel
  left: ${(props) => (props.open ? '256px' : '0px')};
  margin-top: 0px;
  // display background image on homepage
  background-image: ${(props) =>
    props.location.pathname === '/'
      ? 'url("assets/images/home-background.png")'
      : ''};
  background-position: center top -56px;
  background-repeat: ${(props) =>
    props.location.pathname === '/' ? 'no-repeat' : ''};
`;

// global body styling
const StyledBodyDiv = styled.div`
    padding: 25px;
    flex-grow: 1;

    // at the min width, expand the body to the whole page
    @media only screen and (min-width: ${constants.appWidth}px) {
      width: ${constants.appWidth}px;
      margin: auto;
    }
`;

const App = (props) => {
  console.log('app props', props);
  const { strings, location } = props;

  return (
    <MuiThemeProvider muiTheme = {getMuiTheme(darkBaseTheme, muiTheme)}>
      <GlobalStyle />
      <StyledDiv {...props}>
        <Helmet
          defaultTitle = {strings.title_default}
          titleTemplate = {strings.title_template}
        />
        <StyledBodyDiv {...props}>
          {/* routing */}
          <Switch>
            <Route exact path = "/" component = {Home} />
          </Switch>
        </StyledBodyDiv>
      </StyledDiv>
    </MuiThemeProvider>
  )
}

const mapStateToProps = (state) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(withRouter(App));