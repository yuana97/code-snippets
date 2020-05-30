import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
} from '@material-ui/core';
import {BugReport, Menu as MenuIcon, Settings} from '@material-ui/icons';
import LogOutButton from 'material-ui/svg-icons/action/power-settings-new';
import ActionSearch from 'material-ui/svg-icons/action/search';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {GITHUB_REPO} from '../../config';
import AppLogo from '../App/AppLogo';
import constants from '../constants';

const REPORT_BUG_PATH = '//github.com/${GITHUB_REPO}/issues';

// create styling for each major subcomponent of Header
const VerticalAlignToolbar = styled(ToolbarGroup)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VerticalAlignDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${constants.fontWeightNormal};
  height: 100%;
  justify-content: center;
  margin: 0 12px;
  text-align: center;
  position: relative;
`;

const AppLogoWrapper = styled.div`
  // for small screens, remove the applogo from the navigation
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const DropdownMenu = styled(Menu)`
  & .MuiMenu-paper {
    background: ${constants.primarySurfaceColor};
  }
`;

const DropdownMenuItem = styled(MenuItem)`
  color: ${constants.primaryTextColor} !important;
  padding-bottom: 12px !important;
  padding-top: 12px !important;
`;

const ToolbarHeader = styled(Toolbar)`
  backdrop-filter: blur(16px);
  background-color: ${constants.defaultPrimaryColorSolid} !important;
  height: 56px;
  left: 0;
  padding: 8px 16px !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100%;

  & a {
    color: ${constants.primaryTextColor};

    &:hover {
      color: ${constants.primaryTextColor};
      opacity: 0.6;
    }
  }
`;

const MenuContent = styled.div`
  background: ${constants.primarySurfaceColor};
  max-width: 300px;
  height: 100%;
  overflow: auto;
  min-width: 220px;
`;

const MenuLogoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const DrawerLink = styled(Link)`
  color: ${constants.textColorPrimary};
`;

const LinkGroup = ({navbarPages}) => (
  <VerticalAlignToolbar>
    {navbarPages.map((page) => (
      <TabContainer key={page.key}>
        <Link to={page.to}>{page.label}</Link>
        {Boolean(page.feature) && (
          <div
            style={{
              position: 'absolute',
              textTransform: 'uppercase',
              fontSize: '10px',
              top: '-10px',
              right: '0',
              color: 'lightblue',
            }}
          >
            {page.feature}
          </div>
        )}
      </TabContainer>
    ))}
  </VerticalAlignToolbar>
);

LinkGroup.propTypes = {
  navbarPages: PropTypes.shape([{}]),
};

const SettingsGroup = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null); // setanchorel hook
  const buttonRef = useRef(); // ref for anchorEl

  // init the handleclose callback: clear setanchorel
  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton
        ref={buttonRef}
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Settings />
      </IconButton>
      {buttonRef.current && (
        <DropdownMenu
          anchorEl={buttonRef.current}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ style: { maxHeight: 600 }}}
        >
          {children}
        </DropdownMenu>
      )}
    </>
  );
};

const MenuButtonWrapper = styled.div`
  margin-right: 12px;
`;

const LogoGroup = ({ onmenuClick }) => {
  <div style={{ marginRight: 16 }}>
    <VerticalAlignToolbar>
      <MenuButtonWrapper>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      </MenuButtonWrapper>
      <AppLogoWrapper>
        <AppLogo />
      </AppLogoWrapper>
    </VerticalAlignToolbar>
  </div>
};

LogoGroup.propTypes = {
  onMenuClick: PropTypes.func,
};

const ReportBug = ({ strings }) => (
  <DropdownMenuItem
    component="a"
    href={REPORT_BUG_PATH}
    target="_blank" // open in new tab
    rel="noopener noreferrer" // security for opening in new tab
  >
    <BugReport style={{ marginRight: 32, width: 24, height: 24 }} />
    {strings.app_report_bug}
  </DropdownMenuItem>
);

ReportBug.propTypes = {
  strings: PropTypes.shape({}),
};

const LogOut = ({ strings }) => {
  <DropdownMenuItem
    component="a"
    href={`${process.env.REACT_APP_API_HOST}/logout`}
    rel="noopener noreferrer"
  >
    <LogOutButton style={{ marginRight: 32, width: 24, height: 24 }} />
    {strings.app_logout}
  </DropdownMenuItem>
};

LogOut.propTypes = {
  strings: PropTypes.shape({}),
};

const Header = ({ location, disableSearch }) => {
  const [Announce, setAnnounce] = useState(null);
  const [menuIsOpen, setMenuState] = useState(false);
}