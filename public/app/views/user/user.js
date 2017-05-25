angular.module('nWatch').controller('userCtrl', function($scope) {

  $scope.hasInfo = true
  $scope.updateInfo = function() {
      $scope.hasInfo = !$scope.hasInfo
  }

  $scope.myEvents = [
      {
      name: 'Bar-B-Q',
      date: '06/23/17',
      time: '7:00 PM',
      description: 'This is my description',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    },
      {
      name: 'Cookout',
      date: '7/12/17',
      time: '10:00 PM',
      description: 'This is my cookout',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    }
  ]


})
