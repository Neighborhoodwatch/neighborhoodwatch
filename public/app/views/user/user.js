angular.module('nWatch').controller('userCtrl', function($scope, userSrvc, $timeout, uploadFile, $rootScope) {
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
      $scope.facebookId = data.user[0].facebook_id
      if(data.facebookUser === true) {
        $scope.hasInfo = false
        $scope.previous_id = data.user[0].user_id
        $scope.facebookUser = true
        $rootScope.$broadcast('facebook-user')
        alert('Please update your profile information and set a password')
      }
      $scope.user = data.user[0]
      $scope.usernameNoUpdate = $scope.user.username
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
      var user_id = data.user_id;
      $scope.thumbnail = {};
      $scope.thumbnail.dataUrl = data.photo;
      cb1(user_id, cb2)
    })
  }
  $scope.getUser($scope.compileUserInfo, $scope.getSession)

  //This function fires when update my info gets clicked and shows the update html
  $scope.update = () => {$scope.hasInfo = !$scope.hasInfo}
  //When user clicks save profile, it updates their info in the database, then reruns all the functions that are loaded on page initialization to reset the session and grab it and reload the page
  $scope.updateInfo = function(user_id, first_name, last_name, username, email, facebook_id, photo, password, cb) {
    if($scope.facebookUser === true) {
      userSrvc.getUserEmail(email).then(function(res) {
        let data = res.data
        if(data.length > 0) {
          let user_id = data[0].user_id
          userSrvc.updateInfo(user_id, first_name, last_name, username, email, facebook_id, photo, password).then(function(res) {
            var previous_id = $scope.previous_id
            if(previous_id) {
              userSrvc.deletefacebook(previous_id).then(function(res) {
                $rootScope.$broadcast('facebook-not-user')
                $scope.facebookUser = false
                $scope.hasInfo = !$scope.hasInfo
                cb($scope.compileUserInfo, $scope.getSession)
              })
            } else {

              userSrvc.updatedfacebook().then(function(res) {
                $rootScope.$broadcast('facebook-not-user')
                $scope.facebookUser = false
                $scope.hasInfo = !$scope.hasInfo
                cb($scope.compileUserInfo, $scope.getSession)
              })
            }
          }, function(err) {
            if(err.data.code === '23505') {
              alert('Unable to update info. Username matched a previous record. Please pick a different username.')
              $scope.user.username = $scope.usernameNoUpdate
            } else {
              alert('Something went wrong on update. Please try again.')
            }
          })
        } else {
          userSrvc.updateInfo(user_id, first_name, last_name, username, email, facebook_id, photo, password).then(function(res) {

              userSrvc.updatedfacebook().then(function(res) {
                $rootScope.$broadcast('facebook-not-user')
                $scope.facebookUser = false
                $scope.hasInfo = !$scope.hasInfo
                cb($scope.compileUserInfo, $scope.getSession)
              })

          }, function(err) {
            if(err.data.code === '23505') {
              alert('Unable to update info. Username matched a previous record. Please pick a different username.')
              $scope.user.username = $scope.usernameNoUpdate
            } else {
              alert('Something went wrong on update. Please try again.')
            }
          })
        }
      })
    } else {

      userSrvc.updateInfo(user_id, first_name, last_name, username, email, facebook_id, photo, password).then(function(res) {
        userSrvc.updatedfacebook().then(function(res) {
          $scope.facebookUser = false
          $scope.hasInfo = !$scope.hasInfo
          cb($scope.compileUserInfo, $scope.getSession)
        })
      }, function(err) {
        if(err.data.code === '23505') {
          alert('Unable to update info. Username matched a previous record. Please pick a different username.')
          $scope.user.username = $scope.usernameNoUpdate
        } else {
          alert('Something went wrong on update. Please try again.')
        }
      })
    }
  }

  $scope.cancelChanges = () => {
    $scope.hasInfo = !$scope.hasInfo
  }

  //File upload functions
  $scope.file = {};
  $scope.message = false;
  $scope.alert = '';
  $scope.defaultUrl = 'app/img/profilepicture/default_picture.jpg';
  $scope.defaultEventUrl = 'app/img/dandelion.jpg';

  $scope.Submit = function() {
      $scope.uploading = true;
      uploadFile.upload($scope.file).then(function(data) {
          if (data.data.success) {
              $scope.uploading = false;
              $scope.alert = 'alert alert-success';
              $scope.message = data.data.message;
              $scope.file = {};
          } else {
              $scope.uploading = false;
              $scope.alert = 'alert alert-danger';
              $scope.message = data.data.message;
              $scope.file = {};
          }
      });
  };

  $scope.photoChanged = function(files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
          $scope.uploading = true;
          var file = files[0];
          var fileReader = new FileReader();

          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
              $timeout(function() {
                  $scope.thumbnail = {};
                  $scope.thumbnail.dataUrl = e.target.result;
                  $scope.user.photo = 'app/img/' + file.name || $scope.defaultUrl;
                  $scope.uploading = false;
                  $scope.message = false;
              });
          };
      } else {
          $scope.thumbnail = {};
          $scope.message = false;
      }
  };

})
