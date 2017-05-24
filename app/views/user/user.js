angular.module('nWatch').controller('userCtrl', function($scope) {

  $scope.hasInfo = true
  $scope.updateInfo = function() {
      $scope.hasInfo = !$scope.hasInfo
  }


})
