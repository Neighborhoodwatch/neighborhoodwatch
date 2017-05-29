angular.module('nWatch').controller('hoodCtrl', function($scope, neighborhoodSrvc) {


  $scope.loggedIn = true
  $scope.noNeighborhood = false
  $scope.leaveNeighborhood = function() {
    $scope.noNeighborhood = !$scope.noNeighborhood
  }
  $scope.openEvents = neighborhoodSrvc.openEvents
  $scope.privateEvents = neighborhoodSrvc.privateEvents
  // Will delete these two calls once I can actually grab data from the database
  $scope.grabEvents = () => {
    neighborhoodSrvc.grabEvents().then(function(res) {
      let data = response.data
      //Will assign neighborhoods to scope then ng repeat and display the events
    })
  }




})
