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
