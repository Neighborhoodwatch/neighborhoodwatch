'use strict';

angular.module('nWatch', ['ui.router', 'ngAnimate', 'ngMessages', 'ui.bootstrap', 'ngTouch']).config(function ($stateProvider, $urlRouterProvider) {

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

angular.module('nWatch').controller('navCtrl', function ($scope, $location, $stateParams) {
  // console.log('this is location', $location.path())
  // console.log('this is', $stateParams.id);
  // $scope.personsId = $stateParams.id
  // console.log($scope.personsId);

  $scope.isActive = function (viewLocation) {
    return viewLocation == $location.path();
  };

  $scope.classActive = function (viewLocation) {
    // console.log(viewLocation);
    if ($scope.isActive(viewLocation)) {
      return 'events-nav-color';
    } else {
      return false;
    }
  };
});

angular.module('nWatch').directive('nwCreateMap', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/createMap.html',
    controller: function controller($scope, eventSrvc) {
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
        var lat = cordinates.lat;
        var long = cordinates.lng;
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
            $scope.lat = cordinates.lat;
            console.log(lati, long);
            $scope.long = cordinates.lng;

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
    }
  };
});

angular.module('nWatch').directive('fileread', function () {
  return {
    scope: {
      fileread: "="
    },
    link: function link(scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0];
          // or all selected files:
          // scope.fileread = changeEvent.target.files;
        });
      });
    }
  };
});

angular.module('nWatch').directive('nwFindNeighborhood', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/findNeighborhood.html',
    controller: function controller($scope) {}
  };
});

angular.module('nWatch').directive('nwGetMap', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/getMap.html',
    controller: function controller($scope, eventSrvc) {
      var lat = parseFloat(eventSrvc.grabEvent[4].event_location_lat);
      var long = parseFloat(eventSrvc.grabEvent[4].event_location_lon);
      console.log(lat, long);
      var myLatLng = { lat: lat, lng: long };

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    }
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
    title: 'BBQ with friends',
    location: 'at my house',
    date: "may 16th",
    event_time: '7:00pm',
    img: 'https://static1.squarespace.com/static/55db9fb4e4b09ddcb02196d5/t/56096153e4b003fe9c8e7ef6/1443455316469/BBQ2.jpg?format=2500w',
    maps: 'http://med.stanford.edu/school/contacts/_jcr_content/main/panel_builder/panel_1/panel_builder_1/panel_0/image.img.620.high.png',
    details: 'YOYOYOYOYOYO ITS BBQ TIME!!! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  };
  this.getMaps = function (address) {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    });
  };
  this.createdEvent = function (eventObj) {
    console.log("im in a service", eventObj);
  };
  this.editEvent = function (eventObj) {
    console.log("im in a service", eventObj);
  };

  this.grabEvent = [{
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
    "title": "orci. Ut sagittis lobortis",
    "type_id": 7,
    "created_by": 65,
    "event_location_lat": "-15.83664",
    "event_location_lon": "139.77701",
    "name of location": "Daves house",
    "event_date": "some date",
    "event_time": "7:00 pm"
  }, {
    "lat": "32.72301",
    "lon": "-137.35647",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
    "title": "lorem ut",
    "type_id": 5,
    "created_by": 74,
    "event_location_lat": "-58.94132",
    "event_location_lon": "-162.60614",
    "event_time": 5
  }, {
    "lat": "-63.30399",
    "lon": "45.1698",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",
    "title": "arcu. Nunc mauris. Morbi",
    "type_id": 1,
    "created_by": 88,
    "event_location_lat": "-72.76823",
    "event_location_lon": "120.08304",
    "event_time": 3
  }, {
    "lat": "-3.52549",
    "lon": "-141.7617",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",
    "title": "et malesuada fames ac",
    "type_id": 2,
    "created_by": 67,
    "event_location_lat": "-16.78785",
    "event_location_lon": "-10.20352",
    "event_time": 11
  }, {
    "lat": "69.05574",
    "lon": "-85.5249",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",
    "title": "rhoncus. Proin nisl sem, consequat",
    "type_id": 2,
    "created_by": 74,
    "event_location_lat": "49.54182",
    "event_location_lon": "59.362",
    "event_time": 2
  }, {
    "lat": "7.35512",
    "lon": "-59.0523",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet",
    "title": "eu tellus. Phasellus elit pede,",
    "type_id": 6,
    "created_by": 55,
    "event_location_lat": "1.06703",
    "event_location_lon": "-131.4077",
    "event_time": 12
  }, {
    "lat": "32.27714",
    "lon": "11.33024",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",
    "title": "arcu imperdiet ullamcorper. Duis",
    "type_id": 1,
    "created_by": 89,
    "event_location_lat": "-63.52479",
    "event_location_lon": "121.58237",
    "event_time": 3
  }, {
    "lat": "62.21508",
    "lon": "-9.83114",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida",
    "title": "Nulla facilisis.",
    "type_id": 6,
    "created_by": 50,
    "event_location_lat": "-27.67589",
    "event_location_lon": "114.89798",
    "event_time": 12
  }, {
    "lat": "-26.5582",
    "lon": "-131.61448",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis",
    "title": "iaculis odio. Nam interdum",
    "type_id": 3,
    "created_by": 75,
    "event_location_lat": "-6.418",
    "event_location_lon": "139.44585",
    "event_time": 8
  }, {
    "lat": "-10.82466",
    "lon": "82.16523",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",
    "title": "Suspendisse non leo. Vivamus nibh",
    "type_id": 4,
    "created_by": 51,
    "event_location_lat": "88.3255",
    "event_location_lon": "14.63228",
    "event_time": 1
  }, {
    "lat": "25.35664",
    "lon": "26.60283",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,",
    "title": "faucibus orci luctus",
    "type_id": 5,
    "created_by": 98,
    "event_location_lat": "32.963",
    "event_location_lon": "98.48688",
    "event_time": 7
  }, {
    "lat": "26.90914",
    "lon": "-58.19284",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    "title": "arcu et",
    "type_id": 3,
    "created_by": 96,
    "event_location_lat": "62.92709",
    "event_location_lon": "8.22257",
    "event_time": 4
  }, {
    "lat": "-1.89265",
    "lon": "105.38326",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    "title": "consequat auctor, nunc nulla",
    "type_id": 7,
    "created_by": 59,
    "event_location_lat": "-31.06213",
    "event_location_lon": "-69.15561",
    "event_time": 3
  }, {
    "lat": "-8.42796",
    "lon": "11.35168",
    "details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    "title": "vitae dolor. Donec fringilla. Donec",
    "type_id": 2,
    "created_by": 67,
    "event_location_lat": "-71.7451",
    "event_location_lon": "-160.49455",
    "event_time": 7
  }];
});

angular.module('nWatch').service('loginSrvc', function ($http) {

  this.login = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    });
  };
});

angular.module('nWatch').service('one', function () {
  this.words = function () {
    return "wow this is in a service";
  };
});

angular.module('nWatch').service('signupSrvc', function ($http) {

  this.createUser = function (first, last, username, email, face, google, password, photo) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        first: first,
        last: last,
        username: username,
        email: email,
        face: face,
        google: google,
        password: password,
        photo: photo
      }
    });
  };
});

angular.module('nWatch').service('userSrvc', function ($http) {

  this.events = [{
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
  }], this.attending = [{
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
  }], this.userInfo = [{
    firstname: 'Zach',
    lastname: 'Springer',
    username: 'zachsss',
    email: 'zaspringer@gmail.com'
  }];

  this.myEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/events/:' + id
    });
  }, this.attendingEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/events/:' + id
    });
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
  $scope.eventCreate = function (event, category) {
    event.event_location_lat = $scope.lat;
    event.event_location_lon = $scope.long;
    event.date = $scope.dt.toDateString();
    event.photo = '';
    event.category = $scope.category.name;
    console.log(event);
    eventSrvc.createdEvent(event);
  };
  // ui--bootstrap date js
  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
        mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.setDate = function (year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  function getDayClass(data) {
    var date = data.date,
        mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
});

angular.module('nWatch').controller('editEventCtrl', function ($scope, eventSrvc) {
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
  $scope.eventCreate = function (event, category) {
    event.event_location_lat = $scope.lat;
    event.event_location_lon = $scope.long;
    event.date = $scope.dt.toDateString();
    event.photo = '';
    event.category = $scope.category.name;
    console.log(event);
    eventSrvc.editEvent(event);
  };
  // ui--bootstrap date js
  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
        mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.setDate = function (year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  function getDayClass(data) {
    var date = data.date,
        mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
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

angular.module('nWatch').controller('loginCtrl', function ($scope, one, loginSrvc, $state) {

  $scope.facebookLogin = function () {
    console.log('Login with Facebook');
  };
  $scope.googleLogin = function () {
    console.log('Login with Google');
  };

  $scope.login = function (username, password) {
    $state.go('user');
    loginSrvc.login(username, password).then(function (res) {
      //Will finish up once api is connected
    });
  };
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

angular.module('nWatch').controller('signupCtrl', function ($scope, signupSrvc, $state) {
  $scope.uploadme = {};
  $scope.uploadme.src = "";
  $scope.face = null;
  $scope.google = null;
  $scope.createUser = function (first, last, username, email, face, google, password, photo) {
    $state.go('user');

    signupSrvc.createUser(first, last, username, email, face, google, password, photo).then(function (res) {
      //Will finish once api is set up. Code should be correct though
    });
  };
});

angular.module('nWatch').controller('userCtrl', function ($scope, userSrvc) {

  $scope.hasInfo = true;
  $scope.updateInfo = function (firstname, lastname, username, email, password, picture) {
    $scope.hasInfo = !$scope.hasInfo;
    console.log(firstname, lastname, username, email, password, picture);
  };

  $scope.myEvents = userSrvc.events;
  $scope.attending = userSrvc.attending;
  $scope.userInfo = userSrvc.userInfo[0];
  // This will pull in events from the service

});