module.exports = (function() {
  angular.module('App', ['app.route', 'app.component', 'ngProgress'])
    .controller('AppCtrl', ['$scope', '$timeout', 'ngProgressFactory', function($scope, $timeout, ngProgressFactory) {
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

      $scope.progressbar = ngProgressFactory.createInstance();
      $scope.progressbar.setParent(document.getElementById('progress-container'));
      $scope.progressbar.start();
      $timeout(function() {
        $scope.progressbar.complete();
      }, 2000);
    }]);
})();
