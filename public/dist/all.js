'use strict';

angular.module('nWatch', ['ui.router', 'ngMessages']).config(function ($stateProvider, $urlRouterProvider) {

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
  }).state('user', {
    url: '/user',
    templateUrl: './app/views/user/user.html',
    controller: 'userCtrl'
  }).state('newNeighborhood', {
    url: '/newneighborhood',
    templateUrl: './app/views/newNeighborhood/newNeighborhood.html',
    controller: 'newNeighborhoodCtrl'
  }).state('events', {
    url: '/events',
    templateUrl: './app/views/events/events.html',
    controller: 'eventsCtrl'
  }).state('editEvents', {
    url: '/event/edit',
    templateUrl: './app/views/editEvent/editEvent.html',
    controller: 'editEventCtrl'
  }).state('signup', {
    url: '/signup',
    templateUrl: './app/views/signup/signup.html',
    controller: 'signupCtrl'
  }).state('admin', {
    url: '/admin',
    templateUrl: './app/views/admin/admin.html',
    controller: 'adminCtrl'
  }).state('createEvent', {
    url: '/event/create',
    templateUrl: './app/views/createEvent/createEvent.html',
    controller: 'createEventCtrl'
  });
});

angular.module('nWatch').directive('nwFindNeighborhood', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/findNeighborhood.html',
    controller: function controller($scope) {}
  };
});

angular.module('nWatch').directive('nwMyInfo', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/myInfo.html',
    controller: function controller($scope) {}
  };
});

angular.module('nWatch').directive('nwNeighborhoodLoggedIn', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/neighborhoodLoggedIn.html',
    controller: function controller($scope) {}
  };
});

angular.module('nWatch').directive('nwNeighborhoodLoggedOut', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/neighborhoodLoggedOut.html',
    controller: function controller($scope) {}
  };
});

angular.module('nWatch').service('eventSrvc', function ($http) {

  this.event = {
    name: 'BBQ with friends',
    location: 'at my house',
    date: "may 16th",
    time: '7:00pm',
    img: 'https://static1.squarespace.com/static/55db9fb4e4b09ddcb02196d5/t/56096153e4b003fe9c8e7ef6/1443455316469/BBQ2.jpg?format=2500w',
    maps: 'http://med.stanford.edu/school/contacts/_jcr_content/main/panel_builder/panel_1/panel_builder_1/panel_0/image.img.620.high.png',
    description: 'YOYOYOYOYOYO ITS BBQ TIME!!! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  };
  this.getMaps = function (address) {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    });
  };
});

angular.module('nWatch').service('one', function () {
  this.words = function () {
    return "wow this is in a service";
  };
});

angular.module('nWatch').controller('adminCtrl', function ($scope) {
  $scope.to = "argggghhhhh";
});

angular.module('nWatch').controller('createEventCtrl', function ($scope, eventSrvc) {
  $scope.lists = [{
    name: 'Lost Pet'
  }, {
    name: 'Damage'
  }, {
    name: 'Misc'
  }, {
    name: 'Neighborhood Watch'
  }, {
    name: 'Clean-up'
  }, {
    name: 'Missing Person'
  }, {
    name: 'Meet Up'
  }, {
    name: 'Entertainment'
  }];
  $scope.category = $scope.lists[0];

  $scope.eventImg = "yoyoyo";

  $scope.event = {
    check1: false,
    check2: false,
    check3: false
  };
  $scope.eventCreate = function (event) {
    console.log(event);
  };

  var myLatLng = { lat: -25.363, lng: 131.044 };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  var tA = '2787 E westerling way';
  eventSrvc.getMaps(tA).then(function (res) {
    var cordinates = res.data.results[0].geometry.location;
    $scope.lat = cordinates.lat;
    $scope.long = cordinates.lng;
    console.log($scope.lat, $scope.long);
  });

  $scope.changeMap = function (map) {
    if (map.address && map.city && map.state && map.zip) {
      var mapA = map.address;
      var mapC = map.city;
      var mapS = map.state;
      var mapZ = map.zip;
      var address = mapA + ' ' + mapC + ', ' + mapS + ' ' + mapZ;
      console.log(address);
      eventSrvc.getMaps(address).then(function (res) {
        var cordinates = res.data.results[0].geometry.location;
        var lati = cordinates.lat;
        var long = cordinates.lng;
        console.log($scope.lat, $scope.long);

        var myLatLng = { lat: lati, lng: long };

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      });
    } else {
      alert('please fill out all boxes on from to generate a event map');
    }
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

  $scope.event = {
    check1: false,
    check2: false,
    check3: false
  };
  $scope.eventEdit = function (event) {
    console.log(event);
  };
});

angular.module('nWatch').controller('eventsCtrl', function ($scope, eventSrvc) {

  $scope.event = eventSrvc.event;
  console.log($scope.event);
  $scope.eventSignUp = function (id) {};
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

  $scope.loggedIn = true;
  $scope.noNeighborhood = false;
  $scope.leaveNeighborhood = function () {
    $scope.noNeighborhood = !$scope.noNeighborhood;
  };

  $scope.openEvents = [{
    name: 'Bar-B-Q',
    date: '06/23/17',
    time: '7:00 PM',
    description: 'This is my description',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }, {
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }, {
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }];
  $scope.privateEvents = [{
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }, {
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }, {
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }];
});

angular.module('nWatch').controller('newNeighborhoodCtrl', function ($scope, one) {});

angular.module('nWatch').controller('signupCtrl', function ($scope) {});

angular.module('nWatch').controller('userCtrl', function ($scope) {

  $scope.hasInfo = true;
  $scope.updateInfo = function () {
    $scope.hasInfo = !$scope.hasInfo;
  };

  $scope.myEvents = [{
    name: 'Bar-B-Q',
    date: '06/23/17',
    time: '7:00 PM',
    description: 'This is my description',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }, {
    name: 'Cookout',
    date: '7/12/17',
    time: '10:00 PM',
    description: 'This is my cookout',
    eventImage: 'app/img/logo/neighborhood-watch.png',
    host: 'John Milwaukee'
  }];
});