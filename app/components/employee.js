module.exports = (function() {
  angular.module('app.component', [])
    .component('employeeDetails', {
      templateUrl: '../templates/components/employeeDetails.html',
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
}());
