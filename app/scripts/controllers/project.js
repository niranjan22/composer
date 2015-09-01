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

    /*
    var taxes = [
            { amount: 25, currencyCode: "USD", decimalPlaces: 1, taxCode: "YRI"},
            { amount: 25, currencyCode: "USD", decimalPlaces: 2, taxCode: "YRI"},
            { amount: 10, currencyCode: "USD", decimalPlaces: 3, taxCode: "YRI"}
        ];

    var totalTaxes = taxes.reduce(function (sum, tax) {
        return sum + tax.decimalPlaces + tax.amount;
    }, 0);
    console.log('taxes.reduce', totalTaxes);
    */

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
        $scope.project.menus.push(menu);
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
              var submenu = {mainmenuname: $scope.selectedMenu.menuname};
              return submenu;
            }
          },
          views: function () {
            return $scope.project.views;
          }
        }
      });

      modalInstance.result.then(function (submenu) {
        var sm = {};
        if (submenu.modelname){
          sm = {mainmenuname: submenu.mainmenuname,
                modelname   : submenu.modelname};
        } else {
          sm = {mainmenuname: submenu.mainmenuname,
                submenuname: changeCase.paramCase(submenu.submenuname),
                submenulabel: changeCase.titleCase(submenu.submenulabel)};
        }
        $scope.selectedMenu.submenus.push(sm);
        $scope.selectedSubMenu = sm;
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
                            modelname: data.modelname,
                            submenuname: data.submenuname,
                            submenulabel: data.submenulabel};
            return submenu;
          },
          views: function () {
            return $scope.project.views;
          }
        }
      });

      modalInstance.result.then(function (submenu) {
        var sm = {};
        if (submenu.modelname){
          sm = {mainmenuname: submenu.mainmenuname,
                modelname   : submenu.modelname};
        } else {
          sm = {mainmenuname: submenu.mainmenuname,
                submenuname: changeCase.paramCase(submenu.submenuname),
                submenulabel: changeCase.titleCase(submenu.submenulabel)};
        }
        $scope.selectedMenu.submenus[index] = sm;
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
            var model = {name: ''};
            return model;
          }
        }
      });

      modalInstance.result.then(function (data) {
        var model = {name       : data.name,
                      elements  : []};
        $scope.project.models.push(model);
        $scope.selectedModel = model;
        $scope.selectedModelIndex = $scope.project.models.length-1;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.selectModel = function (data, index) {
      /*$scope.selectedModelElements = data.elements.length;
      $scope.selectedModelElements = data.elements.reduce(function (sum, ne) {
        if (ne.elements) {
          return sum + ne.elements.length ;
        } else {
          return sum;
        }
      }, $scope.selectedModelElements);*/

      $scope.selectedModelIndex = index;
      $scope.selectedModel = data;
      $scope.selectedElement = null;
      $scope.selectedElementIndex = null;
    };
    
    $scope.moveUp = function (items, index){
      items.move(index, index-1);
    };

    $scope.moveDown = function (items, index){
      items.move(index, index+1);
    };        
    Array.prototype.move = function(from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);
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
            var model = {name     : data.name,
                        elements  : data.elements};
            return model;
          }
        }
      });

      modalInstance.result.then(function (model) {
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

    $scope.hasNestedElements = function (model) {
      var hasNestedElements = false;
      model.elements.forEach (function (element) {
        if (element.elementtype === 'Nested') {
          if (element.isarray === true) {
            hasNestedElements = true;
            return hasNestedElements;
          }
        }
      });
      return hasNestedElements;
    };    
    
    $scope.createcontroller = function (data) {
      var ptemplates = [];
      var pmethods = [];
      if ($scope.hasNestedElements(data)){
        ptemplates = ['create','remove','update','find','findOne', 'standAlone', 'Modal'];
        pmethods = ['create','remove','update','find','findOne', 'Modal'];
      }else{
        ptemplates = ['create','remove','update','find','findOne', 'standAlone'];
        pmethods = ['create','remove','update','find','findOne'];
      }      
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
            return ptemplates;
          },
          methods: function () {
            return pmethods;
          }
        }
      });
      
      modalInstance.result.then(function (methods) {
        var ct = {controllername: data.name + ' Controller',
                  modelname: data.name,
                  services: [],
                  lookups: [],
                  methods: []};
        methods.forEach(function (item) {
          var method = {methodname: item,
                        methodtype: item};
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
        output.views.forEach(function(viewtype) {
          var viewname = '';
          if(viewtype === 'create'){
            viewname = 'New ' + data.name;
          }else if(viewtype === 'edit'){
            viewname = 'Update ' + data.name;
          }else if(viewtype === 'list'){
            viewname = data.name + ' list';
          }else if(viewtype === 'view'){
            viewname = 'View ' + data.name;
          }

          var v = {viewtype: viewtype,
                    viewname: viewname,
                    modelname: data.name,
                    menuname: output.menuname,
                    sections: [{controllername: data.name + ' Controller',
                                sectionsize: 12,
                                controls: []}]};

          for(var i = 0; i < data.elements.length; i++) {
            var e = data.elements[i];
            var et = '';
            switch (e.elementtype) {
              case 'String'               : et = "Text"; break;
              case 'Schema.Types.ObjectId': et = "Select"; break;
              case 'Boolean'              : et = "Checkbox"; break;
              default                     : et = e.elementtype; break;
            }
            var c = {};
            if(viewtype !== 'list') {
              if(e.elementtype ==='Nested'){
                c = { controlname : e.elementname,
                      controltype : et,
                      width       : 12,
                      modelelement: e.elementname,
                      controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname)),
                      isarray     : e.isarray,
                      nestedcontrols: []};
                for (var ni = 0; ni < e.elements.length; ni++){
                  var ne = e.elements[ni];
                  var net = '';
                  switch (ne.elementtype) {
                    case 'String'               : net = "Text"; break;
                    case 'Schema.Types.ObjectId': net = "Select"; break;
                    case 'Boolean'              : net = "Checkbox"; break;
                    default                     : net = ne.elementtype; break;
                  }
                  var nc = { controlname: ne.elementname,
                            controltype : net,
                            width       : 3,
                            modelelement: ne.elementname,
                            modelname   : ne.schemaobjref,
                            controllabel: changeCase.titleCase(changeCase.sentenceCase(ne.elementname))};
                            c.nestedcontrols.push(nc);
                }
              } else {
                c = { controlname : e.elementname,
                      controltype : et,
                      width       : 3,
                      modelelement: e.elementname,
                      modelname   : e.schemaobjref,
                      controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname))
                };
              }
              v.sections[0].controls.push(c);
            } else {
              if ( e.elementtype !== 'Nested'){
                c = { controlname : e.elementname,
                      controltype : et,
                      modelelement: e.elementname,
                      controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname))};
                v.sections[0].controls.push(c);
              }
            }
          }

          if(viewtype === 'list'){
            if (v.menuname) {
              var menu = $scope.project.menus.filter( function (menu) {
                if (menu.menuname === v.menuname) {
                  return menu;
                }
              })[0];
              var submenu = {mainmenuname : v.menuname,
                            modelname     : v.modelname};
              menu.submenus.push(submenu);
            }
          }

          $scope.project.views.push(v);
          $scope.selectedView = v;

        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };

    $scope.createallcontrollers = function () {
      $scope.project.models.forEach( function (model) {
        $scope.createcontroller(model);
      });
    };

    $scope.createallviews = function () {
      $scope.project.models.forEach( function (model) {
        $scope.createviews(model);
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
            var e = {elementname: '', elementtype:''};
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
        var e = {};
        if (element.elementtype==='Nested') {
          e = {elementname: element.elementname, elementtype: element.elementtype, isarray: element.isarray, elements: [] };
        }else{
          e = {elementname: element.elementname, elementtype: element.elementtype, schemaobjref: element.schemaobjref};
        }
        e.elementname = changeCase.camelCase(element.elementname);
        $scope.selectedModel.elements.push(e);
        $scope.selectedElement = e;
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
            var element = {};
            if (data.elementtype==='Nested') {
              element = {elementname: data.elementname, elementtype: data.elementtype, isarray: data.isarray, elements: data.elements };
            }else{
              element = {elementname: data.elementname, elementtype: data.elementtype, schemaobjref: data.schemaobjref};
            }
            return element;
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
        var e = {};
        if (element.elementtype==='Nested') {
          if(element.elements){
            e = {elementname: element.elementname, elementtype: element.elementtype, isarray: element.isarray, elements: element.elements };
          }else{
            e = {elementname: element.elementname, elementtype: element.elementtype, isarray: element.isarray, elements: [] };
          }

        }else{
          e = {elementname: element.elementname, elementtype: element.elementtype, schemaobjref: element.schemaobjref};
        }
        e.elementname = changeCase.camelCase(element.elementname.replace(/ /g, ''));
        $scope.selectedModel.elements[index] = e;
        $scope.selectedElement = e;
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
            var nestedelement = {elementname: ''};
            return nestedelement;
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
        nestedelement.elementname = changeCase.camelCase(nestedelement.elementname);
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
            var nestedelement = {elementname: data.elementname,
                      elementtype : data.elementtype,
                      schemaobjref: data.schemaobjref,
                      isarray     : data.isarray};
            return nestedelement;
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
        nestedelement.elementname = changeCase.camelCase(nestedelement.elementname);
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
                              modelname: '',
                              methods: ['create','remove','update','find','findOne']};
            return controller;
          },
          models: function () {
            return $scope.project.models;
          },
          templates: function () {
            var t = ['create','remove','update','find','findOne', 'Modal', 'standAlone'];
            return t;
          }
        }
      });
      
      modalInstance.result.then(function (data) {
        
        var methods = [];
        data.methods.forEach( function (method) {
          if (method === 'create' || method === 'remove' || method === 'update' || method === 'find' || method === 'findOne' || method === 'standAlone'){
            methods.push({methodname: method, methodtype: method});
          } else {
            methods.push({methodname: method, methodtype: 'Modal'});
          }
        });
                            
        var ct = {controllername: data.controllername,
                  modelname: data.modelname,
                  methods: methods,
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
                    modelname: data.modelname,
                    services: data.services,
                    lookups: data.lookups,
                    methods: data.methods};
          },
          models: function () {
            return $scope.project.models;
          },
          templates: function () {
            var t = [];
            return t;
          }
        }
      });

      modalInstance.result.then(function (controller) {
        var ct = {controllername  : controller.controllername,
                  modelname       : controller.modelname,
                  services        : controller.services,
                  lookups         : controller.lookups,
                  methods         : controller.methods};
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
                            methodtype: ''};
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
            var service = {modelname: ''};
            return service;
          },
          modelname: function () {
            if($scope.selectedController){
              var result = $scope.project.models.filter(function (model) {
                  if (model.name === $scope.selectedController.modelname){
                    return model;
                  }
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
        $scope.selectedController.services.push(data.modelname);
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
          view: function () {
            var view = {viewname  : '',
                        sections  : [ {controllername: '', sectionsize: 12, controls: [] } ] };
            return view;
          },
          templates: function () {
            var t = ['create','edit','list','view'];
            return t;
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
        var v = {viewtype   : view.viewtype,
                  viewname  : view.viewname,
                  modelname : view.modelname,
                  menuname  : view.menuname,
                  sections  : [ {controllername: view.modelname + ' Controller', sectionsize: 12, controls: [] } ] };

        var md = $scope.project.models.filter(function (model) {
                    if (model.name === view.modelname) {
                      return model;
                    }
                  })[0];
        for(var i = 0; i < md.elements.length; i++) {
          var e = md.elements[i];
          var et = '';
          switch (e.elementtype) {
            case 'String'               : et = "Text"; break;
            case 'Schema.Types.ObjectId': et = "Select"; break;
            case 'Boolean'              : et = "Checkbox"; break;
            default                     : et = e.elementtype; break;
          }
          var c = {};
          if(e.elementtype ==='Nested'){
            c = { controlname : e.elementname,
                  controltype : et,
                  width       : 12,
                  modelelement: e.elementname,
                  isarray     : e.isarray,
                  controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname)),
                  nestedcontrols: []};
            for (var ni = 0; ni < e.elements.length; ni++){
              var ne = e.elements[ni];
              var net = '';
              switch (ne.elementtype) {
                case 'String'               : net = "Text"; break;
                case 'Schema.Types.ObjectId': net = "Select"; break;
                case 'Boolean'              : net = "Checkbox"; break;
                default                     : net = ne.elementtype; break;
              }
              var nc = {controlname   : ne.elementname,
                        controltype   : net,
                        width         : 3,
                        modelelement  : ne.elementname,
                        modelname     : ne.schemaobjref,
                        controllabel  : changeCase.titleCase(changeCase.sentenceCase(ne.elementname))};
              c.nestedcontrols.push(nc);
            }
          } else {
            c ={ controlname : e.elementname,
                controltype : et,
                width       : 3,
                modelelement: e.elementname,
                modelname   : e.schemaobjref,
                controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname))};
          }
          v.sections[0].controls.push(c);
        }
        if (v.menuname){
          var menu = $scope.project.menus.filter( function (menu) {
            if(menu.menuname === v.menuname) {
              return menu;
            }
          })[0];
          var submenu = {mainmenuname : v.menuname,
                        modelname     : v.modelname};
          menu.submenus.push(submenu);
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
            var view = {viewtype  : data.viewtype,
                        viewname  : data.viewname,
                        modelname : data.modelname,
                        menuname  : data.menuname,
                        sections  : data.sections};
            return view;
          },
          templates: function () {
            var t = ['create','edit','list','view'];
            return t;
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
        var v = {viewtype   : view.viewtype,
                  viewname  : view.viewname,
                  modelname : view.modelname,
                  menuname  : view.menuname,
                  sections  : [ {controllername: view.modelname + ' Controller', sectionsize: 12, controls: [] } ] };

        var md = $scope.project.models.filter(function (model) {
          if (model.name === view.modelname) {
            return model;
          }
        })[0];
        for(var i = 0; i < md.elements.length; i++) {
          var e = md.elements[i];
          var et = '';
          switch (e.elementtype) {
            case 'String'               : et = "Text"; break;
            case 'Schema.Types.ObjectId': et = "Select"; break;
            case 'Boolean'              : et = "Checkbox"; break;
            default                     : et = e.elementtype; break;
          }
          var c = {};
          if(e.elementtype ==='Nested'){
            c = { controlname : e.elementname,
                controltype : et,
                width       : 12,
                modelelement: e.elementname,
                isarray     : e.isarray,
                controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname)),
                nestedcontrols: []
            };
            for (var ni = 0; ni < e.elements.length; ni++){
              var ne = e.elements[ni];
              var net = '';
              switch (ne.elementtype) {
                case 'String'               : net = "Text"; break;
                case 'Schema.Types.ObjectId': net = "Select"; break;
                case 'Boolean'              : net = "Checkbox"; break;
                default                     : net = ne.elementtype; break;
              }                  
              var nc = { controlname  : ne.elementname,
                        controltype   : net,
                        width         : 3,
                        modelelement  : ne.elementname,
                        modelname     : ne.schemaobjref,
                        controllabel: changeCase.titleCase(changeCase.sentenceCase(ne.elementname))
              };
              c.nestedcontrols.push(nc);
            }
          } else {
            c = { controlname : e.elementname,
            controltype : et,
            width       : 3,
            modelelement: e.elementname,
            modelname   : e.schemaobjref,            
            controllabel: changeCase.titleCase(changeCase.sentenceCase(e.elementname))};
          }
          v.sections[0].controls.push(c);
        }

        if (v.menuname) {
          var menu = $scope.project.menus.filter( function (menu) {
            if(menu.menuname === v.menuname) {
              return menu;
            }
          })[0];
          var submenu = {mainmenuname : v.menuname,
                        modelname     : v.modelname};
          menu.submenus.push(submenu);
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
      $scope.selectedSection = null;
      $scope.selectedSectionIndex = null;
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
            var c = { controlname: '' };
            return c;
          },
          models: function () {
            return $scope.project.models;
          },
          viewtype: function () {
            if ($scope.selectedView) {
              return $scope.selectedView.viewtype;
            }
          }
        }
      });

      modalInstance.result.then(function (control) {
        var c = {};
        if (control.controltype==='Nested'){
          c = {controlname  : control.controlname,
              controltype   : control.controltype,
              width         : control.width,
              modelelement  : control.modelelement,
              isarray       : control.isarray,
              controllabel  : control.controllabel,
              isreadonly    : control.isreadonly,
              nestedcontrols: control.nestedcontrols};
        } else {
          c = {controlname  : control.controlname,
              controltype   : control.controltype,
              width         : control.width,
              modelelement  : control.modelelement,
              controllabel  : control.controllabel,
              isreadonly    : control.isreadonly,
              exampletext   : control.exampletext,
              modelname     : control.modelname};
        }
        $scope.selectedSection.controls.push(c);
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
            var c = {};
            if (data.controltype==='Nested'){
              c = {controlname  : data.controlname,
                  controltype   : data.controltype,
                  width         : data.width,
                  modelelement  : data.modelelement,
                  controllabel  : data.controllabel,
                  isarray       : data.isarray,
                  nestedcontrols: data.nestedcontrols};
            } else {
              c = {controlname  : data.controlname,
                  controltype   : data.controltype,
                  width         : data.width,
                  modelelement  : data.modelelement,
                  controllabel  : data.controllabel,
                  exampletext   : data.exampletext,
                  modelname     : data.modelname,
                  isreadonly    : data.isreadonly};
            }
            return c;
          },
          models: function () {
            return $scope.project.models;
          },
          viewtype: function () {
            return $scope.selectedView.viewtype;
          }
        }
      });

      modalInstance.result.then(function (control) {
        var c = {};
        if (control.controltype==='Nested'){
          if (control.nestedcontrols) {
            c = {controlname  : control.controlname,
                controltype   : control.controltype,
                width         : control.width,
                modelelement  : control.modelelement,
                controllabel  : control.controllabel,
                isarray       : control.isarray,
                nestedcontrols: control.nestedcontrols};
          } else {
            c = {controlname  : control.controlname,
                controltype   : control.controltype,
                width         : control.width,
                modelelement  : control.modelelement,
                controllabel  : control.controllabel,
                isarray       : control.isarray,
                isreadonly    : control.isreadonly};
          }
        } else {
          c = {controlname  : control.controlname,
              controltype   : control.controltype,
              width         : control.width,
              modelelement  : control.modelelement,
              controllabel  : control.controllabel,
              isreadonly    : control.isreadonly,
              exampletext   : control.exampletext,
              modelname     : control.modelname};
        }
        $scope.selectedSection.controls[index] = c;
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
          var c = {};
          for (var i = 0; i < section.controls.length; i++) {
            var control = section.controls[i];
            if(control.controltype==='Nested'){
              c = { controlname : control.controlname,
                        controltype : control.controltype,
                        width       : control.width,
                        modelelement: control.modelelement,
                        controllabel: control.controllabel,
                        isarray     : control.isarray,
                        nestedcontrols: []};
              for (var ni = 0; ni < control.nestedcontrols.length; ni++) {
                var nestedcontrol = control.nestedcontrols[ni];
                var nc = { controlname  : nestedcontrol.controlname,
                            controltype : nestedcontrol.controltype,
                            width       : nestedcontrol.width,
                            modelelement: nestedcontrol.modelelement,
                            controllabel: nestedcontrol.controllabel,
                            exampletext : nestedcontrol.exampletext,
                            modelname   : nestedcontrol.modelname};
                c.nestedcontrols.push(nc);
              }
            } else {
              c = { controlname : control.controlname,
                        controltype : control.controltype,
                        width       : control.width,
                        modelelement: control.modelelement,
                        controllabel: control.controllabel,
                        exampletext : control.exampletext,
                        modelname   : control.modelname};
            }
            controls.push(c);
          }
          $scope.selectedSection.controls = controls;
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.exportElements = function () {
      return $scope.selectedModel.elements;
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
          },
          models: function () {
            return $scope.project.models;
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
            var c = {controlname  : data.controlname,
                      controltype : data.controltype,
                      width       : data.width,
                      modelelement: data.modelelement,
                      controllabel: data.controllabel,
                      exampletext : data.exampletext,
                      modelname   : data.modelname};
            return c;
          },
          models: function () {
            return $scope.project.models;
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

    $scope.moduleList = [];
    var statictext = 'yo meanjs:crud-module ';
    $scope.listModules = function () {
      $scope.moduleList.splice(0);
      $scope.project.models.forEach(function (item) {
        $scope.moduleList.push(statictext + changeCase.titleCase(item.name).replace(/ /g, '-'));
      });

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

angular.module('composerApp').controller('SubMenuInstanceCtrl', function ($scope, $modalInstance, submenu, views) {

  $scope.submenu = submenu;
  $scope.views = views;

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
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;

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
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;

  $scope.ok = function () {
    $modalInstance.close($scope.nestedelement);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControllerInstanceCtrl', function ($scope, $modalInstance, controller, models, templates) {

  $scope.controller = controller;
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;
  
  $scope.templates = templates;

  $scope.fetchTemplateslist = function () {
   
    var model = $scope.models.filter( function (model) {
      if(model.name === $scope.controller.modelname) {
        return model;
      }
    })[0];
   
    $scope.templates = ['create','remove','update','find','findOne','standAlone'];
    model.elements.reduce( function (template, element) {
      if (element.elementtype === 'Nested') {
        $scope.templates.push(element.elementname);
      }
    });
    
  };
      
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
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;

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

angular.module('composerApp').controller('ViewInstanceCtrl', function ($scope, $modalInstance, view, templates, models, menus) {

  $scope.view       = view;
  $scope.templates  = templates;
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;  
  
  $scope.menus      = menus;

  $scope.ok = function () {
    $modalInstance.close( $scope.view );
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('SectionInstanceCtrl', function ($scope, $modalInstance, section, controllers) {

  $scope.section      = section;
  $scope.controllers  = controllers;

  $scope.ok = function () {
    $modalInstance.close($scope.section);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

angular.module('composerApp').controller('ControlInstanceCtrl', function ($scope, $modalInstance, control, models, viewtype) {

  $scope.control  = control;

  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;
  
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

angular.module('composerApp').controller('NestedControlInstanceCtrl', function ($scope, $modalInstance, nestedcontrol, models) {

  $scope.nestedcontrol = nestedcontrol;
  var modelList = [];
  models.forEach(function (model) {
    modelList.push({name: model.name});
  });
  modelList.push({name: 'User'});
  $scope.models = modelList;  

  $scope.ok = function () {
    $modalInstance.close($scope.nestedcontrol);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});