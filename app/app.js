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
