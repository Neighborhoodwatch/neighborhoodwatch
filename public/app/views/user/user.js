angular.module('nWatch').controller('userCtrl', function($scope, userSrvc) {

  $scope.hasInfo = true
  $scope.updateInfo = function(firstname, lastname, username, email, password, picture) {
      $scope.hasInfo = !$scope.hasInfo
      console.log(firstname, lastname, username, email, password, picture)
  }

  $scope.myEvents = userSrvc.events
  $scope.attending = userSrvc.attending
  $scope.userInfo = userSrvc.userInfo[0]
  // This will pull in events from the service



})
