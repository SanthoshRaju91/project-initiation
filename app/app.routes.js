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
