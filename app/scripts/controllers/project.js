'use strict';

/**
 * @ngdoc function
 * @name composerApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the composerApp
 */
angular.module('composerApp').controller('ProjectCtrl', function ($scope, $modal, $log, changeCase, toaster) {
    this.authors = [
      'Raja',
      'Sekar',
      'Gladwin'
    ];
    $scope.authors = this.authors;
    $scope.time = Date.now();
    
    var taxes = [
            { amount: 25, currencyCode: "USD", decimalPlaces: 1, taxCode: "YRI"},
            { amount: 25, currencyCode: "USD", decimalPlaces: 2, taxCode: "YRI"},
            { amount: 10, currencyCode: "USD", decimalPlaces: 3, taxCode: "YRI"}
        ];

    var totalTaxes = taxes.reduce(function (sum, tax) {
        return sum + tax.decimalPlaces + tax.amount;
    }, 0);
    console.log('taxes.reduce', totalTaxes);
    /*toaster.options = {
      "closeButton": true,
      "debug": false,
      "progressBar": true,
      "positionClass": "toast-top-full-width",
      "showDuration": "400",
      "hideDuration": "1000",
      "timeOut": "7000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };*/

    $scope.project = {name: 'Project1', menus: [], models: [], controllers: [], views: []};
    $scope.selectedMenu = null;
    $scope.selectedMenuIndex = null;
    $scope.selectedSubMenu = null;
    $scope.selectedSubMenuIndex = null;    
    $scope.selectedModel = null;
    $scope.selectedModelIndex = null;
    $scope.selectedElement = null;
    $scope.selectedElementIndex = null;    
    $scope.selectedControllerIndex = null;
    $scope.selectedController = null;
    $scope.selectedService = null;
    $scope.selectedServiceIndex = null;
    $scope.selectedLookup = null;
    $scope.selectedLookupIndex = null;
    $scope.selectedMethod = null;
    $scope.selectedMethodIndex = null;
    $scope.selectedView = null;
    $scope.selectedViewIndex = null;
    $scope.selectedSection = null;
    $scope.selectedSectionIndex = null;
    $scope.selectedControl = null;
    $scope.selectedControlIndex = null;    
    //$scope.alerts = [];
    
    $scope.searchMenuFlag = false;
    $scope.searchSubMenuFlag = false;
    $scope.searchModelFlag = false;
    $scope.searchElementFlag = false;
    $scope.searchNestedElementFlag = false;
    $scope.searchControllerFlag = false;
    $scope.searchServiceFlag = false;
    $scope.searchLookupFlag = false;
    $scope.searchMethodFlag = false;
    $scope.searchViewFlag = false;
    $scope.searchSectionFlag = false;
    $scope.searchControlFlag = false;
    $scope.searchNestedControlFlag = false;  
    
    //menu related functions start
    $scope.searchMenu = function () {
      $scope.searchMenuFlag = !$scope.searchMenuFlag;
    };
    
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
        $scope.project.menus.push(menu);
        $scope.selectedMenu = menu;
        $scope.selectedMenu = menu;
        $scope.selectedMenuIndex = $scope.project.menus.length-1;        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectMenu = function (menu, index) {
      $scope.selectedMenu = menu;
      $scope.selectedMenuIndex = index;
      $scope.selectedSubMenu = null;
      $scope.selectedSubMenuIndex = null;
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

    $scope.removemenu = function (index) {
      //$scope.alerts = [{type: 'danger', msg: $scope.project.menus[index].menulabel + ' deleted'}];
      toaster.pop('error', "Menu", $scope.project.menus[index].menulabel + ', deleted');
      $scope.project.menus.splice(index, 1);
      if($scope.project.menus.length > 0){
        $scope.selectedMenuIndex = index;
        $scope.selectedMenu = $scope.project.menus[index];
      }else{
        $scope.selectedMenuIndex = null;
        $scope.selectedMenu = null;
      }      
    };
    
    $scope.removeallmenus = function () {
      toaster.pop('error', "Menu", 'All items, deleted');
      $scope.project.menus.splice(0);
      $scope.selectedMenu = null;
      $scope.selectedMenuIndex = null;
    };
    //menu related functions end    
    
    //sub-menu related functions start
    $scope.searchSubMenu = function () {
      $scope.searchSubMenuFlag = !$scope.searchSubMenuFlag;
    };
    
    $scope.newsubmenu = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'submenuContent.html',
        controller: 'SubMenuInstanceCtrl',
        size: 'sm',
        resolve: {
          submenu: function () {
            if($scope.selectedMenu){
              var m = {mainmenuname: $scope.selectedMenu.menuname, 
                        submenuname: '',
                        submenulabel: ''};
              return m;
            }
          }
        }
      });

      modalInstance.result.then(function (submenu) {
        submenu.submenuname = changeCase.paramCase(pluralize(submenu.submenuname));
        submenu.submenulabel = changeCase.titleCase(submenu.submenulabel);        
        $scope.selectedMenu.submenus.push(submenu);
        $scope.selectedSubMenu = submenu;
        $scope.selectedSubMenuIndex = $scope.selectedMenu.submenus.length-1;                
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.selectSubMenu = function (submenu, index) {
      $scope.selectedSubMenu = submenu;
      $scope.selectedSubMenuIndex = index;
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
        $scope.selectedMenu.submenus[index] = submenu;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removesubmenu = function (index) {
      toaster.pop('error', "Sub Menu", $scope.selectedMenu.submenus[index].submenulabel + ', deleted');
      $scope.selectedMenu.submenus.splice(index, 1);
    };
    
    $scope.removeallsubmenus = function () {
      if ($scope.selectedMenu) {
        toaster.pop('error', "Sub Menu", 'All items, deleted');
        $scope.selectedMenu.submenus.splice(0);
      }
    };
    //sub-menu related functions end  
    
    //model related functions starts here
    $scope.searchModel = function () {
      $scope.searchModelFlag =  !$scope.searchModelFlag;
    };
    
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
        $scope.project.models.push(model);
        $scope.selectedModel = model;
        $scope.selectedModelIndex = $scope.project.models.length-1;           
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectModel = function (data, index) {
      $scope.selectedModelIndex = index;
      $scope.selectedModel = data;
      $scope.selectedElement = null;
      $scope.selectedElementIndex = null;
    };    

    $scope.editmodel = function (data, index) {
      $scope.selectedModelIndex = index;
      $scope.selectedModel = data;
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
    
    $scope.removemodel = function (index) {
      toaster.pop('error', "Model", $scope.project.models[index].name + ', deleted');
      $scope.project.models.splice(index, 1);
      if($scope.project.models.length > 0){
        $scope.selectedElement = null;
        $scope.selectedElementIndex = null;          
        $scope.selectedModelIndex = index;
        $scope.selectedModel = $scope.project.models[index];
      }else{
        $scope.selectedModelIndex = null;
        $scope.selectedModel = null;
        $scope.selectedElement = null;
        $scope.selectedElementIndex = null;          
      }
    };
    
    $scope.removeallmodels = function () {
      toaster.pop('error', "Model", 'All items, deleted');
      $scope.project.models.splice(0);
      $scope.selectedModel = null;
      $scope.selectedModelIndex = null;
      $scope.selectedElement = null;
      $scope.selectedElementIndex = null;        
    };

    $scope.createcontroller = function (data) {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'createController.html',
        controller: 'CreateControllerInstanceCtrl',
        size: 'sm',
        resolve: {
          model: function () {
            return data;
          },
          templates: function () {
            var t = ['create','remove','update','find','findOne'];
            return t;
          },
          methods: function () {
            var t = ['create','remove','update','find','findOne'];
            return t;
          }
        }
      });

      modalInstance.result.then(function (methods) {
        var ct = {controllername: data.pluralname + 'Controller',
                  modelparampluralname: data.parampluralname,
                  services: [],
                  lookups: [],
                  methods: []};
        methods.forEach(function (item) {
          var method = {methodname: item, 
                          methodtype: item,
                          methodcontent: ''};
          ct.methods.push(method);
        });
        $scope.project.controllers.push(ct);
        $scope.selectedController = ct;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });        
      
    };
    
    $scope.createviews = function (data) {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'createViews.html',
        controller: 'CreateViewsInstanceCtrl',
        size: 'sm',
        resolve: {
          model: function () {
            return data;
          },
          templates: function () {
            var t = ['create','edit','list','view'];
            return t;
          },
          menus: function () {
            return $scope.project.menus;
          },
          output: function () {
            var o = {views: ['create','edit','list','view']};
            return o;
          }
        }
      });

      modalInstance.result.then(function (output) {
        output.views.forEach(function(item) {
          var viewname = '';
          if(item === 'create'){
            viewname = 'New ' + changeCase.titleCase(data.name);
          }else if(item === 'edit'){
            viewname = 'Update ' + changeCase.titleCase(data.name);
          }else if(item === 'list'){
            viewname = 'List Of ' + pluralize(changeCase.titleCase(data.name));
          }else if(item === 'view'){
            viewname = 'View ' + changeCase.titleCase(data.name);
          }
          
          var v = {viewtype: item, 
                    viewname: viewname,
                    modelname: data.name, 
                    modelpluralname: pluralize(data.name), 
                    modelparamname: changeCase.paramCase(data.name),
                    modelparampluralname: changeCase.paramCase(pluralize(data.name)),
                    modelcamelcasename: changeCase.camelCase(data.name),
                    menuname: output.menuname,
                    sections: [{controllername: data.pluralname + 'Controller',
                                sectionsize: 12,
                                controls: []}]};
          
          for(var i = 0; i < data.elements.length; i++) {
            var e = data.elements[i];
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
                      options     : '',
                      nestedcontrols: []};
            if(e.elementtype ==='Nested'){
              for (var ni = 0; ni < e.elements.length; ni++){
                var ne = e.elements[ni];
                var net = '';
                if(ne.elementtype === 'String'){
                  net = 'Text';
                }else{
                  net = ne.elementtype;
                }              
                var nc = { controlname: ne.elementname,
                          controltype : net,
                          width       : 3,
                          modelelement: ne.elementname,
                          controllabel: changeCase.titleCase(ne.elementname),
                          exampletext : '',
                          options     : ''};
                c.nestedcontrols.push(nc);
              }
            }
            v.sections[0].controls.push(c);
          }
          if(item === 'list'){
            for (var mc = 0; mc < $scope.project.menus.length; mc++) {
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
          }
          
          $scope.project.views.push(v);
          $scope.selectedView = v;        

        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });        
      
    };
    // model related functions ends here
    
    //element related functions start
    $scope.searchElement = function () {
      $scope.searchElementFlag =  !$scope.searchElementFlag;
    };
    
    $scope.newelement = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'elementContent.html',
        controller: 'ElementInstanceCtrl',
        size: 'sm',
        resolve: {
          element: function () {
            var e = {elementname: '', elementtype:'', isarray: false, elements: []};
            return e;
          },
          modelname: function () {
            if($scope.selectedModel){
              return $scope.selectedModel.name;
            }
          },
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (element) {
        element.elementname = changeCase.camelCase(element.elementname.replace(/ /g, ''));
        $scope.selectedModel.elements.push(element);
        $scope.selectedElement = element;
        $scope.selectedElementIndex = $scope.selectedModel.elements.length-1;            
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectElement = function (element, index) {
      $scope.selectedElement = element;
      $scope.selectedElementIndex = index;
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
                      isarray: data.isarray,
                      elements: data.elements};
            return e;
          },
          modelname: function () {
            return $scope.selectedModel.name;
          },
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (element) {
        element.elementname = changeCase.camelCase(element.elementname.replace(/ /g, ''));
        $scope.selectedModel.elements[index] = element;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removeelement = function (index) {
      toaster.pop('error', "Element", $scope.selectedModel.elements[index].elementname + ', deleted');
      $scope.selectedModel.elements.splice(index, 1);
    };
    
    $scope.removeallelements = function () {
      if ($scope.selectedModel) {
        toaster.pop('error', "Element", 'All items, deleted');
        $scope.selectedModel.elements.splice(0);
      }
    };
    //element related functions end
    
    //nested element related functions start
    $scope.searchNestedElement = function () {
      $scope.searchNestedElementFlag =  !$scope.searchNestedElementFlag;
    };
    
    $scope.newnestedelement = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'nestedelementContent.html',
        controller: 'NestedElementInstanceCtrl',
        size: 'sm',
        resolve: {
          nestedelement: function () {
            var e = {elementname: ''};
            return e;
          },
          modelname: function () {
            return $scope.selectedModel.name;
          },
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (nestedelement) {
        nestedelement.elementname = changeCase.camelCase(nestedelement.elementname.replace(/ /g, ''));
        $scope.selectedElement.elements.push(nestedelement);
        $scope.selectedNestedElement = nestedelement;
        $scope.selectedNestedElementIndex = $scope.selectedElement.elements.length-1;           
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectNestedElement = function (nestedelement, index) {
      $scope.selectedNestedElement = nestedelement;
      $scope.selectedNestedElementIndex = index;
    };
    
    $scope.editnestedelement = function (data, index) {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'nestedelementContent.html',
        controller: 'NestedElementInstanceCtrl',
        size: 'sm',
        resolve: {
          nestedelement: function () {
            var e = {elementname: data.elementname, 
                      elementtype: data.elementtype,
                      schemaobjref: data.schemaobjref,
                      isarray: data.isarray};
            return e;
          },
          modelname: function () {
            return $scope.selectedModel.name;
          },
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (nestedelement) {
        nestedelement.elementname = changeCase.camelCase(nestedelement.elementname.replace(/ /g, ''));
        $scope.selectedElement.elements[index] = nestedelement;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removenestedelement = function (index) {
      toaster.pop('error', "Nested Element", $scope.selectedElement.elements[index].elementname + ', deleted');
      $scope.selectedElement.elements.splice(index, 1);
    };
    
    $scope.removeallnestedelements = function () {
      toaster.pop('error', "Nested Element", 'All items, deleted');
      $scope.selectedElement.elements.splice(0);
    };
    //nested element related functions end
    
    //controller related functions starts here
    $scope.searchController = function () {
      $scope.searchControllerFlag =  !$scope.searchControllerFlag;
    };
    
    $scope.newcontroller = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controllerContent.html',
        controller: 'ControllerInstanceCtrl',
        size: 'sm',
        resolve: {
          controller: function () {
            var controller = {controllername: '', 
                              modelparampluralname: ''};    
            return controller;
          },                    
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (data) {
        var ct = {controllername: data.controllername,
                  modelparampluralname: data.modelparampluralname,
                  methods: [],
                  services: [],
                  lookups: []};
        $scope.project.controllers.push(ct);
        $scope.selectedController = ct;
        $scope.selectedControllerIndex = $scope.project.controllers.length-1;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
      
    };

    $scope.selectController = function (data, index) {
      $scope.selectedControllerIndex = index;
      $scope.selectedController = data;
      $scope.selectedService = null;
      $scope.selectedServiceIndex = null;
      $scope.selectedLookup = null;
      $scope.selectedLookupIndex = null;
      $scope.selectedMethod = null;
      $scope.selectedMethodIndex = null;
    };
    
    $scope.editcontroller = function (data, index) {
      $scope.selectedControllerIndex = index;
      $scope.selectedController = data;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controllerContent.html',
        controller: 'ControllerInstanceCtrl',
        size: 'sm',
        resolve: {
          controller: function () {
            return {controllername: data.controllername,
                    modelparampluralname: data.modelparampluralname,
                    services: data.services,
                    lookups: data.lookups,
                    methods: data.methods};
          },                    
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (controller) {
        var ct = {controllername: controller.controllername, 
                  modelparampluralname: controller.modelname,
                  services: controller.services,
                  lookups: controller.lookups,
                  methods: controller.methods};
        $scope.project.controllers[$scope.selectedControllerIndex] = ct;
        $scope.selectedController = ct;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          

    };
    
    $scope.removecontroller = function (index) {
      toaster.pop('error', "Controller", $scope.project.controllers[index].controllername + ', deleted');
      $scope.project.controllers.splice(index, 1);
      if($scope.project.controllers.length > 0){
        $scope.selectedService = null;
        $scope.selectedServiceIndex = null;
        $scope.selectedLookup = null;
        $scope.selectedLookupIndex = null;
        $scope.selectedMethod = null;
        $scope.selectedMethodIndex = null;         
        $scope.selectedControllerlIndex = index;
        $scope.selectedController = $scope.project.controllers[index];
      }else{
        $scope.selectedControllerIndex = null;
        $scope.selectedController = null;
        $scope.selectedService = null;
        $scope.selectedServiceIndex = null;
        $scope.selectedLookup = null;
        $scope.selectedLookupIndex = null;
        $scope.selectedMethod = null;
        $scope.selectedMethodIndex = null;         
      }
    };
    
    $scope.removeallcontrollers = function () {
      toaster.pop('error', "Controller", 'All items, deleted');
      $scope.project.controllers.splice(0);
      $scope.selectedController = null;
      $scope.selectedControllerIndex = null;
      $scope.selectedService = null;
      $scope.selectedServiceIndex = null;
      $scope.selectedLookup = null;
      $scope.selectedLookupIndex = null;
      $scope.selectedMethod = null;
      $scope.selectedMethodIndex = null;       
    };
    //controller related functions ends here

    //method related functions starts here
    $scope.searchMethod = function () {
      $scope.searchMethodFlag =  !$scope.searchMethodFlag;
    };
    
    $scope.newmethod = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'methodContent.html',
        controller: 'MethodInstanceCtrl',
        size: 'lg',
        resolve: {
          method: function () {
            var method = {methodname: '', 
                            methodtype: '',
                            methodcontent: ''};
            return method;
          }          
        }
      });

      modalInstance.result.then(function (method) {
        $scope.selectedController.methods.push(method);
        $scope.selectedMethod = method;
        $scope.selectedMethodIndex = $scope.selectedController.methods.length-1;        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
    };

    $scope.selectMethod = function (method, index) {
      $scope.selectedMethod = method;
      $scope.selectedMethodIndex = index;
    }; 
    
    $scope.editmethod = function (method, index) {
      $scope.selectedMethodIndex = index;
      $scope.selectedMethod = method;
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'methodContent.html',
        controller: 'MethodInstanceCtrl',
        size: 'lg',
        resolve: {
          method: function () {
            return {methodname: method.methodname,
                    methodtype: method.methodtype,
                    methodcontent: method.methodcontent};
          }
        }
      });

      modalInstance.result.then(function (method) {
        $scope.selectedController.methods[$scope.selectedMethodIndex] = method;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          

    };
    
    $scope.removemethod = function (index) {
      toaster.pop('error', "Method", $scope.selectedController.methods[index].methodname + ', deleted');
      $scope.selectedController.methods.splice(index, 1);
    };
    
    $scope.removeallmethods = function () {
      if ($scope.selectedController) {
        toaster.pop('error', "Method", 'All items, deleted');
        $scope.selectedController.methods.splice(0);
      }
    };
    //method related functions ends here
    
    //service functions starts here
    $scope.newservice = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'serviceContent.html',
        controller: 'ServiceInstanceCtrl',
        size: 'sm',
        resolve: {
          service: function () {
            var service = {servicename: ''};
            return service;
          },
          modelname: function () {
            if($scope.selectedController){
              var result = $scope.project.models.filter(function (model) {
                  if (model.parampluralname === $scope.selectedController.modelparampluralname)
                  return model;
              })[0].name;
              return result;
            }
          },
          models: function () {
            return $scope.project.models;
          }
        }
      });

      modalInstance.result.then(function (data) {
        $scope.selectedController.services.push(data.servicename);
        $scope.selectedService = data;
        $scope.selectedServiceIndex = $scope.selectedController.services.length-1;           
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
    };

    $scope.selectService = function (service, index) {
      $scope.selectedService = service;
      $scope.selectedServiceIndex = index;
    };    

    $scope.removeservice = function (index) {
      toaster.pop('error', "Service", $scope.selectedController.services[index] + ', deleted');
      $scope.selectedController.services.splice(index, 1);
    };
    //service functions ends here    

    //lookup related functions start
    $scope.searchLookup = function () {
      $scope.searchLookupFlag = !$scope.searchLookupFlag;
    };
    
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
        $scope.selectedLookup = lookup;
        $scope.selectedLookupIndex = $scope.selectedController.lookups.length-1;           
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectLookup = function (lookup, index) {
      $scope.selectedLookup = lookup;
      $scope.selectedLookupIndex = index;
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
      toaster.pop('error', "Lookup", $scope.selectedController.lookups[index].lookupname + ', deleted');
      $scope.selectedController.lookups.splice(index, 1);
    };
    
    $scope.removealllookups = function () {
      if ($scope.selectedController) {
        toaster.pop('error', "Lookup", 'All items, deleted');
        $scope.selectedController.lookups.splice(0);
      }
    };
    //lookup related functions end    
    
    //view related functions start 
    $scope.searchView = function () {
      $scope.searchViewFlag  = !$scope.searchViewFlag;
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
                        menuname: '',
                        sections:[{controllername: '', sectionsize: 12, controls: []}]};
            return view;
          },
          models: function () {
            return $scope.project.models;
          },
          menus: function () {
            return $scope.project.menus;
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
                  sections:[{controllername: pluralize(view.modelname) + 'Controller', sectionsize: 12, controls: []}]};

        var md = $scope.project.models.filter(function (model) {
                        if (model.name === view.modelname) return model;
                      })[0];                  
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
                    options     : '',
                    nestedcontrols: []};
          if(e.elementtype ==='Nested'){
            for (var ni = 0; ni < e.elements.length; ni++){
              var ne = e.elements[ni];
              var net = '';
              if(ne.elementtype === 'String'){
                net = 'Text';
              }else{
                net = ne.elementtype;
              }              
              var nc = { controlname: ne.elementname,
                        controltype : net,
                        width       : 3,
                        modelelement: ne.elementname,
                        controllabel: changeCase.titleCase(ne.elementname),
                        exampletext : '',
                        options     : ''};
              c.nestedcontrols.push(nc);
            }
          }
          v.sections[0].controls.push(c);
        }
                  
        for (var mc = 0; mc < $scope.project.menus.length; mc++) {
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
        
        $scope.project.views.push(v);
        $scope.selectedView = v;
        $scope.selectedViewIndex = $scope.project.views.length-1;        

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });          
    };

    $scope.selectView = function (data, index) {
      $scope.selectedView = data;
      $scope.selectedViewIndex = index;
      $scope.selectedSection = null;
      $scope.selectedSectionIndex = null;
      $scope.selectedControl = null;
      $scope.selectedControlIndex = null;
    };
    
    $scope.editview = function (view, index) {
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
                        menuname: data.menuname,
                        sections: data.sections}; 
            return view;
          },
          models: function () {
            return $scope.project.models;
          },
          menus: function () {
            return $scope.project.menus;
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
                  sections:[{controllername: pluralize(view.modelname) + 'Controller', sectionsize: 12, controls: []}]};
        
        var md = $scope.project.models.filter(function (model) {
                        if (model.name === view.modelname) return model;
                      })[0];
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
                    options     : '',
                    nestedcontrols: []};
          if(e.elementtype ==='Nested'){
            for (var ni = 0; ni < e.elements.length; ni++){
              var ne = e.elements[ni];
              var net = '';
              if(ne.elementtype === 'String'){
                net = 'Text';
              }else{
                net = ne.elementtype;
              }              
              var nc = { controlname : ne.elementname,
                        controltype : net,
                        width       : 3,
                        modelelement: ne.elementname,
                        controllabel: changeCase.titleCase(ne.elementname),
                        exampletext : '',
                        options     : ''};
              c.nestedcontrols.push(nc);
            }
          }
          v.sections[0].controls.push(c);
        }
        
        for (var mn = 0; mn < $scope.project.menus.length; mn++) {
          if($scope.project.menus[mn].menuname === v.menuname) {
            for (var sm = 0; sm < $scope.project.menus[mn].submenus.length; sm++) {
              if($scope.project.menus[mn].submenus[sm].menuname === v.modelparampluralname) {
                $scope.project.menus[mn].submenus.splice(sm,1);
              }
            }
            var submenu = {mainmenuname: v.menuname, 
                      submenuname: v.modelparampluralname,
                      submenulabel: v.viewname};
            $scope.project.menus[mn].submenus.push(submenu);
          }
        }        
        
        $scope.project.views[$scope.selectedViewIndex] = v;
        $scope.selectedView = v;
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });       
      
    };
    
    $scope.removeview = function (index) {
      toaster.pop('error', "View", $scope.project.views[index].viewname + ', deleted');
      $scope.project.views.splice(index, 1);
      if($scope.project.views.length > 0){
        $scope.selectedControl = null;
        $scope.selectedControlIndex = null;
        $scope.selectedSection = null;
        $scope.selectedSectionIndex = null;                 
        $scope.selectedViewIndex = index;
        $scope.selectedView = $scope.project.views[index];
      }else{
        $scope.selectedSection = null;
        $scope.selectedSectionIndex = null;         
        $scope.selectedControl = null;
        $scope.selectedControlIndex = null;         
        $scope.selectedViewIndex = null;
        $scope.selectedView = null;
      }
    };
    
    $scope.removeallviews = function () {
      toaster.pop('error', "View", 'All items, deleted');
      $scope.project.views.splice(0);
      $scope.selectedViewIndex = null;
      $scope.selectedView = null;
      $scope.selectedControl = null;
      $scope.selectedControlIndex = null;         
    };
    //view related functions end

    //Section related functions start
    $scope.searchSection = function () {
      $scope.searchSectionFlag = !$scope.searchSectionFlag;
    };
    
    $scope.newsection = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'sectionContent.html',
        controller: 'SectionInstanceCtrl',
        size: 'sm',
        resolve: {
          section: function () {
            var se = {controllername: '', 
                      sectionsize: 12};
            return se;
          },
          controllers: function () {
            return $scope.project.controllers;
          }
        }
      });

      modalInstance.result.then(function (section) {
        $scope.selectedView.sections.push(section);
        $scope.selectedSection = section;
        $scope.selectedSectionIndex = $scope.selectedView.sections.length-1;          
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.selectSection = function (section, index) {
      $scope.selectedSection = section;
      $scope.selectedSectionIndex = index;
    }; 
    
    $scope.editsection = function (data, index) {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'sectionContent.html',
        controller: 'SectionInstanceCtrl',
        size: 'sm',
        resolve: {
          section: function () {
            var se = {controllername: data.controllername, 
                      sectionsize: data.sectionsize};
            return se;
          },
          controllers: function () {
            return $scope.project.controllers;
          }
        }
      });

      modalInstance.result.then(function (section) {
        $scope.selectedView.sections[index] = section;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removesection = function (index) {
      toaster.pop('error', "Section ", $scope.selectedView.sections[index].controllername + ', deleted');
      $scope.selectedView.sections.splice(index, 1);
      $scope.selectedSection = null;
      $scope.selectedSectionIndex = null;         
      $scope.selectedControl = null;
      $scope.selectedControlIndex = null;         
    };
    
    $scope.removeallsections = function () {
      if($scope.selectedView){
        toaster.pop('error', "Section", 'All items, deleted');
        $scope.selectedView.sections.splice(0);
      }
    };
    //Section related functions end    

    //control related functions start
    $scope.searchControl = function () {
      $scope.searchControlFlag = !$scope.searchControlFlag;
    };
    
    $scope.newcontrol = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'controlContent.html',
        controller: 'ControlInstanceCtrl',
        size: 'lg',
        resolve: {
          control: function () {
            var c = {controlname: '',nestedcontrols: []};
            return c;
          },
          viewtype: function () {
            if ($scope.selectedView) {
              return $scope.selectedView.viewtype;
            }
          }
        }
      });

      modalInstance.result.then(function (control) {
        control.controlname = control.controlname.replace(/ /g, '');
        $scope.selectedSection.controls.push(control);
        $scope.selectedControl = control;
        $scope.selectedControlIndex = $scope.selectedSection.controls.length-1;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.selectControl = function (control, index) {
      $scope.selectedControl = control;
      $scope.selectedControlIndex = index;
      $scope.selectedNestedControl = control;
      $scope.selectedNestedControlIndex = index;
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
                      options: data.options,
                      isreadonly: data.isreadonly,
                      nestedcontrols: data.nestedcontrols};
            return c;
          },
          viewtype: function () {
            return $scope.selectedView.viewtype;
          }
        }
      });

      modalInstance.result.then(function (control) {
        control.controlname = control.controlname.replace(/ /g, '');
        $scope.selectedSection.controls[index] = control;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removecontrol = function (index) {
      toaster.pop('error', "Control", $scope.selectedSection.controls[index].controlname + ', deleted');
      $scope.selectedSection.controls.splice(index, 1);
    };
    
    $scope.removeallcontrols = function () {
      if($scope.selectedSection){
        toaster.pop('error', "Control", 'All items, deleted');
        $scope.selectedSection.controls.splice(0);
      }
    };
    
    $scope.copycontrols = function () {
      
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'copyControls.html',
        controller: 'CopyControlsInstanceCtrl',
        size: 'sm',
        resolve: {
          views: function () {
            return $scope.project.views;
          }
        }
      });

      modalInstance.result.then(function (section) {
        if(section){
          var controls = [];
          for (var i = 0; i < section.controls.length; i++) {
            var control = section.controls[i];
            var c = { controlname : control.controlname,
                      controltype : control.controltype,
                      width       : control.width,
                      modelelement: control.modelelement,
                      controllabel: control.controllabel,
                      exampletext : control.exampletext,
                      options     : control.options,
                      nestedcontrols: []};
            if(control.controltype==='Nested'){
              for (var ni = 0; ni < control.nestedcontrols.length; ni++) {
                var nestedcontrol = control.nestedcontrols[ni];
                var nc = { controlname : nestedcontrol.controlname,
                            controltype : nestedcontrol.controltype,
                            width       : nestedcontrol.width,
                            modelelement: nestedcontrol.modelelement,
                            controllabel: nestedcontrol.controllabel,
                            exampletext : nestedcontrol.exampletext,
                            options     : nestedcontrol.options};
                c.push(nc);
              }
            }
            controls.push(c);
          }
          $scope.selectedSection.controls = controls;
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });   
    };
    
    $scope.exportControls = function () {
      return $scope.selectedView.controls;
    };    
    //control related functions end

    //nested control related functions start
    $scope.searchNestedControl = function () {
      $scope.searchNestedControlFlag = !$scope.searchNestedControlFlag;
    };
    
    $scope.newnestedcontrol = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'nestedcontrolContent.html',
        controller: 'NestedControlInstanceCtrl',
        size: 'lg',
        resolve: {
          nestedcontrol: function () {
            var c = {controlname: ''};
            return c;
          }
        }
      });

      modalInstance.result.then(function (nestedcontrol) {
        nestedcontrol.controlname = nestedcontrol.controlname.replace(/ /g, '');
        $scope.selectedControl.nestedcontrols.push(nestedcontrol);
        $scope.selectedNestedControl = nestedcontrol;
        $scope.selectedNestedControlIndex = $scope.selectedControl.nestedcontrols.length-1;        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
     
    };
    
    $scope.selectNestedControl = function (nestedcontrol, index) {
      $scope.selectedNestedControl = nestedcontrol;
      $scope.selectedNestedControlIndex = index;
    };     
    
    $scope.editnestedcontrol = function (data, index) {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'nestedcontrolContent.html',
        controller: 'NestedControlInstanceCtrl',
        size: 'lg',
        resolve: {
          nestedcontrol: function () {
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

      modalInstance.result.then(function (nestedcontrol) {
        nestedcontrol.controlname = nestedcontrol.controlname.replace(/ /g, '');
        $scope.selectedControl.nestedcontrols[index] = nestedcontrol;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removenestedcontrol = function (index) {
      toaster.pop('error', "Nested Control", $scope.selectedControl.nestedcontrols[index].controlname + ', deleted');
      $scope.selectedControl.nestedcontrols.splice(index, 1);
    };
    
    $scope.removeallnestedcontrols = function () {
      toaster.pop('error', "Nested Control", 'All items, deleted');
      $scope.selectedControl.nestedcontrols.splice(0);
    };
    //nested control related functions end

    
    $scope.loadJSON = function(contents) {
      var c = angular.fromJson(contents);
      //c.projectdate = new Date(moment(c.projectdate).format("YYYY-MM-DD"));
      $scope.project = c;
      if (c.menus.length > 0){
        $scope.selectedSubMenu = null;
        $scope.selectedSubMenuIndex = null;
        $scope.selectedMenu = c.menus[0];
        $scope.selectedMenuIndex = 0;
      }
      if (c.models.length > 0){
        $scope.selectedElement = null;
        $scope.selectedElementIndex = null;
        $scope.selectedModel = c.models[0];
        $scope.selectedModelIndex = [0];
      }
      if (c.controllers.length > 0){
        $scope.selectedService = null;
        $scope.selectedServiceIndex = null;
        $scope.selectedLookup = null;
        $scope.selectedLookupIndex = null;
        $scope.selectedMethod = null;
        $scope.selectedMethodIndex = null;        
        $scope.selectedControllerIndex = 0;
        $scope.selectedController = c.controllers[0];
      }
      if (c.views.length > 0){
        $scope.selectedControl = null;
        $scope.selectedControlIndex = null;         
        $scope.selectedView = c.views[0];
        $scope.selectedViewIndex = 0;
      }
    };
    
    $scope.saveJSON = function () {
			$scope.toJSON = '';
			$scope.toJSON = angular.toJson($scope.project);
      var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });			
			var downloadLink = angular.element('<a></a>');
                        downloadLink.attr('href',window.URL.createObjectURL(blob));
                        downloadLink.attr('download', $scope.project.name + '.json');
			downloadLink[0].click();
		};    

    $scope.resetJSON = function () {
      $scope.project = {name: 'Project1',  menus: [], models: [], controllers: [], views: []};
      $scope.selectedMenu = null;
      $scope.selectedMenuIndex = null;
      $scope.selectedSubMenu = null;
      $scope.selectedSubMenuIndex = null;    
      $scope.selectedModel = null;
      $scope.selectedModelIndex = null;
      $scope.selectedElement = null;
      $scope.selectedElementIndex = null;    
      $scope.selectedControllerIndex = null;
      $scope.selectedController = null;
      $scope.selectedService = null;
      $scope.selectedServiceIndex = null;
      $scope.selectedLookup = null;
      $scope.selectedLookupIndex = null;
      $scope.selectedMethod = null;
      $scope.selectedMethodIndex = null;
      $scope.selectedView = null;
      $scope.selectedViewIndex = null;
      $scope.selectedControl = null;
      $scope.selectedControlIndex = null;    
      //$scope.alerts = [];
      
      $scope.searchMenuFlag = false;
      $scope.searchSubMenuFlag = false;
      $scope.searchModelFlag = false;
      $scope.searchElementFlag = false;
      $scope.searchNestedElementFlag = false;
      $scope.searchControllerFlag = false;
      $scope.searchLookupFlag = false;
      $scope.searchMethodFlag = false;
      $scope.searchViewFlag = false;
      $scope.searchControlFlag = false;  
      $scope.searchNestedControlFlag = false;  
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };    
    
    $scope.viewJSON = function () {
      $scope.viewJSONValue = !$scope.viewJSONValue;
    };
    
    $scope.printJSON = function() {
      window.print();
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

angular.module('composerApp').controller('ModelInstanceCtrl', function ($scope, $modalInstance, model) {

  $scope.model = model;
  
  $scope.ok = function () {
    $modalInstance.close($scope.model);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('CreateControllerInstanceCtrl', function ($scope, $modalInstance, model, templates, methods) {

  $scope.model = model;
  $scope.templates = templates;
  $scope.methods = methods;

  $scope.ok = function () {
    $modalInstance.close($scope.methods);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('CreateViewsInstanceCtrl', function ($scope, $modalInstance, model, templates, menus, output) {

  $scope.model = model;
  $scope.templates = templates;
  $scope.menus = menus;
  $scope.output = output;
  $scope.ok = function () {
    $modalInstance.close($scope.output);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ElementInstanceCtrl', function ($scope, $modalInstance, element, modelname, models) {

  $scope.element = element;
  $scope.modelname = modelname;
  $scope.models = models;

  $scope.ok = function () {
    $modalInstance.close($scope.element);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('NestedElementInstanceCtrl', function ($scope, $modalInstance, nestedelement, modelname, models) {

  $scope.nestedelement = nestedelement;
  $scope.modelname = modelname;
  $scope.models = models;

  $scope.ok = function () {
    $modalInstance.close($scope.nestedelement);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControllerInstanceCtrl', function ($scope, $modalInstance, controller, models) {

  $scope.controller = controller;
  $scope.models = models;
  
  $scope.ok = function () {
    $modalInstance.close($scope.controller);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ServiceInstanceCtrl', function ($scope, $modalInstance, service, modelname, models) {

  $scope.service = service;
  $scope.modelname = modelname;
  $scope.models = models;

  $scope.ok = function () {
    $modalInstance.close($scope.service);
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

angular.module('composerApp').controller('MethodInstanceCtrl', function ($scope, $modalInstance, method) {

  $scope.method = method;

  $scope.ok = function () {
    $modalInstance.close($scope.method);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ViewInstanceCtrl', function ($scope, $modalInstance, view, models, menus) {

  $scope.view = view;
  $scope.models = models;
  $scope.menus = menus;

  $scope.ok = function () {
    $modalInstance.close( $scope.view );
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('SectionInstanceCtrl', function ($scope, $modalInstance, section, controllers) {

  $scope.section = section;
  $scope.controllers = controllers;
  
  $scope.ok = function () {
    $modalInstance.close($scope.section);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControlInstanceCtrl', function ($scope, $modalInstance, control, viewtype) {

  $scope.control = control;
  $scope.viewtype = viewtype;

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
    $modalInstance.close($scope.section);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('NestedControlInstanceCtrl', function ($scope, $modalInstance, nestedcontrol) {

  $scope.nestedcontrol = nestedcontrol;

  $scope.ok = function () {
    $modalInstance.close($scope.nestedcontrol);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});