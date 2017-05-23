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
		});
});

angular.module('nWatch').service('one', function () {
		this.words = function () {
				return "wow this is in a service";
		};
});

angular.module('nWatch').controller('loginCtrl', function ($scope, one) {
		$scope.arr = one.words();
});

angular.module('nWatch').controller('homeCtrl', function ($scope, one) {
		$scope.arr = one.words();
});

angular.module('nWatch').controller('hoodCtrl', function ($scope, one) {
		$scope.arr = one.words();
});