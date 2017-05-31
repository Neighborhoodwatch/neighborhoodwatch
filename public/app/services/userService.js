
angular.module('nWatch').service('userSrvc', function($http) {

  this.updateInfo = (user_id, first_name, last_name, username, email, photo) => {
    return $http({
      method: 'PUT',
      url: `/api/users/${user_id}`,
      data: {
        first_name,
        last_name,
        username,
        email,
        photo
      }
    })
  }

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
      url: '/api/users/'+ id
    })
  }
  this.getCurrentUser = () => {
    return $http({
      method: 'GET',
      url: '/api/current'
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
  //Will grab all the info for the user
  this.getCreatedEvents = (id) => {
    return $http({
      method: 'GET',
      url: `/api/created/${id}`
    })
  }
  this.getFollowedEvents = (id) => {
    return $http({
      method: 'GET',
      url: `/api/followed/${id}`
    })
  }
  this.getUserNeighborhood = (id) => {
    return $http({
      method: 'GET',
      url: `/api/users/neighborhood/${id}`
    })
  }
  this.getSession = () => {
    return $http({
      method: 'GET',
      url: '/whoami'
    })
  }
})
