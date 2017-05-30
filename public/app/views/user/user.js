angular.module('nWatch').controller('userCtrl', function($scope, userSrvc) {
  $scope.hasInfo = true
  //invokes on page load to grab the req.session.user, also passed to updateInfo
  $scope.compileUserInfo = (id, cb) => {
    userSrvc.getCreatedEvents(id).then(function(res) {
      userSrvc.getFollowedEvents(id).then(function(res) {
        userSrvc.getUserNeighborhood(id).then(function(res) {
          cb()
        })
      })
    })
  }
  $scope.getSession = () => {
    userSrvc.getSession().then(function(res) {
      let data = res.data
      console.log(data)
      $scope.user = data.user[0]
      $scope.neighborhood = data.neighborhood[0]
      $scope.followedEvents = data.followedEvents
      $scope.createdEvents = data.createdEvents
    })
  }
  $scope.getUser = (cb1, cb2) => {
    userSrvc.getUser().then(function(res) {
      let data = res.data.user[0]
      var user_id = data.user_id
        cb1(user_id, cb2)
    })
  }
  $scope.getUser($scope.compileUserInfo, $scope.getSession)


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
