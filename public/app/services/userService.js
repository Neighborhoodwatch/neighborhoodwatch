angular.module('nWatch').service('userSrvc', function($http) {

  this.events = [
      {
      name: 'Bar-B-Q',
      date: '06/23/17',
      time: '7:00 PM',
      description: 'This is my description',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    },
      {
      name: 'Cookout',
      date: '7/12/17',
      time: '10:00 PM',
      description: 'This is my cookout',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    }
  ],
  this.attending = [
      {
      name: 'Bar-B-Q',
      date: '06/23/17',
      time: '7:00 PM',
      description: 'This is my description',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    },
      {
      name: 'Cookout',
      date: '7/12/17',
      time: '10:00 PM',
      description: 'This is my cookout',
      eventImage: 'app/img/logo/neighborhood-watch.png',
      host: 'John Milwaukee'
    }
  ],
  this.userInfo = [
    {
      firstname: 'Zach',
      lastname: 'Springer',
      username: 'zachsss',
      email: 'zaspringer@gmail.com'
    }
  ]

  this.myEvents = (id) => {
    return $http({
      method: 'GET',
      url: `/api/events/:${id}`
    })
  },
  this.attendingEvents = (id) => {
    return $http({
      method: 'GET',
      url: `/api/events/:${id}`
    })
  }

})
