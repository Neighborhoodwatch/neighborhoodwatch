angular.module('nWatch').service('authSrvc', function($http) {

  this.checkLoggedIn = () => {
    return $http({
      method: 'GET',
      url: '/api/auth/checklogin'
    })
  }

})
