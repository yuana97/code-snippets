// send requests to endpoints

import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

// record the auth token
let token = null;
// middleware: set auth token in requests so server knows which users logged in
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

// wrappers
const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      // attach auth token to header
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      // attacj auth token to header
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

// get count*page results
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const encode = encodeURIComponent;
// methods
const Articles = {
  del: slug => requests.del(`/articles/${slug}`),
  all: page => requests.get(`/articles?${limit(10, page)}`),
  get: slug => requests.get(`/articles/${slug}`),
  // http request articles by author
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`),
  // promise resolving to get /articles/feed?limit=10 endpoint
  feed: page =>
    requests.get(`/articles/feed?${limit(10, page)}`)
};

const Tags = {
  getAll: () => requests.get('/tags')
}

const Profile = {
  // post to follow user
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  // get user profile
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
}

const Auth = {
  // request to /user route
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/users', {user: {username, email, password}}),
  save: user => requests.put('/user', {user}),
};

const Comments = {
  // post comment to article's endpoint
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  forArticle: slug => requests.get(`/articles/${slug}/comments`),
  // delete to endpoint for article/commentId
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  // sets local token to provided token
  setToken: _token => {
    token = _token;
  },
};
