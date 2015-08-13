'use strict';

describe('Controller: ProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('composerApp'));

  var ProjectCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    console.log(' $rootScope', $rootScope);
    ProjectCtrl = $controller('ProjectCtrl', {
      
      // place here mocked dependencies
    });
  }));

});
