angular.module('nWatch').controller('userCtrl', function($scope, userSrvc) {
  $scope.hasInfo = true
  $scope.update = () => {$scope.hasInfo = !$scope.hasInfo}
  $scope.updateInfo = function(id, firstname, lastname, username, email, password, picture) {
    $scope.hasInfo = !$scope.hasInfo
    userSrvc.updateInfo(id, firstname, lastname, username, email, password, picture).then(function(res) {
      //will move $scope.hasInfo = !$scope.hasInfo to here after the database updates and resets the session object with the updated user info
    })
  }
  $scope.myEvents = userSrvc.events
  $scope.attending = userSrvc.attending
  // $scope.userInfo = userSrvc.userInfo[0]


  //Code that actually hits the database and is functional
  $scope.getUser = () => {
    userSrvc.getUser().then(function(res) {
      let data = res.data.user[0]
      $scope.user = data
    })
  }
  $scope.getUser()






})
