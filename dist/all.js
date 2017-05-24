'use strict';

angular.module('nWatch', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/views/home/home.html',
    controller: 'homeCtrl'
  }).state('hood', {
    url: '/hood',
    templateUrl: './app/views/neighborhood/neighborhood.html',
    controller: 'hoodCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: './app/views/login/login.html',
    controller: 'loginCtrl'
  }).state('events', {
    url: '/events',
    templateUrl: './app/views/events/events.html',
    controller: 'eventsCtrl'
  }).state('editEvents', {
    url: '/events/edit',
    templateUrl: './app/views/editEvent/editEvent.html',
    controller: 'editEventCtrl'
  });
});

angular.module('nWatch').service('one', function () {
  this.words = function () {
    return "wow this is in a service";
  };
});

angular.module('nWatch').controller('editEventCtrl', function ($scope) {
  $scope.lists = [{
    name: 'Lost Pet'
  }, {
    name: 'Damage'
  }, {
    name: 'Neighborhood Lurker'
  }, {
    name: 'Looking For'
  }];
  $scope.category = $scope.lists[0];
  // console.log($scope.category);
  // setTimeout(function(){
  //   console.log($scope.category);
  // }, 3000);

  $scope.checkboxModel = {
    value1: false,
    value2: false,
    value3: false
  };
});

angular.module('nWatch').controller('eventsCtrl', function ($scope) {

  $scope.event = {
    eventName: 'BBQ AT THE HOUSE',
    img: 'https://static1.squarespace.com/static/55db9fb4e4b09ddcb02196d5/t/56096153e4b003fe9c8e7ef6/1443455316469/BBQ2.jpg?format=2500w',
    maps: 'http://med.stanford.edu/school/contacts/_jcr_content/main/panel_builder/panel_1/panel_builder_1/panel_0/image.img.620.high.png',
    text: 'YOYOYOYOYOYO ITS BBQ TIME!!! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  };
});

angular.module('nWatch').controller('homeCtrl', function ($scope, one) {
  $scope.arr = one.words();

  $scope.people = [{
    name: 'Mike Davis',
    img: 'https://www.maxprog.com/img/cat.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: function date() {
      var date = new Date();
      return date;
    }
  }, {
    name: 'Susan Willis',
    img: 'https://s-media-cache-ak0.pinimg.com/originals/ca/17/a9/ca17a924a05c848ef199dd510eed1d75.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: function date() {
      var date = new Date();
      return date;
    }
  }, {
    name: 'Dave Lake',
    img: 'http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: function date() {
      var date = new Date();
      return date;
    }
  }];
  $scope.date = new Date();
});

angular.module('nWatch').controller('loginCtrl', function ($scope, one) {
  $scope.arr = one.words();
});

angular.module('nWatch').controller('hoodCtrl', function ($scope, one) {
  $scope.arr = one.words();
});