import querystring from 'querystring';

export default function action(type, host, path, params = {}) {
  return dispatch => {
    // configure target url by path and query params
    const url = `${host}/${path}?${typeof params === 'string' ? params.substring(1) : querystring.stringify(params)}`;
    // initiating http request (set loading state)
    const getDataStart = () => ({
      type: `REQUEST/${type}`,
    });
    // got data
    const getDataOk = payload => ({
      type: `OK/${type}`,
      payload,
    });
    // got error
    const getError = error => ({
      type: `ERROR/${type}`,
      error,
    });
    // fetch data and retry on error
    const fetchDataWIthRetry = delay => fetch(url, path === 'api/metadata' ? { credentials: 'include' } : {})
      .then((response) => {
        // add information to the response if it's an error
        // otherwise just jsonify it and pass it on
        if (!response.ok || !response.status) {
          const err = new Error();
          err.fetchError = true;
          dispatch(getError(response.status));
          if (response.status >= 400 && response.status < 500) {
            err.clientError = true;
            err.message = 'fetch failed - client error';
          } else {
            err.message = 'fetch failed - retrying';
          }
          throw err;
        }
        return response.json();
      })
      // load data into state
      .then(json => dispatch(getDataOk(json)))
      .catch((e) => {
        // error => log and try again with an increasing delay
        console.error(e);
        if (e.fetchError && !e.clientError) {
          setTimeout(() => fetchDataWIthRetry(delay + 3000), delay);
        }
        if (!e.fetchError) {
          throw e;
        }
      });
    // initiate request
    dispatch(getDataStart());
    return fetchDataWIthRetry(1000);
  }
}