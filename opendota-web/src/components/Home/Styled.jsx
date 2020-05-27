import styled from 'styled-components';
import constants from '../constants';

// style headcontainer
export const HeadContainerDiv = styled.div`
  width: 600px;
  height: 300px;
  margin: 0 auto;
  text-align: center;
  padding-top: 120px;

  @media only screen and (max-width: 768px) {
    width: auto;
  }
`;

// style headline
export const HeadlineDiv = styled.div`
  text-transform: uppercase;
  font-size: 90px;
  font-weight: ${constants.fontWeightMedium};
  line-height: 1.2;
  text-shadow: #000 0 0 3px;

  // configure font size for small windows
  @media only screen and (max-width: 425px) {
    font-size: 60px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 42px;
  }
`;

// style description
export const DescriptionDiv = styled.div`
  font-size: ${constants.fontSizeMedium};
  opacity: 0.6;
  font-weight: ${constants.fontWeightLight};
  text-align: center;
`;

// style footer
export const BottomTextDiv = styled.div`
  font-size: ${constants.fontSizeMedium};
  opacity: 0.6;
  font-weight: ${constants.fontWeightLight};
  text-align: right;
`;

// style home buttons
export const ButtonsDiv = styled.div`
  margin-bottom: 30px;
  & .bottomButtons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  & a {
    background-color: ${constants.defaultPrimaryColor} !important;
    border: 2px solid ${constants.textColorPrimary} !important;
    padding: 3px 6px !important;
    height: auto !important;
    margin: 10px 5px !important;

    @media only screen and (max-width: 375px) {
      line-height: 20px !important;
    }

    &:hover {
      background-color: ${constants.colorSuccess} !important;
    }

    & .label {
      font-weight: ${constants.fontWeightLight};
      font-size: ${constants.fontSizeCommon};

      & b {
        font-size: 18px;
        font-weight: ${constants.fontWeightMedium};
      }
    }
  }

  & span {
    text-transform: none !important;
  }

  & svg {
    width: 20px;
    height: 20px;
    fill: ${constants.textColorPrimary};
    vertical-align: sub !important;
  }
`;