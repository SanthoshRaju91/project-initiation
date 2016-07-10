/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('app.route', ['ui.router'])
	    .config(function($stateProvider, $urlRouterProvider) {
	      $urlRouterProvider.otherwise('/login');

	      $stateProvider
	        .state('landing', {
	          url: '/landing',
	          templateUrl: 'templates/landing.html',
	          controller: 'LandingCtrl'
	        })
	        .state('work', {
	          url: '/work',
	          templateUrl: 'templates/work.html',
	          controller: 'WorkCtrl'
	        })
	        .state('maps', {
	          url: '/maps',
	          templateUrl: 'templates/maps.html',
	          controller: 'MapsCtrl'
	        });
	    });
	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('App', ['app.route'])
	    .controller('AppCtrl', ['$scope', function($scope) {
	      $scope.employees = [{
	        name: 'Santhosh Raju',
	        location: 'Bangalore'
	      }, {
	        name: 'Anush',
	        location: 'Chennai'
	      }];

	      $scope.update = function(employee, prop, value) {
	        employee[prop] = value;
	      };
	    }])
	    .component('employeeDetails', {
	      templateUrl: './templates/components/employeeDetails.html',
	      controller:  function() {
	        var ctrl = this;
	        ctrl.delete = function() {
	          ctrl.onDelete({employee: ctrl.employee});
	        }
	        ctrl.update = function() {
	          ctrl.onUpdate({employee: ctrl.employee, prop: 'location', value: 'Bangalore'});
	        }
	      },
	      bindings: {
	        employee: '<',
	        onDelete: '&',
	        onUpdate: '&'
	      }
	    });
	})();


/***/ }
/******/ ]);