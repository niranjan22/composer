'use strict';

/**
 * @ngdoc overview
 * @name composerApp
 * @description
 * # composerApp
 *
 * Main module of the application.
 */
angular
  .module('composerApp', [
    'ngRoute', 'ui.bootstrap', 'change-case', 'ngSanitize', 'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
/*       .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
 */      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
