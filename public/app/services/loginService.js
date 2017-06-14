angular.module('nWatch').service('loginSrvc', function($http) {

  this.login = function(username, password) {
    return $http({
      method: 'GET',
      url: `/api/login/${username}/${password}`
    })
  }

  this.logout = () => {
    return $http({
      method: 'GET',
      url: '/logout'
    })
  }

  this.googleLogin = () => {
    return $http({
      method: 'GET',
      url: '/auth/google'
    })
  }


})
