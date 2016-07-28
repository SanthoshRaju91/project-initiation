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
