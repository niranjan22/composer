'use strict';

/**
 * @ngdoc function
 * @name composerApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the composerApp
 */
angular.module('composerApp')
  .controller('ProjectCtrl', function ($scope, $modal, $log, changeCase) {
    $scope.project = {name: 'Project1', models: [], views: [], menus: [], controllers: []};

    var taxes = [
            { amount: 25, currencyCode: "USD", decimalPlaces: 1, taxCode: "YRI"},
            { amount: 25, currencyCode: "USD", decimalPlaces: 2, taxCode: "YRI"},
            { amount: 10, currencyCode: "USD", decimalPlaces: 3, taxCode: "YRI"}
        ];
        
    var totalTaxes = taxes.reduce(function (sum, tax) {
        return sum + tax.decimalPlaces + tax.amount;
    }, 0);

    
    console.log('taxes.reduce', totalTaxes);
    
    $scope.selectedModel = null;
    $scope.selectedModelIndex = null;
    $scope.selectedView = null;
    $scope.selectedViewIndex = null;    
    
    $scope.saveJSON = function () {
			$scope.toJSON = '';
			$scope.toJSON = angular.toJson($scope.project);
      var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });			
			var downloadLink = angular.element('<a></a>');
                        downloadLink.attr('href',window.URL.createObjectURL(blob));
                        downloadLink.attr('download', $scope.project.name + '.json');
			downloadLink[0].click();
		};    
    
    $scope.viewJSON = function () {
      $scope.viewJSONValue = !$scope.viewJSONValue;
    };
    
    $scope.print = function() {
      window.print()
    }     
    
    $scope.displayFileContents = function(contents) {
      var c = angular.fromJson(contents);
      //c.projectdate = new Date(moment(c.projectdate).format("YYYY-MM-DD"));
      $scope.project = c;
      $scope.selectedModel = null;
    };
    
    $scope.selectModel = function (data, index) {
      $scope.selectedModelIndex = index;
      $scope.selectedModel = data;
    };
    
    $scope.selectController = function (data, index) {
      
      $scope.selectedControllerIndex = index;
      $scope.selectedController = data;
      
      console.log('selectedController', $scope.selectedController);
      console.log('selectedControllerIndex', $scope.selectedControllerIndex);
      
    };
    
    $scope.searchMenu = function () {
      $scope.searchMenuValue = !$scope.searchMenuValue;
    };
    
    $scope.searchSubMenu = function () {
      $scope.searchSubMenuValue = !$scope.searchSubMenuValue;
    };
      
    $scope.searchView = function () {
      $scope.searchViewValue  = !$scope.searchViewValue;
    };
    
    $scope.searchControl = function () {
      $scope.searchControlValue = !$scope.searchControlValue;
    };
    
    $scope.searchLookup = function () {
      $scope.searchLookupValue = !$scope.searchLookupValue;
    };
    
    $scope.searchModel = function () {
      $scope.searchModelValue =  !$scope.searchModelValue;
    };
    
    $scope.searchElement = function () {
      $scope.searchElementValue =  !$scope.searchElementValue;
    };
    
    $scope.searchController = function () {
      $scope.searchControllerValue =  !$scope.searchControllerValue;
    };
    
    $scope.searchServices = function () {
      $scope.searchServicesflag =  !$scope.searchServicesflag;
    };

    $scope.newservice = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'serviceContent.html',
        controller: 'ServiceInstanceCtrl',
        size: 'sm',
        resolve: {
          service: function () {
            var service = {servicename: '', 
                            modelname: $scope.selectedController.modelname, 
                            models: $scope.project.models};
            return service;
          }          
        }
      });

      modalInstance.result.then(function (data) {
        var service = {servicename: data.servicename};
        $scope.selectedController.services.push(service);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
    };

    $scope.editservice = function (service, index) {
      
      $scope.selectedServiceIndex = index;
      $scope.selectedService = service;
      var data = service;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'serviceContent.html',
        controller: 'ServiceInstanceCtrl',
        size: 'sm',
        resolve: {
          service: function () {
            return {servicename: data.servicename, 
                    modelname: $scope.selectedController.modelname,
                    models: $scope.project.models};
          }
        }
      });

      modalInstance.result.then(function (data) {
        var service = {servicename: data.servicename};
        $scope.selectedController.services[$scope.selectedServiceIndex] = service;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          

    };
    
    $scope.removeservice = function (index) {
      $scope.selectedController.services.splice(index, 1);
    };
    
    $scope.removeallservices = function () {
      $scope.selectedController.services.splice(0);
    };
    
    //model functions starts here
    $scope.newmodel = function () {
      
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'modelContent.html',
        controller: 'ModelInstanceCtrl',
        size: 'sm',
        resolve: {
          model: function () {
            var model = {name: '', paramname: ''};    
            return model;
          }          
        }
      });

      modalInstance.result.then(function (data) {
        var model = {name: changeCase.pascalCase(data.name), 
                      pluralname: pluralize(changeCase.pascalCase(data.name)), 
                      paramname: changeCase.paramCase(data.name),
                      parampluralname: changeCase.paramCase(pluralize(data.name)),
                      camelcasename: changeCase.camelCase(data.name),
                      elements: []};
        $scope.project.models.splice(0,0,model);
        $scope.selectedModel = model;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
      
    };

    $scope.openmodel = function (model, index) {
      
      $scope.selectedModelIndex = index;
      $scope.selectedModel = model;
      var data = model;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'modelContent.html',
        controller: 'ModelInstanceCtrl',
        size: 'sm',
        resolve: {
          model: function () {
            return {name: data.name,
                    pluralname: data.pluralname,
                    paramname: data.paramname,
                    parampluralname: data.parampluralname,
                    camelcasename: changeCase.camelCase(data.parampluralname),
                    elements: data.elements};
          }
        }
      });

      modalInstance.result.then(function (model) {
        model.name = changeCase.pascalCase(model.name);
        model.pluralname = pluralize(model.name);
        model.paramname =  changeCase.paramCase(model.name);
        model.parampluralname = changeCase.paramCase(pluralize(model.name));
        model.camelcasename = changeCase.camelCase(model.name);
        $scope.project.models[$scope.selectedModelIndex] = model;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          

    };
    
    $scope.deletemodel = function (index) {
    
      $scope.project.models.splice(index, 1);
      if($scope.project.models.length > 1){
        $scope.selectedModelIndex = index -1;
        $scope.selectedModel = $scope.project.models[index];
      }else{
        $scope.selectedModelIndex = null;
        $scope.selectedModel = null;
      }
    };
    
    $scope.removeallmodels = function () {
      $scope.project.models.splice(0);
    };
    // model functions ends here
    
    //element related functions start
    $scope.newelement = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'elementContent.html',
        controller: 'ElementInstanceCtrl',
        size: 'sm',
        resolve: {
          element: function () {
            var e = {elementname: '', 
                      elementtype: '',
                      schemaobjref: '',
                      modelname: $scope.selectedModel.name, 
                      models: $scope.project.models};
            return e;
          }
        }
      });

      modalInstance.result.then(function (element) {
        var e = {elementname: changeCase.camelCase(element.elementname.replace(/ /g, '')), 
                elementtype: element.elementtype,
                schemaobjref: element.schemaobjref};
        $scope.selectedModel.elements.push(e);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.editelement = function (data, index) {
    
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'elementContent.html',
        controller: 'ElementInstanceCtrl',
        size: 'sm',
        resolve: {
          element: function () {
            var e = {elementname: data.elementname, 
                      elementtype: data.elementtype,
                      schemaobjref: data.schemaobjref,
                      modelname: $scope.selectedModel.name,
                      models: $scope.project.models};
            return e;
          }
        }
      });

      modalInstance.result.then(function (element) {
        var e = {elementname: changeCase.camelCase(element.elementname.replace(/ /g, '')), 
                elementtype: element.elementtype,
                schemaobjref: element.schemaobjref};
        $scope.selectedModel.elements[index] = e;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removeelement = function (index) {
      $scope.selectedModel.elements.splice(index, 1);
    };
    
    $scope.removeallelements = function () {
      $scope.selectedModel.elements.splice(0);
    };
    //element related functions end
    
    //view related functions start 
    $scope.selectView = function (data, index) {
      $scope.selectedView = data;
      $scope.selectedViewIndex = index;
    };
    
    $scope.newview = function () {
      
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'viewContent.html',
        controller: 'ViewInstanceCtrl',
        size: 'sm',
        resolve: {
          /*project: function () {
            return $scope.project;
          }*/        
          view: function () {
            var view = {viewtype: '', 
                        modelname: '', 
                        models: $scope.project.models, 
                        menus: $scope.project.menus,
                        menuname: '',
                        controls: []};    
            return view;
          }
        }
      });

      modalInstance.result.then(function (view) {
        
        var v = {viewtype: view.viewtype, 
                  viewname: changeCase.titleCase(view.viewname),
                  modelname: view.modelname, 
                  modelpluralname: pluralize(view.modelname), 
                  modelparamname: changeCase.paramCase(view.modelname),
                  modelparampluralname: changeCase.paramCase(pluralize(view.modelname)),
                  modelcamelcasename: changeCase.camelCase(view.modelname),
                  menuname: view.menuname,
                  controls: []};
        
        for (var m = 0; m < $scope.project.models.length; m++) {
          var md = $scope.project.models[m];
          if(md.name === view.modelname) {
            for(var i = 0; i < md.elements.length; i++) {
                var e = md.elements[i];
                var et = '';
                if(e.elementtype === 'String'){
                  et = 'Text';
                }else{
                  et = e.elementtype;
                }
                var c = { controlname : e.elementname,
                          controltype : et,
                          width       : 3,
                          modelelement: e.elementname,
                          controllabel: changeCase.titleCase(e.elementname),
                          exampletext : '',
                          options: ''};   
                  v.controls.push(c);            
            }
          }
        }
        
        for (var mc = 0; m < $scope.project.menus.length; m++) {
          if($scope.project.menus[mc].menuname === v.menuname) {
            for (var sm = 0; sm < $scope.project.menus[mc].submenus.length; sm++) {
              if($scope.project.menus[mc].submenus[sm].menuname === v.modelparampluralname) {
                $scope.project.menus[mc].submenus.splice(sm,1);
              }
            }
            var submenu = {mainmenuname: v.menuname, 
                      submenuname: v.modelparampluralname,
                      submenulabel: v.viewname};
            $scope.project.menus[mc].submenus.push(submenu);
          }
        }
        
        $scope.project.views.splice(0,0,v);
        $scope.selectedView = v;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
      
    };

    $scope.openview = function (view, index) {
    
      $scope.selectedView = view;
      $scope.selectedViewIndex = index;
      var data = view;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'viewContent.html',
        controller: 'ViewInstanceCtrl',
        size: 'sm',
        resolve: {
          view: function () {
            var view = {viewtype: data.viewtype, 
                        viewname: data.viewname, 
                        modelname: data.modelname, 
                        models: $scope.project.models, 
                        menus: $scope.project.menus,
                        menuname: data.menuname,
                        controls: data.controls}; 
            return view;
            
          }          
        }
      });

      modalInstance.result.then(function (view) {
        var v = {viewtype: view.viewtype,
                  viewname: view.viewname,
                  modelname: view.modelname,
                  modelpluralname: pluralize(view.modelname),
                  modelparamname: changeCase.paramCase(view.modelname),
                  modelparampluralname: changeCase.paramCase(pluralize(view.modelname)),
                  modelcamelcasename: changeCase.camelCase(view.modelname),
                  menuname: view.menuname,
                  controls: []};
        
        for (var m = 0; m < $scope.project.models.length; m++) {
          var md = $scope.project.models[m];
          if(md.name === view.modelname) {
        
            for(var i = 0; i < md.elements.length; i++) {
                var e = md.elements[i];
                var et = '';
                if(e.elementtype === 'String'){
                  et = 'Text';
                }else{
                  et = e.elementtype;
                }                  
                var c = { controlname : e.elementname,
                          controltype : et,
                          width       : 3,
                          modelelement: e.elementname,
                          controllabel: changeCase.titleCase(e.elementname),
                          exampletext : '' };   
              v.controls.push(c);
              
            }
          }
        }
        
        for (var m = 0; m < $scope.project.menus.length; m++) {
          if($scope.project.menus[m].menuname === v.menuname) {
            for (var sm = 0; sm < $scope.project.menus[m].submenus.length; sm++) {
              if($scope.project.menus[m].submenus[sm].menuname === v.modelparampluralname) {
                $scope.project.menus[m].submenus.splice(sm,1);
              }
            }
            var submenu = {mainmenuname: v.menuname, 
                      submenuname: v.modelparampluralname,
                      submenulabel: v.viewname};
            $scope.project.menus[m].submenus.push(submenu);
          }
        }        
        
        $scope.project.views[$scope.selectedViewIndex] = v;
        $scope.selectedView = v;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });       
      
    };
    
    $scope.deleteview = function (index) {
    
      $scope.project.views.splice(index, 1);
      if($scope.project.views.length > 1){
        $scope.selectedViewIndex = index -1;
        $scope.selectedView = $scope.project.models[index];
      }else{
        $scope.selectedViewIndex = null;
        $scope.selectedView = null;
      }
    };
    
    $scope.deleteallviews = function () {
      $scope.project.views.splice(0);
    };
    //view related functions end
    
    //control related functions start
    $scope.newcontrol = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controlContent.html',
        controller: 'ControlInstanceCtrl',
        size: 'lg',
        resolve: {
          control: function () {
            var c = {controlname: '', 
                      controltype: '',
                      width: '',
                      modelelement: '',
                      controllabel: '',
                      exampletext: '',
                      options: ''};
            return c;
          }
        }
      });

      modalInstance.result.then(function (control) {
        control.controlname = control.controlname.toLowerCase().replace(/ /g, '');
        $scope.selectedView.controls.push(control);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.editcontrol = function (data, index) {
    
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controlContent.html',
        controller: 'ControlInstanceCtrl',
        size: 'lg',
        resolve: {
          control: function () {
            var c = {controlname: data.controlname, 
                      controltype: data.controltype,
                      width: data.width,
                      modelelement: data.modelelement,
                      controllabel: data.controllabel,
                      exampletext: data.exampletext,
                      options: data.options};
            return c;
          }
        }
      });

      modalInstance.result.then(function (control) {
        control.controlname = control.controlname.toLowerCase().replace(/ /g, '');
        $scope.selectedView.controls[index] = control;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removecontrol = function (index) {
      $scope.selectedView.controls.splice(index, 1);
    };
    
    $scope.removeallcontrols = function () {
      $scope.selectedView.controls.splice(0);
    };
    
    $scope.copycontrols = function () {
      
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'copyControls.html',
        controller: 'CopyControlsInstanceCtrl',
        size: 'sm',
        resolve: {
          /*project: function () {
            return $scope.project;
          }*/        
          views: function () {
            return $scope.project.views;
          }
        }
      });

      modalInstance.result.then(function (view) {
        
        var controls = [];
        
        for (var i = 0; i < view.controls.length; i++) {
          var c = { controlname : view.controls[i].controlname,
                    controltype : view.controls[i].controltype,
                    width       : view.controls[i].width,
                    modelelement: view.controls[i].modelelement,
                    controllabel: view.controls[i].controllabel,
                    exampletext : view.controls[i].exampletext,
                    options     : view.controls[i].options};   
          controls.push(c);
        }
        
        $scope.project.views[$scope.selectedViewIndex].controls = controls;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });   
      
    };
    //control related functions end
    
    //lookup related functions start
    $scope.newlookup = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'lookupContent.html',
        controller: 'LookupInstanceCtrl',
        size: 'lg',
        resolve: {
          lookup: function () {
            var l = {lookupname: '', 
                      expression: ''};
            return l;
          }
        }
      });

      modalInstance.result.then(function (lookup) {
        $scope.selectedController.lookups.push(lookup);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.editlookup = function (data, index) {
    
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'lookupContent.html',
        controller: 'LookupInstanceCtrl',
        size: 'lg',
        resolve: {
          lookup: function () {
            var l = {lookupname: data.lookupname, 
                      expression: data.expression};
            return l;
          }
        }
      });

      modalInstance.result.then(function (lookup) {
        $scope.selectedController.lookups[index] = lookup;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removelookup = function (index) {
      $scope.selectedController.lookups.splice(index, 1);
    };
    
    $scope.removealllookups = function () {
      $scope.selectedController.lookups.splice(0);
    };
    
    //lookup related functions end
    
    //controller related functions starts here
    $scope.newcontroller = function () {
      
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controllerContent.html',
        controller: 'ControllerInstanceCtrl',
        size: 'sm',
        resolve: {
          controller: function () {
            var controller = {controllername: '', 
                              modelname: '',
                              models: $scope.project.models};    
            return controller;
          }          
        }
      });

      modalInstance.result.then(function (data) {
        var ct = {controllername: data.controllername,
                  modelname: data.modelname,
                  services: [],
                  lookups: []};
        $scope.project.controllers.splice(0,0,ct);
        $scope.selectedController = ct;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
      
    };

    $scope.opencontroller = function (controller, index) {
      
      $scope.selectedControllerIndex = index;
      $scope.selectedController = controller;
      var data = controller;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controllerContent.html',
        controller: 'ControllerInstanceCtrl',
        size: 'sm',
        resolve: {
          controller: function () {
            return {controllername: data.controllername,
                    modelname: data.modelname,
                    services: data.services,
                    models: $scope.project.models,
                    lookups: $scope.project.lookups};
          }
        }
      });

      modalInstance.result.then(function (controller) {
        var ct = {controllername: controller.controllername, 
                  modelname: controller.modelname,
                  services: controller.services,
                  lookups: controller.lookups};
        $scope.project.controllers[$scope.selectedControllerIndex] = ct;
        $scope.selectedController = ct;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          

    };
    
    $scope.deletecontroller = function (index) {
      $scope.project.controllers.splice(index, 1);
      if($scope.project.controllers.length > 1){
        $scope.selectedControllerlIndex = index -1;
        $scope.selectedController = $scope.project.controllers[index];
      }else{
        $scope.selectedControllerIndex = null;
        $scope.selectedController = null;
      }
    };
    
    $scope.removeallcontrollers = function () {
      $scope.project.controllers.splice(0);
    };
    //controller related functions ends here
    
    //menu related functions start
    $scope.newmenu = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'menuContent.html',
        controller: 'MenuInstanceCtrl',
        size: 'sm',
        resolve: {
          menu: function () {
            var menu = {menuname: '', 
                        menulabel: '',
                        submenus: []};
            return menu;
          }
        }
      });

      modalInstance.result.then(function (menu) {
        menu.menuname = menu.menuname.toLowerCase().replace(/ /g, '');
        menu.menulabel = changeCase.titleCase(menu.menulabel);
        $scope.project.menus.splice(0,0,menu);
        $scope.selectedmenu = menu;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.editmenu = function (data, index) {
    
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'menuContent.html',
        controller: 'MenuInstanceCtrl',
        size: 'sm',
        resolve: {
          menu: function () {
            var menu = {menuname: data.menuname, 
                        menulabel: data.menulabel,
                        submenus: data.submenus};
            return menu;
          }
        }
      });

      modalInstance.result.then(function (menu) {
        menu.menuname = menu.menuname.toLowerCase().replace(/ /g, '');
        menu.menulabel = changeCase.titleCase(menu.menulabel);        
        $scope.project.menus[index] = menu;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.selectmenu = function (index) {
      $scope.selectedmenu = $scope.project.menus[index];
    };
    
    $scope.removemenu = function (index) {
      $scope.project.menus.splice(index, 1);
      $scope.selectmenu(0);
    };
    
    $scope.removeallmenus = function () {
      $scope.project.menus.splice(0);
      $scope.selectmenu(0);
    };
    //menu related functions end    
    
    //sub-menu related functions start
    $scope.newsubmenu = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'submenuContent.html',
        controller: 'SubMenuInstanceCtrl',
        size: 'sm',
        resolve: {
          submenu: function () {
            var m = {mainmenuname: $scope.selectedmenu.menuname, 
                      submenuname: '',
                      submenulabel: ''};
            return m;
          }
        }
      });

      modalInstance.result.then(function (submenu) {
        submenu.submenuname = changeCase.paramCase(pluralize(submenu.submenuname));
        submenu.submenulabel = changeCase.titleCase(submenu.submenulabel);        
        $scope.selectedmenu.submenus.push(submenu);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.editsubmenu = function (data, index) {
    
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'submenuContent.html',
        controller: 'SubMenuInstanceCtrl',
        size: 'sm',
        resolve: {
          submenu: function () {
            var submenu = {mainmenuname: data.mainmenuname, 
                            submenuname: data.submenuname,
                            submenulabel: data.submenulabel};
            return submenu;
          }
        }
      });

      modalInstance.result.then(function (submenu) {
        submenu.submenuname = changeCase.paramCase(pluralize(submenu.submenuname));
        submenu.submenulabel = changeCase.titleCase(submenu.submenulabel);         
        $scope.selectedmenu.submenus[index] = submenu;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removesubmenu = function (index) {
      $scope.selectedmenu.submenus.splice(index, 1);
    };
    
    $scope.removeallsubmenus = function () {
      $scope.selectedmenu.submenus.splice(0);
    };
    //sub-menu related functions end  
    
  });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('composerApp').controller('ModelInstanceCtrl', function ($scope, $modalInstance, model) {

  $scope.model = model;
  
  $scope.ok = function () {
    $modalInstance.close($scope.model);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ServiceInstanceCtrl', function ($scope, $modalInstance, service) {

  $scope.service = service;
  
  $scope.ok = function () {
    $modalInstance.close($scope.service);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControllerInstanceCtrl', function ($scope, $modalInstance, controller) {

  $scope.controller = controller;
  
  $scope.ok = function () {
    $modalInstance.close($scope.controller);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ElementInstanceCtrl', function ($scope, $modalInstance, element) {

  $scope.element = element;

  $scope.ok = function () {
    $modalInstance.close($scope.element);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ViewInstanceCtrl', function ($scope, $modalInstance, view) {

  $scope.view = view;

  $scope.ok = function () {
    $modalInstance.close( $scope.view );
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('LookupInstanceCtrl', function ($scope, $modalInstance, lookup) {

  $scope.lookup = lookup;

  $scope.ok = function () {
    $modalInstance.close($scope.lookup);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControlInstanceCtrl', function ($scope, $modalInstance, control) {

  $scope.control = control;

  $scope.ok = function () {
    $modalInstance.close($scope.control);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('CopyControlsInstanceCtrl', function ($scope, $modalInstance, views) {

  $scope.views = views;

  $scope.ok = function () {
    $modalInstance.close($scope.view);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('MenuInstanceCtrl', function ($scope, $modalInstance, menu) {

  $scope.menu = menu;

  $scope.ok = function () {
    $modalInstance.close($scope.menu);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('SubMenuInstanceCtrl', function ($scope, $modalInstance, submenu) {

  $scope.submenu = submenu;

  $scope.ok = function () {
    $modalInstance.close($scope.submenu);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});