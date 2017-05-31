
angular.module('nWatch').service('neighborhoodSrvc', function($http) {
  this.createNeighborhood = (name, city, state) => {
    return $http({
      method: 'POST',
      url: '/api/neighborhoods',
      data: {
        name,
        city,
        state
      }
    })
  }
  this.getNeighborhood = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id
    }).then(function (response) {
      return response.data;
    })
  }
  //Used to get neighborhoods based on state passed in
  this.getNeighborhoods = function (state) {
    return $http({
      method: 'GET',
      url: `/api/neighborhoods?state=${state}`
    })
  }

  this.saveNeighborhood = function (neighborhood) {
    if(neighborhood.neighborhood_id) {
      return $http({
        method: 'POST',
        url: '/api/neighborhoods/' + neighborhood.neighborhood_id,
        body: neighborhood
      }).then(function (response) {
        return response.data
      })
    } else {
      return $http({
        method: 'PUT',
        url: '/api/neighborhoods',
        body: neighborhood
      }).then(function (response) {
        return response.data
      })

    }
  }

  this.deleteNeighborhood = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/neighborhoods/' + id
    }).then(function (response) {
      return response.data;
    })
  }

  this.getUsers = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id + "/users"
    }).then(function (response) {
      return response.data;
    })
  }

  this.getEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id + "/events"
    })
  }
  this.getSession = () => {
    return $http({
      method: 'GET',
      url: '/whoami'
    })
  }
  this.updateUserNeighborhood = (id, neighborhood_id) => {
    return $http({

      method: 'PUT',
      url: `/api/users/${id}/neighborhood`,
      data: {
        neighborhood_id
      }
    })
  }
  this.getUserNeighborhood = (id) => {
    return $http({
      method: 'GET',
      url: `/api/users/neighborhood/${id}`
    })
  }
  this.joinNeighborhood = (neighborhood_id, user_id) => {
    return $http({
      method: 'PUT',
      url: `/api/join/neighborhood`,
      data: {
        neighborhood_id,
        user_id
      }
    })
  }
})
