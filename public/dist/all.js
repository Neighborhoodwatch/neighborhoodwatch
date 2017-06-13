'use strict';

angular.module('nWatch', ['ui.router', 'ngAnimate', 'ngMessages', 'ui.bootstrap', 'ngTouch', 'uploadFileService', 'fileModelDirective']).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/views/home/home.html',
    controller: 'homeCtrl'
  }).state('hood', {
    url: '/hood',
    templateUrl: './app/views/neighborhood/neighborhood.html',
    controller: 'hoodCtrl',
    resolve: {
      checkLogin: function checkLogin(authSrvc, $q, adminAuth, $state) {
        var deferred = $q.defer();
        if (adminAuth.checkClientPermission()) {
          deferred.resolve();
        }
        authSrvc.checkLoggedIn().then(function (res) {
          var data = res.data;
          if (data === false) {
            deferred.reject();
            $state.go('login');
            alert('Please login');
          } else {
            deferred.resolve();
          }
        });
        return deferred.promise;
      }
    }
  }).state('login', {
    url: '/login',
    templateUrl: './app/views/login/login.html',
    controller: 'loginCtrl',
    resolve: {
      checkLogin: function checkLogin(authSrvc, $q, adminAuth, $state) {
        var deferred = $q.defer();
        if (adminAuth.checkClientPermission()) {
          $state.go('user');
        }
        authSrvc.checkLoggedIn().then(function (res) {
          var data = res.data;
          if (data === false) {
            deferred.resolve();
          } else {
            adminAuth.getClientPermission();
            deferred.resolve();

            $state.go('user');
          }
        });
        return deferred.promise;
      }
    }
  }).state('user', {
    url: '/user',
    templateUrl: './app/views/user/user.html',
    controller: 'userCtrl',
    resolve: {
      checkLogin: function checkLogin(authSrvc, $q, adminAuth, $state) {
        var deferred = $q.defer();
        if (adminAuth.checkClientPermission()) {
          deferred.resolve();
        } else {
          authSrvc.checkLoggedIn().then(function (res) {
            var data = res.data;
            if (data === true) {
              adminAuth.getClientPermission();
              deferred.resolve();
            } else {
              deferred.reject();
              $state.go('login');
              alert('Please login');
            }
          });
        }
        return deferred.promise;
      }
    }
  }).state('newNeighborhood', {
    url: '/newneighborhood',
    templateUrl: './app/views/newNeighborhood/newNeighborhood.html',
    controller: 'newNeighborhoodCtrl',
    resolve: {
      checkLogin: function checkLogin(authSrvc, $q, adminAuth, $state) {
        var deferred = $q.defer();
        if (adminAuth.checkClientPermission()) {
          deferred.resolve();
        } else {
          authSrvc.checkLoggedIn().then(function (res) {
            var data = res.data;
            if (data === true) {
              adminAuth.getClientPermission();
              deferred.resolve();
            } else {
              deferred.reject();
              $state.go('login');
              alert('Please login');
            }
          });
        }
        return deferred.promise;
      }
    }
  }).state('events', {
    url: '/events/:eventId',
    templateUrl: './app/views/events/events.html',
    controller: 'eventsCtrl',
    resolve: {
      event: function event(eventSrvc, $stateParams) {
        var eventId = $stateParams.eventId;
        return eventSrvc.getEvent(eventId).then(function (response) {
          return response;
        });
      }
    }
  }).state('editEvents', {
    url: '/event/edit/:eventId',
    templateUrl: './app/views/editEvent/editEvent.html',
    controller: 'editEventCtrl',
    resolve: {
      checkLogin: function checkLogin(sessionSrv, $q, $stateParams, $state, eventSrvc) {
        var eventId = $stateParams.eventId;
        var defer = $q.defer();
        sessionSrv.session(eventId).then(function (res) {
          if (res.isLoggedIn !== true) {
            defer.reject();
          } else {
            var user = res.user[0].user_id;
            eventSrvc.getEvent(eventId).then(function (response) {
              var eventCreator = response[0].created_by;
              if (eventCreator == user) {
                defer.resolve();
              } else {
                defer.reject();
                $state.go('home');
                alert("Sorry, you did not create this event");
              }
            });
          }
        });
        return defer.promise;
      },
      myEvent: function myEvent(eventSrvc, $stateParams) {
        var eventId = $stateParams.eventId;
        return eventSrvc.getEvent(eventId).then(function (response) {
          return response;
        });
      }
    }
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
    controller: 'createEventCtrl',
    resolve: {
      checkNeigborhood: function checkNeigborhood(sessionSrv, $q, $stateParams, $state) {
        var eventId = $stateParams.eventId;
        var defer = $q.defer();
        sessionSrv.session().then(function (res) {
          var hood = res.neighborhood;
          if (hood == undefined || hood.length == 0) {
            defer.reject();
            $state.go('newNeighborhood');
            alert("Sorry, you need to join/create a neighborhood before you can create an event.");
          } else {
            defer.resolve();
          }
        });

        return defer.promise;
      }
    }
  });
});

angular.module('nWatch').controller('navCtrl', function ($scope, $location, $stateParams, userSrvc, loginSrvc, $state, $rootScope, adminAuth) {
  //This sets navbar to logged out initially until check login fires and determines whether user is logged in
  $scope.isLoggedIn = false;
  //fires off on page load to determine whether user is logged in
  $scope.checkLogin = function () {
    userSrvc.getSession().then(function (resp) {
      if (resp.data.isLoggedIn) {

        $scope.isLoggedIn = resp.data.isLoggedIn;
      } else {
        $scope.isLoggedIn = false;
      }
    });
  };
  $scope.checkLogin();
  //Listens for the login function to fire off in loginCtrl and then fires of checklogin to set isLoggedIn to true
  $scope.$on('login', function (event, array) {
    $scope.checkLogin();
  });
  //Listens for the createUser function to fire off in signupCtrl and then fires of checklogin to set isLoggedIn to true
  $scope.$on('createUser', function (event, array) {
    $scope.checkLogin();
  });
  //fires off when logout button is clicked and resets adminAuth.access to false so resolve on login view can see user is not logged in, then gets session and resets $scope.isLoggedIn to false
  $scope.$on('logout', function (event, array) {
    adminAuth.logout();
    userSrvc.getSession().then(function (resp) {
      if (resp.data.isLoggedIn) {

        $scope.isLoggedIn = resp.data.isLoggedIn;
      } else {
        $scope.isLoggedIn = false;
      }
      $state.go('login');
    });
  });

  $scope.isActive = function (viewLocation) {
    return viewLocation == $location.path();
  };

  $scope.classActive = function (viewLocation) {
    // console.log(viewLocation);
    if ($scope.isActive(viewLocation)) {
      // return 'events-nav-color';
      return 'active';
    } else {
      // return false;
      return '';
    }
  };
  //fires off when logout is clicked, destroys the session then does the rest of the logout function
  $scope.logout = function () {
    loginSrvc.logout().then(function (res) {
      $rootScope.$broadcast('logout');
    });
  };
});

// var express = require('express');
// var path = require('path');
// // var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var massive = require('massive');
//
// var config = require('./config');
//
// //authentication
// var FacebookStrategy = require('passport-facebook').Strategy;
// var passport = require('passport');
//
// //Routes
// var index = require('./routes/index');
// var products = require('./routes/products');
// var customers = require('./routes/customers');
// var states = require('./routes/states');
// var orders = require('./routes/orders');
// var orderitems = require('./routes/orderitems');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
//       var err = new Error();
//       err.code = 'filetype';
//       return cb(err);
//     } else {
//       cb(null, file.originalname);
//     }
//   }
// });
//
// var upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 }
// }).single('myfile');
//
// app.post('/upload', function(req, res) {
//   upload(req, res, function(err) {
//     if (err) {
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
//       } else if (err.code === 'filetype') {
//         res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
//       } else {
//         res.json({ success: false, message: 'Unable to upload file' });
//       }
//     } else {
//       if (!req.file) {
//         res.json({ success: false, message: 'No file was selected' });
//       } else {
//         res.json({ success: true, message: 'File uploaded!' });
//       }
//     }
//   });
// });
//
// var connectionString = "postgres://" + config.dbUser + ":" + config.dbPassword + "@localhost/" + config.database;
// var instance = massive.connectSync({
//   connectionString: connectionString
// });
//
// app.set('db', instance);
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/images', express.static(path.join(__dirname, 'uploads')));
//
// app.use(session({
//   secret: config.sessionSecret
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: config.facebook.callbackURL
// }, function(token, refreshToken, profile, done) {
//   console.log('user logged in', profile, token);
//   var id,  name;
//
//   if(profile.emails) {
//     id= profile.emails[0].value;
//   } else {
//     // id=profile.displayName;
//     id=profile.id;
//   }
//   name = profile.displayName;
//
//   db.get_user_facebook([id], function(err, user) {
//     if(err) {
//       // console.log('getFacebookUser', id, err);
//       return done(err);
//     }
//
//     if(user && user.length > 0) {
//       console.log('found user, updating...', user);
//       //TODO: Update user?
//       session.user = user;
//       console.log('setting session user-->', session.user);
//       return done(null, user);
//     } else {
//       console.log('inserting user...', id, name, token);
//       //name, email, password, profiletoken, facebookid
//       db.insert_user([name, id, '', token, 0],
//       function(err, user) {
//         if(err) {
//           console.log('getNewFacebookUser', id, err);
//           return done(err);
//         }
//
//         session.user = user;
//         console.log('setting session user-->', session.user);
//
//         return done(null, {
//           name: name,
//           email: id,
//           password: '',
//           profiletoken: token
//         })
//       })
//     }
//   })
// }));
//
// //call facebook app for authentication --just middleware here, no callback
// app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
//
// //facebook returns to this url to do something after authentication
// //pass string, middleware, callback function
// app.get('/auth/facebook/callback',
// passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/auth/facebook'
// }),
// function(req, res, next) {
//   return next(res);
// }
// );
//
// app.get('/whoami', function(req, res, done) {
//   console.log('authenticate', session.user);
//   return res.send(session.user);
// })
//
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
//
// var db = app.get('db');
//
// app.use('/', index);
// // app.use('/users', users);
// app.use('/api', products);
// app.use('/api', customers);
// app.use('/api', states);
// app.use('/api', orders);
// app.use('/api', orderitems);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

angular.module('nWatch').directive("compareTo", function () {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function link(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
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
          eventSrvc.getMaps(address).then(function (res) {
            var cordinates = res.data.results[0].geometry.location;
            var lati = cordinates.lat;
            var long = cordinates.lng;
            $scope.lat = cordinates.lat;
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

angular.module('nWatch').directive('nwEditCreateMap', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/editCreateMap.html',
    controller: function controller($scope, eventSrvc) {
      var myLatLng = { lat: -25.363, lng: 131.044 };

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
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
          eventSrvc.getMaps(address).then(function (res) {
            var cordinates = res.data.results[0].geometry.location;
            var lati = cordinates.lat;
            var long = cordinates.lng;
            $scope.lat = cordinates.lat;
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

angular.module('nWatch').directive('eventCard', function () {
  return {
    restrict: 'E', //E = element, A = attribute, C = class, M = comment
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      title: '@',
      date: '@',
      details: '@',
      eventId: '@',
      photo: '@'
    },
    templateUrl: './app/directives/eventCard.html',
    // controller: controllerFunction, //Embed a custom controller in the directive
    link: function link($scope, element, attrs) {}
    // console.log($scope,attrs);
    //DOM manipulation
  };
});

angular.module('fileModelDirective', []).directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var parsedFile = $parse(attrs.fileModel);
      var parsedFileSetter = parsedFile.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          parsedFileSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

/*Usage*/
/*template*/
/*
<div ng-show="uploading" class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
          <span class="sr-only">45% Complete</span>
        </div>
      </div>

      <div ng-show="message">
        <div ng-class="alert">{{ message }}</div>
      </div>
      <br>
      <br>
      <form ng-submit="Submit();">
        <label class="btn btn-success">
          Browse
          <input type="file" ng-disabled="uploading" file-model="file.upload" name="myfile" style="display: none;" onchange="angular.element(this).scope().photoChanged(this.files)">
        </label>
        <br>
        <br>
        <button ng-disabled="uploading" type="submit" class="btn btn-primary">Upload</button>
      </form>

      <br>

      <img class="mythumbnail" ng-src="{{ thumbnail.dataUrl || defaultUrl }}">
*/

/*uploadFileService.js*/
/*
angular.module('uploadFileService', []).service('uploadFile', function($http) {
    this.upload = function(file) {
        var fd = new FormData();
        fd.append('myfile', file.upload);
        return $http.post('/upload/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };
});
*/

/*app, controller*/
/*
include in app array --> 'uploadFileService', 'fileModelDirective'  //fileModelDirective = this file (check name tf directive),  Service included below
include in service list -->  $timeout, uploadFile

	$scope.file = {};
	$scope.message = false;
	$scope.alert = '';
	$scope.defaultUrl = 'images/app_product.png';

	$scope.Submit = function() {
      $scope.uploading = true;
      uploadFile.upload($scope.file).then(function(data) {
          if (data.data.success) {
              $scope.uploading = false;
              $scope.alert = 'alert alert-success';
              $scope.message = data.data.message;
              $scope.file = {};
          } else {
              $scope.uploading = false;
              $scope.alert = 'alert alert-danger';
              $scope.message = data.data.message;
              $scope.file = {};
          }
      });
  };

  $scope.photoChanged = function(files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
          $scope.uploading = true;
          var file = files[0];
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
              $timeout(function() {
                  $scope.thumbnail = {};
                  $scope.thumbnail.dataUrl = e.target.result;
                  if(!$scope.product.imageurl) {
                    $scope.product.imageurl = 'images/' + file.name || $scope.defaultUrl;
                  }
                  $scope.uploading = false;
                  $scope.message = false;
              });
          };
      } else {
          $scope.thumbnail = {};
          $scope.message = false;
      }
  };

*/

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
    controller: function controller($scope, neighborhoodSrvc, userSrvc) {
      $scope.applied = false;
      //Determines sort order, grabs neighborhoods based on state, orders list by city name

      var previousState;
      var noStateChange = true;
      //Function that fires if only state is changed to reload the database calls
      $scope.stateSearchChange = function (state, city, sort) {
        previousState = state;
        noStateChange = false;
        neighborhoodSrvc.getNeighborhoods(state).then(function (res) {
          var data = res.data;
          var checkMatch = function checkMatch(obj) {
            return obj.city.toUpperCase() === city.toUpperCase();
          };
          var noMatch = function noMatch(obj) {
            return obj.city.toUpperCase() !== city.toUpperCase();
          };
          var matchingArr = data.filter(checkMatch);
          var noMatchingArr = data.filter(noMatch);
          matchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          noMatchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          var joinedArr = matchingArr.concat(noMatchingArr);
          $scope.neighborhoods = joinedArr;
          if (!sort) {
            sort = "alphabetical";
          }
          if (sort === 'alphabetical') {
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'reverse') {
            matchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            noMatchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'Top 10') {
            $scope.quantity = 10;
          } else if (sort === 'Top 20') {
            $scope.quantity = 20;
          } else if (sort === 'Top 50') {
            $scope.quantity = 50;
          }
          noStateChange = true;
        });
      };
      //Code that runs if neighborhoods are populated and state was not changed..This is used for if the sort by is changed
      $scope.noChange = function (state, city, sort) {
        neighborhoodSrvc.getNeighborhoods(state).then(function (res) {
          var data = res.data;

          var checkMatch = function checkMatch(obj) {
            return obj.city.toUpperCase() === city.toUpperCase();
          };
          var noMatch = function noMatch(obj) {
            return obj.city.toUpperCase() !== city.toUpperCase();
          };
          var matchingArr = $scope.neighborhoods.filter(checkMatch);
          var noMatchingArr = $scope.neighborhoods.filter(noMatch);
          matchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          noMatchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          var joinedArr = matchingArr.concat(noMatchingArr);
          $scope.neighborhoods = joinedArr;
          if (!sort) {
            sort = "alphabetical";
          }
          if (sort === 'alphabetical') {
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'reverse') {
            matchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            noMatchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'Top 10') {
            $scope.quantity = 10;
          } else if (sort === 'Top 20') {
            $scope.quantity = 20;
          } else if (sort === 'Top 50') {
            $scope.quantity = 50;
          }
          $scope.applied = true;
        });
      };
      //Function that runs if neighborhoods haven't been populated
      //CALL BACK 3
      $scope.grabNeighborhood = function (state, city, sort) {
        $scope.applied = !$scope.applied;
        neighborhoodSrvc.getNeighborhoods(state).then(function (res) {
          var data = res.data;
          //Starts here --- sorts array of neighborhoods into alphabetical order by neighborhood name, prioritizing the city that was input
          var checkMatch = function checkMatch(obj) {
            return obj.city.toUpperCase() === city.toUpperCase();
          };
          var noMatch = function noMatch(obj) {
            return obj.city.toUpperCase() !== city.toUpperCase();
          };
          var matchingArr = data.filter(checkMatch);
          var noMatchingArr = data.filter(noMatch);
          matchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          noMatchingArr.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0; //default return value (no sorting)
          });
          var joinedArr = matchingArr.concat(noMatchingArr);
          $scope.neighborhoods = joinedArr;
          //ends here
          //Begins sort logic
          if (!sort) {
            sort = "alphabetical";
          }
          if (sort === 'alphabetical') {
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'reverse') {
            matchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            noMatchingArr.sort(function (a, b) {
              var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
              if (nameA > nameB) //sort string ascending
                return -1;
              if (nameA < nameB) return 1;
              return 0; //default return value (no sorting)
            });
            var joinedArr = matchingArr.concat(noMatchingArr);
            $scope.neighborhoods = joinedArr;
          } else if (sort === 'Top 10') {
            $scope.quantity = 10;
          } else if (sort === 'Top 20') {
            $scope.quantity = 20;
          } else if (sort === 'Top 50') {
            $scope.quantity = 50;
          }
        });
      };
      //Master function that handles all different search possibilities
      $scope.apply = function (state, city, sort, cb1, cb2, cb3) {
        if (!previousState) {
          previousState = state;
        } else if (previousState !== state) {
          cb1(state, city, sort);
        }
        if ($scope.neighborhoods && noStateChange) {
          cb2(state, city, sort);
        } else if (!$scope.neighborhoods) {
          cb3(state, city, sort);
        }
      };
      //Join Neighborhood function
      $scope.joinNeighborhood = function (neighborhood_id, user_id) {
        neighborhoodSrvc.joinNeighborhood(neighborhood_id, user_id).then(function (res) {
          userSrvc.getUser(user_id).then(function (res) {

            $scope.getSession();
            $scope.applied = !$scope.applied;
            $scope.city = '';
            $scope.state = '';
            $('#sortBy').text('Sort By');

            $scope.noNeighborhood = false;
          });
        });
      };
      //Setting button html of sort
      $scope.setSort = function (param) {
        $scope.sort = param;
        $('#sortBy').text(param);
      };
    }
  };
});

angular.module('nWatch').directive('nwGetMap', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/getMap.html',
    controller: function controller($scope, eventSrvc) {
      // var lat = parseFloat(eventSrvc.grabEvent[4].event_location_lat)
      // var long = parseFloat(eventSrvc.grabEvent[4].event_location_lon)
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

angular.module('nWatch').service('authSrvc', function ($http) {

  this.checkLoggedIn = function () {
    return $http({
      method: 'GET',
      url: '/api/auth/checklogin'
    });
  };
});

angular.module('nWatch').service('eventSrvc', function ($http) {
  this.getEvent = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id
    }).then(function (response) {
      return response.data;
    });
  };

  this.getEvents = function () {
    return $http({
      method: 'GET',
      url: 'api/events'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getFollowers = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id + '/followers'
    }).then(function (response) {
      return response.data;
    });
  };

  this.postFollowers = function (id, uId, att) {
    return $http({
      method: 'POST',
      url: 'api/events/' + id + '/following',
      data: {
        user_id: uId,
        attending: att
      }
    }).then(function (response) {
      response.data;
    });
  };

  this.updateFollowers = function (id, uId, att, folId) {
    console.log("this is service fol ", folId);
    console.log("this is service id ", id);
    return $http({
      method: 'PUT',
      url: 'api/events/' + id + '/following',
      data: {
        user_id: uId,
        attending: att,
        following_id: folId
      }
    });
  };

  this.getMyFollowedEvents = function (id) {
    return $http({
      method: "GET",
      url: 'api/imFollowing/' + id
    });
  };

  this.save = function (event) {
    if (!event.event_id) {
      return $http({
        method: 'POST',
        url: 'api/events',
        data: {
          event: event
        }
      }).then(function (response) {
        return response.data;
      });
    } else {
      console.log("there was an event", event);
      var id = event.event_id;
      return $http({
        method: 'PUT',
        url: 'api/events/' + id,
        data: {
          event: event
        }
      }).then(function (response) {
        return response.data;
      });
    }
  };

  this.delete = function (id) {
    return $http({
      method: 'DELETE',
      url: 'api/events/' + id
    }).then(function (response) {
      return response.data;
    });
  };
  this.deleteFol = function (id) {
    return $http({
      method: 'DELETE',
      url: 'api/eventsfol/' + id
    }).then(function (response) {
      return response.data;
    });
  };
  this.getMaps = function (address) {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    });
  };
  this.getAdd = function (latlng) {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    });
  };

  /*
  angular.module('nWatch').service('eventSrvc', function ($http) {
  
    this.editEvent = (eventObj) => {
      console.log("im in a service" , eventObj);
    }
  
    this.grabEvent = [
      {
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
    		"title": "orci. Ut sagittis lobortis",
    		"type_id": 7,
    		"created_by": 65,
    		"event_location_lat": "-15.83664",
    		"event_location_lon": "139.77701",
    		"name of location": "Daves house",
    		"event_date": "some date",
    		"event_time": "7:00 pm"
    	},
    	{
    		"lat": "32.72301",
    		"lon": "-137.35647",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
    		"title": "lorem ut",
    		"type_id": 5,
    		"created_by": 74,
    		"event_location_lat": "-58.94132",
    		"event_location_lon": "-162.60614",
    		"event_time": 5
    	},
    	{
    		"lat": "-63.30399",
    		"lon": "45.1698",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",
    		"title": "arcu. Nunc mauris. Morbi",
    		"type_id": 1,
    		"created_by": 88,
    		"event_location_lat": "-72.76823",
    		"event_location_lon": "120.08304",
    		"event_time": 3
    	},
    	{
    		"lat": "-3.52549",
    		"lon": "-141.7617",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",
    		"title": "et malesuada fames ac",
    		"type_id": 2,
    		"created_by": 67,
    		"event_location_lat": "-16.78785",
    		"event_location_lon": "-10.20352",
    		"event_time": 11
    	},
    	{
    		"lat": "69.05574",
    		"lon": "-85.5249",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",
    		"title": "rhoncus. Proin nisl sem, consequat",
    		"type_id": 2,
    		"created_by": 74,
    		"event_location_lat": "49.54182",
    		"event_location_lon": "59.362",
    		"event_time": 2
    	},
    	{
    		"lat": "7.35512",
    		"lon": "-59.0523",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet",
    		"title": "eu tellus. Phasellus elit pede,",
    		"type_id": 6,
    		"created_by": 55,
    		"event_location_lat": "1.06703",
    		"event_location_lon": "-131.4077",
    		"event_time": 12
    	},
    	{
    		"lat": "32.27714",
    		"lon": "11.33024",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",
    		"title": "arcu imperdiet ullamcorper. Duis",
    		"type_id": 1,
    		"created_by": 89,
    		"event_location_lat": "-63.52479",
    		"event_location_lon": "121.58237",
    		"event_time": 3
    	},
    	{
    		"lat": "62.21508",
    		"lon": "-9.83114",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida",
    		"title": "Nulla facilisis.",
    		"type_id": 6,
    		"created_by": 50,
    		"event_location_lat": "-27.67589",
    		"event_location_lon": "114.89798",
    		"event_time": 12
    	},
    	{
    		"lat": "-26.5582",
    		"lon": "-131.61448",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis",
    		"title": "iaculis odio. Nam interdum",
    		"type_id": 3,
    		"created_by": 75,
    		"event_location_lat": "-6.418",
    		"event_location_lon": "139.44585",
    		"event_time": 8
    	},
    	{
    		"lat": "-10.82466",
    		"lon": "82.16523",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",
    		"title": "Suspendisse non leo. Vivamus nibh",
    		"type_id": 4,
    		"created_by": 51,
    		"event_location_lat": "88.3255",
    		"event_location_lon": "14.63228",
    		"event_time": 1
    	},
    	{
    		"lat": "25.35664",
    		"lon": "26.60283",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,",
    		"title": "faucibus orci luctus",
    		"type_id": 5,
    		"created_by": 98,
    		"event_location_lat": "32.963",
    		"event_location_lon": "98.48688",
    		"event_time": 7
    	},
    	{
    		"lat": "26.90914",
    		"lon": "-58.19284",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    		"title": "arcu et",
    		"type_id": 3,
    		"created_by": 96,
    		"event_location_lat": "62.92709",
    		"event_location_lon": "8.22257",
    		"event_time": 4
    	},
    	{
    		"lat": "-1.89265",
    		"lon": "105.38326",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    		"title": "consequat auctor, nunc nulla",
    		"type_id": 7,
    		"created_by": 59,
    		"event_location_lat": "-31.06213",
    		"event_location_lon": "-69.15561",
    		"event_time": 3
    	},
    	{
    		"lat": "-8.42796",
    		"lon": "11.35168",
    		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
    		"title": "vitae dolor. Donec fringilla. Donec",
    		"type_id": 2,
    		"created_by": 67,
    		"event_location_lat": "-71.7451",
    		"event_location_lon": "-160.49455",
    		"event_time": 7
    	}
    ]
  */
});

angular.module('nWatch').service('loginSrvc', function ($http) {

  this.login = function (username, password) {
    return $http({
      method: 'GET',
      url: '/api/login/' + username + '/' + password
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    });
  };
});

angular.module('nWatch').service('neighborhoodSrvc', function ($http) {
  this.createNeighborhood = function (name, city, state) {
    return $http({
      method: 'POST',
      url: '/api/neighborhoods',
      data: {
        name: name,
        city: city,
        state: state
      }
    });
  };
  this.getNeighborhood = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id
    }).then(function (response) {
      return response.data;
    });
  };
  //Used to get neighborhoods based on state passed in
  this.getNeighborhoods = function (state) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods?state=' + state
    });
  };

  this.saveNeighborhood = function (neighborhood) {
    if (neighborhood.neighborhood_id) {
      return $http({
        method: 'POST',
        url: '/api/neighborhoods/' + neighborhood.neighborhood_id,
        body: neighborhood
      }).then(function (response) {
        return response.data;
      });
    } else {
      return $http({
        method: 'PUT',
        url: '/api/neighborhoods',
        body: neighborhood
      }).then(function (response) {
        return response.data;
      });
    }
  };

  this.deleteNeighborhood = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/neighborhoods/' + id
    }).then(function (response) {
      return response.data;
    });
  };

  this.getUsers = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id + "/users"
    }).then(function (response) {
      return response.data;
    });
  };

  this.getEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/neighborhoods/' + id + "/events"
    });
  };
  this.getSession = function () {
    return $http({
      method: 'GET',
      url: '/whoami'
    });
  };
  this.updateUserNeighborhood = function (id, neighborhood_id) {
    return $http({

      method: 'PUT',
      url: '/api/users/' + id + '/neighborhood',
      data: {
        neighborhood_id: neighborhood_id
      }
    });
  };
  this.getUserNeighborhood = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/neighborhood/' + id
    });
  };
  this.joinNeighborhood = function (neighborhood_id, user_id) {
    return $http({
      method: 'PUT',
      url: '/api/join/neighborhood',
      data: {
        neighborhood_id: neighborhood_id,
        user_id: user_id
      }
    });
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

angular.module('nWatch').service('sessionSrv', function ($http) {
  this.session = function () {
    return $http({
      method: "GET",
      url: "/whoami"
    }).then(function (res) {
      return res.data;
    });
  };
});

angular.module('nWatch').factory('adminAuth', function () {

  var obj = {};
  this.access = false;
  obj.getClientPermission = function () {
    this.access = true;
  };
  obj.logout = function () {
    this.access = false;
  };
  obj.checkClientPermission = function () {
    return this.access;
  };
  return obj;
});

angular.module('nWatch').service('signupSrvc', function ($http) {

  this.createUser = function (first_name, last_name, username, email, facebook_id, google_id, password, photo) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        facebook_id: facebook_id,
        google_id: google_id,
        password: password,
        photo: photo
      }
    });
  };
});

angular.module('nWatch').service('typeService', function ($http) {
  this.getTypes = function () {
    return $http({
      method: "GET",
      url: '/api/types'
    });
  };
});

angular.module('uploadFileService', []).service('uploadFile', function ($http) {
  this.upload = function (file) {
    var fd = new FormData();
    fd.append('myfile', file.upload);
    return $http.post('/upload/', fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });
  };
});

angular.module('nWatch').service('userSrvc', function ($http) {

  this.updateInfo = function (user_id, first_name, last_name, username, email, photo) {
    return $http({
      method: 'PUT',
      url: '/api/users/' + user_id,
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        photo: photo
      }
    });
  };

  this.getUsers = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    });
  };
  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/api/current'
    });
  };
  this.save = function (user) {
    if (user.user_id) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: user
      }).then(function (response) {
        return response.data;
      });
    } else {
      return $http({
        method: 'PUT',
        url: '/api/users/' + id,
        data: user
      }).then(function (response) {
        return response.data;
      });
    }
  };

  this.getEvents = function (id) {
    return $http({
      method: 'GET',
      url: 'api/users/' + id + '/events'
    }).then(function (response) {
      return response.data;
    });
  };

  this.authenticate = function () {
    return $http({
      method: 'GET',
      url: '/whoami'
    }).then(function (response) {
      return response.data;
    });
  };
  //Will grab all the info for the user
  this.getCreatedEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/created/' + id
    });
  };
  this.getFollowedEvents = function (id) {
    return $http({
      method: 'GET',
      url: '/api/followed/' + id
    });
  };
  this.getUserNeighborhood = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/neighborhood/' + id
    });
  };
  this.getSession = function () {
    return $http({
      method: 'GET',
      url: '/whoami'
    });
  };
});

angular.module('nWatch').controller('adminCtrl', function ($scope) {
  $scope.to = "argggghhhhh";
});

angular.module('nWatch').controller('createEventCtrl', function ($scope, eventSrvc, $log, sessionSrv, typeService, $timeout, uploadFile) {
  var session = function session() {
    sessionSrv.session().then(function (res) {
      if (res.isLoggedIn) {
        $scope.userId = res.user[0].user_id;
      }
      $scope.attending = res.followedEvents;
      if (res.isLoggedIn) {
        $scope.hood = res.neighborhood[0].neighborhood_id;
      }
    });
  };

  $scope.lists = [{
    name: 'Lost Pet',
    type_id: 1
  }, {
    name: 'Damage',
    type_id: 2
  }, {
    name: 'Neighborhood Watch',
    type_id: 4
  }, {
    name: 'Clean-up',
    type_id: 5
  }, {
    name: 'Missing Person',
    type_id: 6
  }, {
    name: 'Meet Up',
    type_id: 7
  }, {
    name: 'Entertainment',
    type_id: 8
  }, {
    name: 'Other',
    type_id: 3
  }];
  $scope.category = $scope.lists[0];
  $scope.eventImg = "yoyoyo";

  $scope.event = {};
  $scope.eventCreate = function (event) {
    event.type_id = $scope.category.type_id;
    event.event_location_lat = $scope.lat;
    event.event_location_lon = $scope.long;
    // we need to update the db for this time. maybe text?
    event.event_time = $scope.mytime;
    event.date = $scope.dt.toDateString();
    event.photo = $scope.event.photo;
    event.created_by = $scope.userId;
    if ($scope.userId) {
      event.neighborhood_id = $scope.hood;
    }
    eventSrvc.save(event);
  };

  //photo upload
  $scope.file = {};
  $scope.message = false;
  $scope.alert = '';
  $scope.defaultUrl = 'app/img/dandelion.jpg';

  $scope.Submit = function () {
    $scope.uploading = true;
    uploadFile.upload($scope.file).then(function (data) {
      if (data.data.success) {
        $scope.uploading = false;
        $scope.alert = 'alert alert-success';
        $scope.message = data.data.message;
        $scope.file = {};
      } else {
        $scope.uploading = false;
        $scope.alert = 'alert alert-danger';
        $scope.message = data.data.message;
        $scope.file = {};
      }
    });
  };

  $scope.photoChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
      $scope.uploading = true;
      var file = files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        $timeout(function () {
          $scope.thumbnail = {};
          $scope.thumbnail.dataUrl = e.target.result;
          $scope.event.photo = 'app/img/' + file.name || $scope.defaultUrl;
          $scope.uploading = false;
          $scope.message = false;
        });
      };
    } else {
      $scope.thumbnail = {};
      $scope.message = false;
    }
  };
  //end photo upload

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
  // time picker
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = true;
  $scope.toggleMode = function () {
    $scope.ismeridian = !$scope.ismeridian;
  };

  $scope.update = function () {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };
  session();
});

angular.module('nWatch').controller('editEventCtrl', function ($scope, eventSrvc, $log, sessionSrv, $stateParams, myEvent, $timeout, uploadFile) {
  var eventId = $stateParams.eventId;
  var session = function session() {
    sessionSrv.session().then(function (res) {

      if (res.isLoggedIn) {
        $scope.userId = res.user[0].user_id;
      }
      $scope.attending = res.followedEvents;
      if (res.isLoggedIn) {
        $scope.hood = res.neighborhood[0].neighborhood_id;
      }
    });
  };
  $scope.lists = [{
    name: 'Lost Pet',
    type_id: 1
  }, {
    name: 'Damage',
    type_id: 2
  }, {
    name: 'Neighborhood Watch',
    type_id: 4
  }, {
    name: 'Clean-up',
    type_id: 5
  }, {
    name: 'Missing Person',
    type_id: 6
  }, {
    name: 'Meet Up',
    type_id: 7
  }, {
    name: 'Entertainment',
    type_id: 8
  }, {
    name: 'Other',
    type_id: 3
  }];

  $scope.event = {};

  eventSrvc.getEvent(eventId).then(function (res) {
    if (res) {
      var lists = $scope.lists;
      var eventTypeId = res[0].type_id;
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].type_id == eventTypeId) {
          $scope.category = lists[i];
        }
      }
      $scope.event.photo = res[0].photo;
      $scope.event.title = res[0].title;
      $scope.dt = res[0].date;
      $scope.mytime = res[0].event_time;
      $scope.event.event_place = res[0].event_place;
      $scope.event.details = res[0].details;
      $scope.event.photo = res[0].photo;
      $scope.thumbnail = {};
      $scope.thumbnail.dataUrl = res[0].photo;
      $scope.lat = res[0].event_location_lat;
      $scope.long = res[0].event_location_lon;
    }
  });
  $scope.eventCreate = function (event) {
    event.event_place = $scope.event.event_place;
    event.type_id = $scope.category.type_id;
    event.event_location_lat = $scope.lat;
    event.event_location_lon = $scope.long;
    event.event_time = $scope.mytime;
    event.date = $scope.dt;
    event.photo = $scope.event.photo;
    event.created_by = $scope.userId;
    if ($scope.userId) {
      event.neighborhood_id = $scope.hood;
    };
    event.event_id = $stateParams.eventId;
    eventSrvc.save(event);
  };

  //photo upload
  $scope.file = {};
  $scope.message = false;
  $scope.alert = '';
  $scope.defaultUrl = 'app/img/dandelion.jpg';

  $scope.Submit = function () {
    $scope.uploading = true;
    uploadFile.upload($scope.file).then(function (data) {
      if (data.data.success) {
        $scope.uploading = false;
        $scope.alert = 'alert alert-success';
        $scope.message = data.data.message;
        $scope.file = {};
      } else {
        $scope.uploading = false;
        $scope.alert = 'alert alert-danger';
        $scope.message = data.data.message;
        $scope.file = {};
      }
    });
  };

  $scope.photoChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
      $scope.uploading = true;
      var file = files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        $timeout(function () {
          $scope.thumbnail = {};
          $scope.thumbnail.dataUrl = e.target.result;
          $scope.event.photo = 'app/img/' + file.name || $scope.defaultUrl;
          $scope.uploading = false;
          $scope.message = false;
        });
      };
    } else {
      $scope.thumbnail = {};
      $scope.message = false;
    }
  };
  //end photo upload

  //edit map section, just working on getting it working
  // will make it a directive soon
  var lat = Number(myEvent[0].event_location_lat);
  var long = Number(myEvent[0].event_location_lon);
  var latilongi = lat + ',' + long;
  $scope.map = {};

  var myLatLng = { lat: lat, lng: long };
  eventSrvc.getAdd(latilongi).then(function (res) {
    if (!res.data.results || res.data.results.length == 0) return;
    var corAdd = res.data.results[0].formatted_address;
    var addressArr = corAdd.split(',');
    $scope.map.address = addressArr[0];
    $scope.map.city = addressArr[1];
    var zipSt = addressArr[2].split(' ');
    $scope.map.state = zipSt[1];
    $scope.map.zip = zipSt[2];
  });

  //edit map section, just working on getting it working
  // will make it a directive soon
  var lat = Number(myEvent[0].event_location_lat);
  var long = Number(myEvent[0].event_location_lon);
  var myLatLng = { lat: lat, lng: long };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  $scope.changeMap = function (map) {
    if (map.address && map.city && map.state && map.zip) {
      var mapA = map.address;
      var mapC = map.city;
      var mapS = map.state;
      var mapZ = map.zip;
      var address = mapA + ' ' + mapC + ', ' + mapS + ' ' + mapZ;
      eventSrvc.getMaps(address).then(function (res) {
        var cordinates = res.data.results[0].geometry.location;
        var lati = cordinates.lat;
        var long = cordinates.lng;
        $scope.lat = cordinates.lat;
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
  // time picker
  $scope.mytime = new Date();
  $scope.hstep = 1;
  $scope.mstep = 15;
  $scope.ismeridian = true;
  $scope.toggleMode = function () {
    $scope.ismeridian = !$scope.ismeridian;
  };
  $scope.update = function () {
    var d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    $scope.mytime = d;
  };
  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };
  $scope.deleteEvent = function () {
    eventSrvc.deleteFol(eventId).then(function (res) {
      eventSrvc.delete(eventId);
    });
  };
  session();
});

angular.module('nWatch').controller('eventsCtrl', function ($scope, eventSrvc, event, $stateParams, sessionSrv) {
  var eventId = $stateParams.eventId;
  $scope.event = event[0];
  var lat = Number(event[0].event_location_lat);
  var long = Number(event[0].event_location_lon);
  var myLatLng = { lat: lat, lng: long };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
  function add(name, arr) {
    var id = arr.length + 1;
    var found = arr.some(function (el) {
      return el.user_id === name;
    });
    if (!found) {
      return true;
    } else if (found) {
      return false;
    }
  }

  var getFol = function getFol() {
    eventSrvc.getFollowers(eventId).then(function (res) {
      $scope.followers = res;
      $scope.attStatus = function (res) {
        if (res.attending === "yes") {
          return "alert-success";
        } else if (res.attending === "maybe") {
          return "alert-warning";
        } else if (res.attending === "no") {
          return "alert-danger";
        }
      };
    });
  };
  var session = function session() {
    sessionSrv.session().then(function (res) {
      $scope.buttons = res.isLoggedIn;
      if (res.isLoggedIn == true) {
        $scope.userId = res.user[0].user_id;
      }
      $scope.attending = res.followedEvents;
    });
  };
  $scope.yes = function () {
    var yes = {
      user_id: $scope.userId,
      attending: "yes"
    };
    var mFE = $scope.attending;
    var tEF = $scope.followers;
    if (tEF == undefined || tEF.length == 0 || add(yes.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then(function (res) {
        session();
        getFol();
      });
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = [];
      if (tEF[i].user_id == yes.user_id) {
        correctFol.push(tEF[i]);
        if (correctFol.attending !== "yes") {
          eventSrvc.updateFollowers(eventId, yes.user_id, yes.attending, correctFol[0].following_id).then(function (res) {
            session();
            getFol();
          });
        }
      }
    }
  };
  $scope.maybe = function () {
    var maybe = {
      user_id: $scope.userId,
      attending: "maybe"
    };
    var mFE = $scope.attending;
    var tEF = $scope.followers;
    if (tEF == undefined || tEF.length == 0 || add(maybe.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending).then(function (res) {
        session();
        getFol();
      });
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = [];
      if (tEF[i].user_id == maybe.user_id) {
        correctFol.push(tEF[i]);
        if (correctFol.attending !== "maybe") {
          eventSrvc.updateFollowers(eventId, maybe.user_id, maybe.attending, correctFol[0].following_id).then(function (res) {
            session();
            getFol();
          });
        }
      }
    }
  };
  $scope.no = function () {
    var no = {
      user_id: $scope.userId,
      attending: "no"
    };
    var mFE = $scope.attending;
    var tEF = $scope.followers;
    if (tEF == undefined || tEF.length == 0 || add(no.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, no.user_id, no.attending).then(function (res) {
        session();
        getFol();
      });
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = [];
      if (tEF[i].user_id == no.user_id) {
        correctFol.push(tEF[i]);
        if (correctFol.attending !== "no") {
          eventSrvc.updateFollowers(eventId, no.user_id, no.attending, correctFol[0].following_id).then(function (res) {
            session();
            getFol();
          });
        }
      }
    }
  };
  session();
  getFol();
});

angular.module('nWatch').controller('loginCtrl', function ($scope, one, loginSrvc, $state, $rootScope) {

  $scope.facebookLogin = function () {
    console.log('Login with Facebook');
  };
  $scope.googleLogin = function () {
    console.log('Login with Google');
  };
  //Callback function passed to login function that gets fired off if there was a problem with logging in...Will reset the form
  $scope.reset = function (form) {
    form.$setPristine();
    form.$setUntouched();
    var controlNames = Object.keys(form).filter(function (key) {
      return key.indexOf('$') !== 0;
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = controlNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;

        var control = form[name];
        control.$setViewValue(undefined);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    $scope.username = '';
    $scope.password = '';
  };
  //Master login form..takes in username and password, hits database checking if user exists. if there was no user it will fire off its callback function (reset)
  $scope.login = function (username, password, cb, form) {
    loginSrvc.login(username, password).then(function (res) {
      if (res.status === 200 && res.data !== 'User did not exist') {
        $rootScope.$broadcast('login');
        $state.go('user');
      } else if (res.data === 'User did not exist') {
        alert('Username and password did not match any records');
        cb(form);
        $scope.username = '';
        $scope.password = '';
      }
    }, function (err) {
      if (err) {
        alert('Username and password did not match any records');
        cb(form);
        $scope.username = '';
        $scope.password = '';
      }
    });
  };
});

angular.module('nWatch').controller('homeCtrl', function ($scope, eventSrvc, userSrvc) {
  eventSrvc.getEvents().then(function (res) {
    $scope.events = res;
  });

  $scope.isLoggedIn = false;
  //fires off on page load to determine whether user is logged in
  $scope.checkLogin = function () {
    userSrvc.getSession().then(function (resp) {
      if (resp.data.isLoggedIn) {
        $scope.isLoggedIn = resp.data.isLoggedIn;
      } else {
        $scope.isLoggedIn = false;
      }
    });
  };
  $scope.checkLogin();
  //Listens for the login function to fire off in loginCtrl and then fires of checklogin to set isLoggedIn to true
  $scope.$on('login', function (event, array) {
    $scope.checkLogin();
  });

  $scope.lists = [{
    name: 'Lost Pet',
    type_id: 1
  }, {
    name: 'Damage',
    type_id: 2
  }, {
    name: 'Neighborhood Watch',
    type_id: 4
  }, {
    name: 'Clean-up',
    type_id: 5
  }, {
    name: 'Missing Person',
    type_id: 6
  }, {
    name: 'Meet Up',
    type_id: 7
  }, {
    name: 'Entertainment',
    type_id: 8
  }, {
    name: 'Other',
    type_id: 3
  }];
  $scope.category = $scope.lists[0];
});

angular.module('nWatch').controller('newNeighborhoodCtrl', function ($scope, neighborhoodSrvc, $state, userSrvc) {
  //callback function invoked by saveNeighborhood that gets invoked if neighborhood creation was successful that updates users neighborhood and updates session then routes to user view
  $scope.updateUsersNeighborhood = function (neighborhood_id) {
    neighborhoodSrvc.getSession().then(function (resp) {
      var session = resp.data;
      var user_id = session.user[0].user_id;
      neighborhoodSrvc.joinNeighborhood(neighborhood_id, user_id).then(function (resp) {
        userSrvc.getUser(user_id).then(function (resp) {
          $state.go('user');
        });
      });
    });
  };
  //This is a callback function passed to saveNeighborhood on save neighborhood button submit that is used to reset the form if there was an error creating the neighborhood
  $scope.reset = function (form) {
    form.$setPristine();
    form.$setUntouched();
    var controlNames = Object.keys(form).filter(function (key) {
      return key.indexOf('$') !== 0;
    });
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = controlNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var name = _step2.value;

        var control = form[name];
        control.$setViewValue(undefined);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    $scope.neighborhoodName = '';
    $scope.city = '';
    $scope.state = '';
  };
  //Function that is invoked when save neighborhood is clicked..If neighborhood was created it invokes updateUsersNeighborhood which updates the users neighborhood to newly created neighborhood and then routes back to user view
  $scope.saveNeighborhood = function (name, city, state, cb, cb2, form) {
    neighborhoodSrvc.createNeighborhood(name, city, state).then(function (res) {
      var data = res.data[0];
      var neighborhood_id = data.neighborhood_id;
      if (res.status === 200 && res.data !== "Could not create neighborhood") {

        cb2(neighborhood_id);
      } else if (res.data === "Could not create neighborhood") {
        alert('Failed to create neighborhood. Neighborhood name must be unique');
        cb(form);
      }
    }, function (err) {
      if (err.status === 420) {
        alert('Failed to create neighborhood. Neighborhood name must be unique');
        cb(form);
      }
    });
  };
});

angular.module('nWatch').controller('hoodCtrl', function ($scope, neighborhoodSrvc, authSrvc) {

  $scope.leaveNeighborhood = function (id) {
    var neighborhood_id = null;
    neighborhoodSrvc.updateUserNeighborhood(id, neighborhood_id).then(function (res) {
      $scope.noNeighborhood = true;
    });
  };
  // Will delete these two calls once I can actually grab data from the database
  //Sets whether or not user is logged in and whether or not user has neighborhood
  $scope.getSession = function () {
    neighborhoodSrvc.getSession().then(function (res) {
      var data = res.data;
      $scope.neighborhood = data.neighborhood[0];
      $scope.user = data.user[0];
      if (data.neighborhood.length === 0) {
        $scope.noNeighborhood = true;
      } else if (data.neighborhood.length > 0) {
        $scope.noNeighborhood = false;
      }
      if ($scope.user.neighborhood_id) {
        var _id = $scope.user.neighborhood_id;
        var getNeighborhoodEvents = function getNeighborhoodEvents(id) {
          neighborhoodSrvc.getEvents(id).then(function (res) {
            var data = res.data;
            if (data.length === 0) {
              $scope.hasNeighborhoodEvents = false;
            } else {
              $scope.hasNeighborhoodEvents = true;
              $scope.neighborhoodEvents = data;
            }
          });
        };
        getNeighborhoodEvents(_id);
      }
      ////map addition
      var neighId = $scope.user.neighborhood_id;
      //getting the neighbothoods city and state
      var neighCity = $scope.neighborhood.city;
      var neighState = $scope.neighborhood.state;
      var neighAdd = neighCity + ', ' + neighState;
      //sending city/state to service to gen long late
      neighborhoodSrvc.getEvents(neighId).then(function (res) {
        var data = res.data;
        var locations = data.map(function (obj) {
          return [obj.title, Number(obj.event_location_lat), Number(obj.event_location_lon)];
        });
        neighborhoodSrvc.getMaps(neighAdd).then(function (res) {
          //grabbing long lat from googe assigning them to lat lng vars
          var lata = res.data.results[0].geometry.location.lat;
          var lnga = res.data.results[0].geometry.location.lng;
          var myLatLng = { lat: lata, lng: lnga };
          //generateing map bassed off long lat from google
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: myLatLng
          });
          var infowindow = new google.maps.InfoWindow({});

          var marker, i;

          for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map
            });

            google.maps.event.addListener(marker, 'click', function (marker, i) {
              return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              };
            }(marker, i));
          }
        });
      });
      // mapp addition
    });
  };
  $scope.getSession();
});

angular.module('nWatch').controller('signupCtrl', function ($scope, signupSrvc, $state, loginSrvc, $rootScope) {
  $scope.uploadme = {};
  $scope.uploadme.src = "app/img/profilepicture/default_picture.jpg";
  $scope.face = null;
  $scope.google = null;
  //callback function that resets signup form. Gets fired off if there was an issue signing someone up
  $scope.reset = function (form) {
    form.$setPristine();
    form.$setUntouched();
    var controlNames = Object.keys(form).filter(function (key) {
      return key.indexOf('$') !== 0;
    });
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = controlNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var name = _step3.value;

        var control = form[name];
        control.$setViewValue(undefined);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.uploadme.src = '';
    $scope.confirm = '';
  };
  //master function that handles signing up a user. takes in callback (reset) that will be fired off if there is an issue signing up the user.
  $scope.createUser = function (first_name, last_name, username, email, facebook_id, google_id, password, photo, cb, form) {
    signupSrvc.createUser(first_name, last_name, username, email, facebook_id, google_id, password, photo).then(function (res) {
      if (res.status === 200) {
        loginSrvc.login(username, password).then(function (res) {
          $rootScope.$broadcast('createUser');
          $state.go('user');
        });
      }
    }, function (err) {
      if (err) {
        alert('There was a problem signing you up. Usernames must be unique. Please try again.');
        cb(form);
      }
    });
  };
});

angular.module('nWatch').controller('userCtrl', function ($scope, userSrvc, $timeout, uploadFile) {
  $scope.hasInfo = true;
  //invokes on page load to grab the req.session.user, also passed to updateInfo
  $scope.compileUserInfo = function (id, cb) {
    userSrvc.getCreatedEvents(id).then(function (res) {
      userSrvc.getFollowedEvents(id).then(function (res) {
        userSrvc.getUserNeighborhood(id).then(function (res) {
          cb();
        });
      });
    });
  };
  //Grabs the session object
  $scope.getSession = function () {
    userSrvc.getSession().then(function (res) {
      var data = res.data;
      $scope.user = data.user[0];
      $scope.usernameNoUpdate = $scope.user.username;
      $scope.neighborhood = data.neighborhood[0];
      $scope.followedEvents = data.followedEvents;
      $scope.createdEvents = data.createdEvents;
      if ($scope.createdEvents.length === 0) {
        $scope.hasCreated = false;
      } else if ($scope.createdEvents.length > 0) {
        $scope.hasCreated = true;
      }
      if ($scope.followedEvents.length === 0) {
        $scope.isFollowing = false;
      } else if ($scope.followedEvents.length > 0) {
        $scope.isFollowing = true;
      }
    });
  };
  //Gets user that just logged in, then invokes compileUserInfo passing the user id that was just grabbed and passes the second callback which is grab session
  $scope.getUser = function (cb1, cb2) {
    userSrvc.getCurrentUser().then(function (res) {
      var data = res.data.user[0];
      var user_id = data.user_id;
      $scope.thumbnail = {};
      $scope.thumbnail.dataUrl = data.photo;
      cb1(user_id, cb2);
    });
  };
  $scope.getUser($scope.compileUserInfo, $scope.getSession);

  //This function fires when update my info gets clicked and shows the update html
  $scope.update = function () {
    $scope.hasInfo = !$scope.hasInfo;
  };
  //When user clicks save profile, it updates their info in the database, then reruns all the functions that are loaded on page initialization to reset the session and grab it and reload the page
  $scope.updateInfo = function (user_id, first_name, last_name, username, email, photo, cb) {
    userSrvc.updateInfo(user_id, first_name, last_name, username, email, photo).then(function (res) {
      $scope.hasInfo = !$scope.hasInfo;
      cb($scope.compileUserInfo, $scope.getSession);
    }, function (err) {
      if (err.data.code === '23505') {
        alert('Unable to update info. Username matched a previous record. Please pick a different username.');
        $scope.user.username = $scope.usernameNoUpdate;
      } else {
        alert('Something went wrong on update. Please try again.');
      }
    });
  };

  $scope.cancelChanges = function () {
    $scope.hasInfo = !$scope.hasInfo;
  };

  //File upload functions
  $scope.file = {};
  $scope.message = false;
  $scope.alert = '';
  $scope.defaultUrl = 'app/img/profilepicture/default_picture.jpg';
  $scope.defaultEventUrl = 'app/img/dandelion.jpg';

  $scope.Submit = function () {
    $scope.uploading = true;
    uploadFile.upload($scope.file).then(function (data) {
      if (data.data.success) {
        $scope.uploading = false;
        $scope.alert = 'alert alert-success';
        $scope.message = data.data.message;
        $scope.file = {};
      } else {
        $scope.uploading = false;
        $scope.alert = 'alert alert-danger';
        $scope.message = data.data.message;
        $scope.file = {};
      }
    });
  };

  $scope.photoChanged = function (files) {
    if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
      $scope.uploading = true;
      var file = files[0];
      var fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        $timeout(function () {
          $scope.thumbnail = {};
          $scope.thumbnail.dataUrl = e.target.result;
          $scope.user.photo = 'app/img/' + file.name || $scope.defaultUrl;
          $scope.uploading = false;
          $scope.message = false;
        });
      };
    } else {
      $scope.thumbnail = {};
      $scope.message = false;
    }
  };
});