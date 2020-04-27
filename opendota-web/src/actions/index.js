import action from "./action";
import { langs } from '../lang';

export const getMetadata = () => action('metadata', process.env.REACT_APP_API_HOST, 'api/metadata');
export const getStrings = () => async (dispatch) => {
  // find i18n map for the given lang
  const getLang = lang => langs.find(item => item.value === lang);
  // get set language. default to english.
  const savedLang = window.localStorage && window.localStorage.getItem('localization');
  const userLang = window.navigator.language;
  const defaultLang = langs[0];
  const lang = getLang(savedLang) || getLang(userLang) || defaultLang;

  const defData = await import(`../lang/${defaultLang.value}.json`);
  const selData = await import(`../lang/${lang.value}.json`);

  dispatch({ type: 'strings', payload: { ...defData, ...selData }});
};