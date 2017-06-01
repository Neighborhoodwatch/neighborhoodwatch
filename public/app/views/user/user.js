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
  //Grabs the session object
  $scope.getSession = () => {
    userSrvc.getSession().then(function(res) {
      let data = res.data
      console.log(data)
      $scope.user = data.user[0]
      $scope.neighborhood = data.neighborhood[0]
      $scope.followedEvents = data.followedEvents
      $scope.createdEvents = data.createdEvents
      if($scope.createdEvents.length === 0) {
        $scope.hasCreated = false
      } else if ($scope.createdEvents.length > 0) {
        $scope.hasCreated = true
      }
      if($scope.followedEvents.length === 0) {
        $scope.isFollowing = false
      } else if ($scope.followedEvents.length > 0) {
        $scope.isFollowing = true
      }
    })
  }
  //Gets user that just logged in, then invokes compileUserInfo passing the user id that was just grabbed and passes the second callback which is grab session
  $scope.getUser = (cb1, cb2) => {
    userSrvc.getCurrentUser().then(function(res) {
      let data = res.data.user[0]
      var user_id = data.user_id
        cb1(user_id, cb2)
    })
  }
  $scope.getUser($scope.compileUserInfo, $scope.getSession)

  //This function fires when update my info gets clicked and shows the update html
  $scope.update = () => {$scope.hasInfo = !$scope.hasInfo}
  //When user clicks save profile, it updates their info in the database, then reruns all the functions that are loaded on page initialization to reset the session and grab it and reload the page
  $scope.updateInfo = function(user_id, first_name, last_name, username, email, photo, cb) {
    userSrvc.updateInfo(user_id, first_name, last_name, username, email, photo).then(function(res) {
      $scope.hasInfo = !$scope.hasInfo
      cb($scope.compileUserInfo, $scope.getSession)
    })
  }

})
