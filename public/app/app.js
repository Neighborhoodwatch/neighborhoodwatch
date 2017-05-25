angular.module('nWatch', ['ui.router', 'ngMessages'])
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

		.state('user', {
			url: '/user',
			templateUrl: './app/views/user/user.html',
			controller: 'userCtrl'
		})
		.state('newNeighborhood', {
			url: '/newneighborhood',
			templateUrl: './app/views/newNeighborhood/newNeighborhood.html',
			controller: 'newNeighborhoodCtrl'
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
		.state('signup', {
			url: '/signup',
			templateUrl: './app/views/signup/signup.html',
			controller: 'signupCtrl'
		})
		.state('admin', {
			url: '/admin',
			templateUrl: './app/views/admin/admin.html',
			controller: 'adminCtrl'
		})
		.state('createEvent', {
			url: '/event/create',
			templateUrl: './app/views/createEvent/createEvent.html',
			controller: 'createEventCtrl'
		})
});
