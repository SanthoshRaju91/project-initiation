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
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() {
	  angular.module('weather.component', [])
	  .constant('LocationAPI_URL', 'https://muslimsalat.com/daily.json?callback=JSON_CALLBACK')
	  .constant('WeatherAPI_URL', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=')
	  .factory('cache', ['$cacheFactory', function($cacheFactory) {
	    return $cacheFactory('cache', {
	      capacity: 100
	    });
	  }])
	  .factory('http', ['$http', 'cache', function($http, cache) {
	    //Header configurations
	    let headers = {
	      'cache': cache,
	      'dataType': 'json'
	    };
	    //APPID for api.openweathermap.org, without this you will get the valid response.
	    let APPID = 'bc1e24c531732375aece237bb2a5d49a';
	    return {
	      config: headers,
	      get: function(url, succes, fail) {
	        return $http.get(url + '&APPID=' + APPID, this.config);
	      },
	      getLocal: function(url, succes, fail) {
	        return $http.get(url);
	      },
	      jsonp: function(url, success, fail) {
	        return $http.jsonp(url, this.config);
	      }
	    };
	  }])
	  .factory('weatherAPI', ['http', 'LocationAPI_URL', 'WeatherAPI_URL', function(http, LocationAPI_URL, WeatherAPI_URL) {
	    return {
	      getLocation: function() {
	        return http.jsonp(LocationAPI_URL);
	      },
	      getWeather: function(city) {
	        return http.get(WeatherAPI_URL + city + '&mode=json&units=metric');
	      }
	    }
	  }])
	  .component('weatherCanvas', {
	    bindings: {},
	    templateUrl: '../templates/components/weather/weather-canvas.html',
	    controller: ['weatherAPI', function(weatherAPI) {
	      let self = this;
	      self.forecast = {}; // forecast object to be displayed.
	      self.currentTime = moment().format('h:mm a');
	      weatherAPI.getLocation().then(function(resp) {
	        weatherAPI.getWeather(resp.data.city + ',' + resp.data.country_code).then(function(response) {
	          this.data = response.data;
	          if(this.data.list.length) {
	            this.today = this.data.list.filter(function(current) {
	              if(moment.unix(current.dt).format('MMMM Do YYYY') == moment().format('MMMM Do YYYY')) {
	                return current;
	              };
	            });
	            self.forecast.today = moment().format('ddd');
	            self.forecast.date = moment().format('MMMM Do');
	            self.forecast.weatherIcon = 'http://openweathermap.org/img/w/' + this.today[0].weather[0].icon + '.png';
	            self.forecast.temperature = this.today[0].temp.day;
	            self.forecast.min = this.today[0].temp.min;
	            self.forecast.max = this.today[0].temp.max;
	          }
	        }); // end of getWeather
	      }); // end of getLocation
	    }]
	  });
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('charts', ['chart.js'])
	    .component('chartPie', {
	      bindings: {
	        chartData: '<'
	      },
	      templateUrl: '../templates/components/chart-types/chart-pie.html',
	      controller: function() {
	        var ctrl = this;
	      }
	    })
	    .component('chartLine', {
	      bindings: {
	        chartData: '<'
	      },
	      templateUrl: '../templates/components/chart-types/chart-line.html',
	      controller: function() {
	        var ctrl = this;
	      }
	    })
	    .component('chartBar', {
	      bindings: {
	        chartData: '<'
	      },
	      templateUrl: '../templates/components/chart-types/chart-bar.html',
	      controller: function() {
	        var ctrl = this;
	      }
	    })
	    .component('chartDonut', {
	      bindings: {
	        chartData: '<'
	      },
	      templateUrl: '../templates/components/chart-types/chart-donut.html',
	      controller: function() {
	        var ctrl = this;
	      }
	    })
	    .component('chartRadar', {
	      bindings: {
	        chartData: '<'
	      },
	      templateUrl: '../templates/components/chart-types/chart-radar.html',
	      controller: function() {
	        var ctrl = this;
	      }
	    });
	}());


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('chart-component', ['chart.js'])
	    .component('chartCanvas', {
	      bindings: {
	        id: '@',
	        canvasExtent: '@',
	        chartType: '@',
	        chartData: '<',
	        canvasHeader: '@'
	      },
	      templateUrl: '../templates/components/charts/chart-canvas.html',
	      controller: function() {
	        var ctrl = this;
	        ctrl.$onInit = function() {
	          ctrl.classType = "chart chart-"+ctrl.chartType;
	        }
	        ctrl.isToggled = true;
	        ctrl.toggledIconClass = 'glyphicon-chevron-up';

	        ctrl.toggle = function() {
	          ctrl.isToggled = !ctrl.isToggled;
	          if(ctrl.isToggled) {
	            ctrl.toggledIconClass = 'glyphicon-chevron-up';
	          } else {
	            ctrl.toggledIconClass = 'glyphicon-chevron-down';
	          }
	        }
	      }
	    });
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('App', [''])
	    .controller('HomeCtrl', ['$scope', function($scope) {
	      //pie chart config
	      $scope.pieChartOptions = {
	        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	        data: [300, 500, 100],
	        options: {legend: {display: true, position: 'right'}}
	      };
	      //bar chart config
	      $scope.barChartOptions = {
	        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
	        series: ['Series A', 'Series B'],
	        data: [
	          [65, 59, 80, 81, 56, 55, 40],
	          [28, 48, 40, 19, 86, 27, 90]
	        ],
	        options: {legend: {display: true}}
	      };
	      //line chart config
	      $scope.lineChartOptions = {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        data: [
	          [65, 59, 80, 81, 56, 55, 40]
	        ],
	        series: ['Series A', 'Series B'],
	        datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
	        options: {
	          scales: {
	            yAxes: [
	              {
	                id: 'y-axis-1',
	                type: 'linear',
	                display: false,
	                position: 'left'
	              }
	            ]
	          }
	        }
	      };
	      //bubble chart config
	      $scope.doughnutChartOptions = {
	        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	        data: [300, 500, 100],
	        options: {legend: {display: true, position: 'left'}}
	      };
	    }]);
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('app.route', ['ui.router'])
	    .config(function($stateProvider, $urlRouterProvider) {
	      $urlRouterProvider.otherwise('/login');

	      $stateProvider
	        .state('home', {
	          url: '/home',
	          templateUrl: 'templates/home.html',
	          controller: 'HomeCtrl'
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
/* 6 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('App', ['app.route', 'chart-component', 'weather.component', 'charts', 'ngProgress'])
	    .config(function(ChartJsProvider) {
	      ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']});
	    })
	    .controller('AppCtrl', ['$scope', '$timeout', 'ngProgressFactory', function($scope, $timeout, ngProgressFactory) {

	      $scope.collapseSide = false;
	      $scope.collapseSideIconClass = 'visible-lg visible-md';
	      // side menu configuration
	      $scope.sideMenuConfig = [{
	        routeTo: 'home',
	        iconClass: 'glyphicon-home',
	        menuName: 'Home'
	      }, {
	        routeTo: 'main',
	        iconClass: 'glyphicon-signal',
	        menuName: 'Maps'
	      }, {
	        routeTo: 'main',
	        iconClass: 'glyphicon-headphones',
	        menuName: 'Work Integration'
	      }, {
	        routeTo: 'main',
	        iconClass: 'glyphicon-tasks',
	        menuName: 'Quality'
	      }];

	      //function to collapse side-nav-bar
	      $scope.collapseSideNav = function() {
	        if(!$scope.collapseSide) {
	          $scope.collapseSideClass = 'collapse-side';
	          $scope.collapseSide = !$scope.collapseSide;
	          $scope.collapseSideIconClass = 'visible-sm';
	        } else {
	          $scope.collapseSideClass = 'open-side';
	          $scope.collapseSide = !$scope.collapseSide;
	          $scope.collapseSideIconClass = 'visible-lg visible-md';
	        }
	      }
	    }])
	    .controller('HomeCtrl', ['$scope', function($scope) {
	      //pie chart config
	      $scope.pieChartOptions = {
	        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	        data: [300, 500, 100],
	        options: {legend: {display: true, position: 'right'}}
	      };
	      //bar chart config
	      $scope.barChartOptions = {
	        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
	        series: ['Series A', 'Series B'],
	        data: [
	          [65, 59, 80, 81, 56, 55, 40],
	          [28, 48, 40, 19, 86, 27, 90]
	        ],
	        options: {legend: {display: true}}
	      };
	      //line chart config
	      $scope.lineChartOptions = {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        data: [
	          [65, 59, 80, 81, 56, 55, 40]
	        ],
	        series: ['Series A', 'Series B'],
	        datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
	        options: {
	          scales: {
	            yAxes: [
	              {
	                id: 'y-axis-1',
	                type: 'linear',
	                display: false,
	                position: 'left'
	              }
	            ]
	          }
	        }
	      };
	      //bubble chart config
	      $scope.doughnutChartOptions = {
	        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	        data: [300, 500, 100],
	        options: {legend: {display: true, position: 'left'}}
	      };

	      $scope.barLineChartOptions = {
	        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	        data: [[65, -59, 80, 81, -56, 55, -40], [28, 48, -40, 19, 86, 27, 90]],
	        datasetOverride: [
	          {
	            label: "Bar chart",
	            borderWidth: 1,
	            type: 'bar'
	          },
	          {
	            label: "Line chart",
	            borderWidth: 3,
	            hoverBackgroundColor: "rgba(255,99,132,0.4)",
	            hoverBorderColor: "rgba(255,99,132,1)",
	            type: 'line'
	          }
	        ]
	      };
	    }]);
	})();


/***/ }
/******/ ]);