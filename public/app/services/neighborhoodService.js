
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

  this.getNeighborhoods = function () {
    return $http({
      method: 'GET',
      url: '/api/neighboorhoods'
    }).then(function (response) {
      return response.data
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
    }).then(function(response) {
      return response.data;
    })
  }
})
