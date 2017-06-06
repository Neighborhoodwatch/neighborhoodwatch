angular.module('nWatch').controller('loginCtrl', function($scope, one, loginSrvc, $state, $rootScope) {

  $scope.facebookLogin = () => {
      //redirect to auth/facebook//
      console.log('Login with Facebook')}
  $scope.googleLogin = () => {
      //redirect to auth/google//
      console.log('Login with Google')}
  //Callback function passed to login function that gets fired off if there was a problem with logging in...Will reset the form
  $scope.reset = function(form) {
    form.$setPristine();
    form.$setUntouched();
    let controlNames = Object.keys(form).filter(key => key.indexOf('$') !== 0);
    for (let name of controlNames) {
        let control = form[name];
        control.$setViewValue(undefined);
    }

    $scope.username = ''
    $scope.password = ''
  };
  //Master login form..takes in username and password, hits database checking if user exists. if there was no user it will fire off its callback function (reset)
  $scope.login = (username, password, cb, form) => {
    loginSrvc.login(username, password).then(function(res) {
      if(res.status === 200 && res.data !== 'User did not exist') {
        $rootScope.$broadcast('login')
        $state.go('user')
      } else if (res.data === 'User did not exist') {
        alert('Username and password did not match any records')
        cb(form)
        $scope.username = ''
        $scope.password = ''
      }
    }, function(err) {
      if(err) {
        alert('Username and password did not match any records')
        cb(form)
        $scope.username = ''
        $scope.password = ''
      }
    })
  }

})
