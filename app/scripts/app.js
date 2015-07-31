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
    'ngRoute', 'ui.bootstrap', 'change-case'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/project', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
