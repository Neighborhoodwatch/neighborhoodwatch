angular.module('nWatch').controller('loginCtrl', function($scope, one, loginSrvc, $state) {

  $scope.facebookLogin = () => {console.log('Login with Facebook')}
  $scope.googleLogin = () => {console.log('Login with Google')}


  $scope.login = (username, password) => {
    // $state.go('user')
    loginSrvc.login(username, password).then(function(res) {
      if(res.status === 200) {
        $state.go('user')
      } else {
        alert('Username and password did not match')
      }
    })
  }

})
