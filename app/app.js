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
