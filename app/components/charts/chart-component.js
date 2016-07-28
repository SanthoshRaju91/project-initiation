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
