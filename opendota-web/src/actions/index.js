import action from "./action";
import { addLeadingSlash } from "history/PathUtils";
import { langs } from '../lang';

export const getMetadata = () => action('metadata', process.env.REACT_APP_API_HOST, 'api/metadata');
export const getStrings = () => async (dispatch) => {
  // find i18n map for the given lang
  const getLang = lang => langs.find(item => item.value === lang);
}