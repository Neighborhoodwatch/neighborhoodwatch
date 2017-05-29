angular.module('nWatch').controller('signupCtrl', function($scope, signupSrvc, $state) {
  $scope.uploadme = {}
  $scope.uploadme.src = ""
  $scope.face = null
  $scope.google = null
  $scope.createUser = (first_name, last_name, username, email, facebook_id, google_id, password, photo) => {


    signupSrvc.createUser(first_name, last_name, username, email, facebook_id, google_id, password, photo)
    .then(function(res) {
      if(res.status === 200) {
        console.log(res)
        //The newly created user will be placed on express sessions
        $state.go('user')
      } else {
        alert('Something went wrong on Signup!')
      }
    })
  }

})
