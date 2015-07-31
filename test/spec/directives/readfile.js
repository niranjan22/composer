'use strict';

describe('Directive: ReadFile', function () {

  // load the directive's module
  beforeEach(module('composerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-read-file></-read-file>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ReadFile directive');
  }));
});
