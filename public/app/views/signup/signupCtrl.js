angular.module('nWatch').controller('signupCtrl', function($scope, signupSrvc, $state, loginSrvc, $rootScope) {
  $scope.uploadme = {}
  $scope.uploadme.src = "app/img/profilepicture/default_picture.jpg"
  $scope.face = null
  $scope.google = null
      //callback function that resets signup form. Gets fired off if there was an issue signing someone up
  $scope.reset = function(form) {
    form.$setPristine();
    form.$setUntouched();
    let controlNames = Object.keys(form).filter(key => key.indexOf('$') !== 0);
    for (let name of controlNames) {
      let control = form[name];
      control.$setViewValue(undefined);
    }

    $scope.firstname = ''
    $scope.lastname = ''
    $scope.email = ''
    $scope.username = ''
    $scope.password = ''
    $scope.uploadme.src = ''
    $scope.confirm = ''

  };
  //master function that handles signing up a user. takes in callback (reset) that will be fired off if there is an issue signing up the user.
  $scope.createUser = (first_name, last_name, username, email, facebook_id, google_id, password, photo, cb, form) => {
    signupSrvc.createUser(first_name, last_name, username, email, facebook_id, google_id, password, photo)
    .then(function(res) {
      if(res.status === 200) {
        loginSrvc.login(username, password).then(function(res) {
          $rootScope.$broadcast('createUser')
          $state.go('user')
        })
      }
    }, function(err) {
      if(err) {
        alert('There was a problem signing you up. Usernames must be unique. Please try again.');
        console.log(err);
        cb(form)
      }
    })
  }
})
