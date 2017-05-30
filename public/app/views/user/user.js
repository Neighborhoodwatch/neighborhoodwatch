angular.module('nWatch').controller('userCtrl', function($scope, userSrvc) {
  $scope.hasInfo = true
  //invokes on page load to grab the req.session.user, also passed to updateInfo
  $scope.getUser = () => {
    userSrvc.getUser().then(function(res) {
      let data = res.data.user[0]
      $scope.user = data
    })
  }
  $scope.getUser()

  $scope.update = () => {$scope.hasInfo = !$scope.hasInfo}
  $scope.updateInfo = function(user_id, first_name, last_name, username, email, photo, cb) {
    userSrvc.updateInfo(user_id, first_name, last_name, username, email, photo).then(function(res) {
      $scope.hasInfo = !$scope.hasInfo
      cb()
    })
  }
  $scope.myEvents = userSrvc.events
  $scope.attending = userSrvc.attending


  //Code that actually hits the database and is functional






})
