import { createGlobalStyle } from 'styled-components';
import constants from '../constants';

const GlobalStyle = createGlobalStyle([`
body {
  background-color: initial;
  text-align: initial;
  display: initial;
  justify-content: initial;
  align-items: initial;
  height: initial;
  width: initial;
  margin: 0;
  font-family: ${constants.fontFamily};
}

a {
  color: ${constants.primaryLinkColor};
  text-decoration: none;
  transition: ${constants.normalTransition};

  &:hover {
    color: color(${constants.primaryLinkColor} lightness(-33%));
  }
}

li {
  list-style-type: none;
}

#root {
  background-color: #192023;
  background-image: -webkit-linear-gradient(to right, #1a2b3e, #141E30);
  background-image: linear-gradient(to right, #1a2b3e, #141E30);
  color: ${constants.primaryTextColor};
  height: 100%;
  in-height: 100vh;
  overflow-x: hidden;
  padding-top: 56px;
}
`]);

export default GlobalStyle;
