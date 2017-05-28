angular.module('nWatch').service('eventService', function($http) {
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
/*
angular.module('nWatch').service('eventSrvc', function ($http) {

this.event = {
  name: 'BBQ with friends',
  location: 'at my house',
  date: "may 16th",
  time: '7:00pm',
  img: 'https://static1.squarespace.com/static/55db9fb4e4b09ddcb02196d5/t/56096153e4b003fe9c8e7ef6/1443455316469/BBQ2.jpg?format=2500w',
  maps: 'http://med.stanford.edu/school/contacts/_jcr_content/main/panel_builder/panel_1/panel_builder_1/panel_0/image.img.620.high.png',
  description: 'YOYOYOYOYOYO ITS BBQ TIME!!! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}

// neighday
})
