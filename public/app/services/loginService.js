angular.module('nWatch').service('loginSrvc', function($http) {

  this.login = function() {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
  }



})
