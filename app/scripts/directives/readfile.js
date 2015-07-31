'use strict';

/**
 * @ngdoc directive
 * @name composerApp.directive:ReadFile
 * @description
 * # ReadFile
 */
angular.module('composerApp')
  .directive('onReadFile', function ($parse) {
    
    return {

        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('change', function() {
                
                var onFileReadFn = $parse(attrs.onReadFile);
                var reader = new FileReader();
                
                reader.onload = function() {
                    var fileContents = reader.result;
                    // invoke parsed function on scope
                    // special syntax for passing in data
                    // to named parameters
                    // in the parsed function
                    // we are providing a value for the property 'contents'
                    // in the scope we pass in to the function
                    scope.$apply(function() {
                        //console.log('test4',fileContents);
                        onFileReadFn(scope, {
                            'contents' : fileContents
                        });
                    });
                };
                reader.readAsText(element[0].files[0]);
            });
        }    
    };
  });
