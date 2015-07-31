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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjectCtrl.awesomeThings.length).toBe(3);
  });
});
