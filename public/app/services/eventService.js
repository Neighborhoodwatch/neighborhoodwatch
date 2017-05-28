angular.module('').service('eventService', function($http) {
  this.getEvent = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id
    }).then(function (response) {
      return response.data;
    })
  }

  this.getEvents = function () {
    return $http({
      method: 'GET',
      url: 'api/events'
    }).then(function (response) {
      return response.data
    })
  }

  this.getFollowers = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id + '/followers'
    }).then(function (response) {
      response.data;
    })
  }

  this.save = function (event) {
    if (event.event_id ) {
      return $http({
        method: 'POST',
        url: 'api/events',
        data: event
      }).then(function (response) {
        return response.data;
      })
    } else {
      return $http({
        method: 'PUT',
        url: 'api/events/' + id + '/followers',
        data: event
      }).then(function (response) {
        return response.data;
      })
    }
  }

  this.delete = function (id) {
    return $http({
      method: 'DELETE',
      url: 'api/events/' + id,
    }).then(function (response) {
      return response.data;
    })
  }
})
