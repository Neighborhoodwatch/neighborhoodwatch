angular.module('nWatch').service('neighborhoodSrvc', function($http) {

  this.openEvents = [
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
  this.privateEvents = [
     {
       name: 'Cookout',
       date: '7/12/17',
       time: '10:00 PM',
       description: 'This is my cookout',
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
  this.grabEvents = () => {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods'
    })
  },
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
  },
  this.grabNeighborhoods = (state, city, sort) => {
    return $http({
      method: 'GET',
      url: `/api/neighborhoods/:${state}/:${city}/:${sort}`
    })
  },
  this.joinNeighborhood = (id) => {
    return $http({
      method: 'GET',
      url: `/api/neighborhoods/${id}`
    })
  }


})
