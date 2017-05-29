
angular.module('').service('userSrvc', function($http) {
  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    }).then(function (response) {
      return response.data;
    })
  }

  this.getUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    }).then(function(response) {
      return response.data;
    })
  }

  this.save = function (user) {
    if(user.user_id) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: user
      }).then(function (response) {
        return response.data;
      })
    } else {
      return $http({
        method: 'PUT',
        url: '/api/users/' + id,
        data: user
      }).then(function (response) {
        return response.data;
      })
    }
  }

  this.getEvents = function (id) {
    return $http({
      method: 'GET',
      url: 'api/users/' + id + '/events'
    }).then(function (response) {
      return response.data;
    })
  }

  this.authenticate = function() {
    return $http({
        method: 'GET',
        url: '/whoami'
      }).then(function(response) {
        return response.data;
      })
  };

})
