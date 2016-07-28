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
