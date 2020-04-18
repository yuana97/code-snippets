function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  // define the routes
  $stateProvider
  // /login => app.login state w/ ctrl, template, statevars
  .state('app.login', {
    url: '/login',
    // use AuthCtrl alias $ctrl
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in'
  })
  // /login => app.register state w/ ctrl, template, statevars
  .state('app.register', {
    url: '/register',
    // use AuthCtrl alias $ctrl
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up'
  });
};

export default AuthConfig;