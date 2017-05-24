angular.module('nWatch', ['ui.router'])
	.config(function( $stateProvider, $urlRouterProvider ) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './app/views/home/home.html',
			controller: 'homeCtrl'
		})
    .state('hood', {
			url: '/hood',
			templateUrl: './app/views/neighborhood/neighborhood.html',
			controller: 'hoodCtrl'
		})
    .state('login', {
			url: '/login',
			templateUrl: './app/views/login/login.html',
			controller: 'loginCtrl'
		})
    .state('events', {
			url: '/events',
			templateUrl: './app/views/events/events.html',
			controller: 'eventsCtrl'
		})
    .state('editEvents', {
			url: '/events/edit',
			templateUrl: './app/views/editEvent/editEvent.html',
			controller: 'editEventCtrl'
		})
});
