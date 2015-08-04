'use strict';

/**
 * @ngdoc function
 * @name composerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the composerApp
 */
angular.module('composerApp')
  .controller('AboutCtrl', function ($scope) {
    this.authors = [
      'Raja',
      'Sekar',
      'Gladwin'
    ];
    $scope.authors = this.authors;
    $scope.time = Date.now();
  });
