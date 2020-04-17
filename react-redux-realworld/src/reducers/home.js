export default (state = {}, action) => {
  switch (action.type) {
    // add tags to state
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
  }

  return state;
};