angular.module('nWatch').controller('hoodCtrl', function($scope, one) {


  $scope.loggedIn = true
  $scope.noNeighborhood = false
  $scope.leaveNeighborhood = function() {
    $scope.noNeighborhood = !$scope.noNeighborhood
  }


  $scope.openEvents = [
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
  $scope.privateEvents = [
     {
       name: 'Cookout',
       date: '7/12/17',
       time: '10:00 PM',
       description: 'This is my cookout',
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
