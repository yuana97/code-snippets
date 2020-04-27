// template reducer configured by action type, state
export default (type, initialData) => (state = {
  loading: true,
  data: initialData || [],
}, action) => {
  console.log(action);
  switch (action.type) {
    // request => trigger loading state
    case `REQUEST/${type}`:
      return {
        ...state,
        loading: true,
      };
    // ok => put data in state
    case `OK/${type}`:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
      };
    // error => put error in state
    case `ERROR/${type}`:
      return {
        ...state,
        error: action.error || true,
        loading: false,
      };
    default:
      return state;
  }
};
