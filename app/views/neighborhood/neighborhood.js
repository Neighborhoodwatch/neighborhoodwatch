angular.module('nWatch').controller('hoodCtrl', function($scope, one) {


  $scope.loggedIn = true
  $scope.noNeighborhood = false
  $scope.leaveNeighborhood = function() {
    $scope.noNeighborhood = !$scope.noNeighborhood
  }

})
