// contains stuff which redirects to homepage
const defaultState = {
  appName: 'Conduit',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // on load store token, set loaded state to true, store user
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    // on redirect set dest to null
    case 'REDIRECT':
      return { ...state, redirectTo: null };
    case 'LOGOUT':
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    // login => set redirect dest to home, set the token, set the user info
    case 'SETTINGS_SAVED':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    // redirect to home after delete
    case 'DELETE_ARTICLE':
      return { ...state, redirectTo: '/' };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
  }
  return state;
};