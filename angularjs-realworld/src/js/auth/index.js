import angular from 'angular';

// create home module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// include our uirouter config settings
import AuthConfig from './auth.config';
authModule.config(AuthConfig);

// attach controller to the module
import AuthCtrl from './auth.controller';
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;