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
  }).state('user', {
    url: '/user',
    templateUrl: './app/views/user/user.html',
    controller: 'userCtrl'
  }).state('newNeighborhood', {
    url: '/newneighborhood',
    templateUrl: './app/views/newNeighborhood/newNeighborhood.html',
    controller: 'newNeighborhoodCtrl'
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

angular.module('nWatch').service('one', function () {
  this.words = function () {
    return "wow this is in a service";
  };
});

angular.module('nWatch').controller('homeCtrl', function ($scope, one) {
  $scope.arr = one.words();
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
});

angular.module('nWatch').controller('newNeighborhoodCtrl', function ($scope, one) {});

angular.module('nWatch').controller('userCtrl', function ($scope) {

  $scope.hasInfo = true;
  $scope.updateInfo = function () {
    $scope.hasInfo = !$scope.hasInfo;
  };
});