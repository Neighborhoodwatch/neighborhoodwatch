angular.module('nWatch').controller('signupCtrl', function($scope, signupSrvc, $state) {
  $scope.uploadme = {}
  $scope.uploadme.src = ""
  $scope.face = null
  $scope.google = null
  $scope.createUser = (first, last, username, email, face, google, password, photo) => {
    $state.go('user')

    signupSrvc.createUser(first, last, username, email, face, google, password, photo)
    .then(function(res) {
      //Will finish once api is set up. Code should be correct though
    })
  }

})
