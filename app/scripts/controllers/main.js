'use strict';

/**
 * @ngdoc function
 * @name composerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the composerApp
 */
angular.module('composerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.time = Date.now();
  });
