angular.module('nWatch', ['ui.router', 'ngAnimate', 'ngMessages', 'ui.bootstrap', 'ngTouch', 'uploadFileService', 'fileModelDirective'])
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
			controller: 'hoodCtrl',
			resolve: {
				checkLogin: function(authSrvc, $q, adminAuth, $state) {
					var deferred = $q.defer()
					if(adminAuth.checkClientPermission()) {
						deferred.resolve()
					}
					authSrvc.checkLoggedIn().then(function(res) {
						let data = res.data
						if(data === false) {
							deferred.reject()
							console.log("3rd running")

							$state.go('login')
							alert('Please login')
						} else {
							deferred.resolve()
						}
					})
					return deferred.promise
				}
			}
		})
    .state('login', {
			url: '/login',
			templateUrl: './app/views/login/login.html',
			controller: 'loginCtrl',
			resolve: {
				checkLogin: function(authSrvc, $q, adminAuth, $state) {
					var deferred = $q.defer()
					if(adminAuth.checkClientPermission()) {
						$state.go('user')
					}
					authSrvc.checkLoggedIn().then(function(res) {
						let data = res.data
						if(data === false) {
							deferred.resolve()
						} else {
							adminAuth.getClientPermission()
							deferred.resolve()

							$state.go('user')
						}
						})
					return deferred.promise
				}
			}
		})

		.state('user', {
			url: '/user',
			templateUrl: './app/views/user/user.html',
			controller: 'userCtrl',
			resolve: {
				checkLogin: function(authSrvc, $q, adminAuth, $state) {
					var deferred = $q.defer()
					if(adminAuth.checkClientPermission()) {
						deferred.resolve()
					} else {
						authSrvc.checkLoggedIn().then(function(res) {
							let data = res.data
							if(data === true) {
								adminAuth.getClientPermission()
								deferred.resolve()
							} else {
								deferred.reject()
								$state.go('login')
								alert('Please login')
							}
						})
					}
					return deferred.promise
				}
			}
		})
		.state('newNeighborhood', {
			url: '/newneighborhood',
			templateUrl: './app/views/newNeighborhood/newNeighborhood.html',
			controller: 'newNeighborhoodCtrl',
			resolve: {
				checkLogin: function(authSrvc, $q, adminAuth, $state) {
					var deferred = $q.defer()
					if(adminAuth.checkClientPermission()) {
						deferred.resolve()
					} else {
						authSrvc.checkLoggedIn().then(function(res) {
							let data = res.data
							if(data === true) {
								adminAuth.getClientPermission()
								deferred.resolve()
							} else {
								deferred.reject()
								$state.go('login')
								alert('Please login')
							}
						})
					}
					return deferred.promise
				}
			}
		})
    .state('events', {
			url: '/events/:eventId',
			templateUrl: './app/views/events/events.html',
			controller: 'eventsCtrl',
			resolve: {
					event: function(eventSrvc, $stateParams){
						const eventId = $stateParams.eventId
						console.log(eventId);
					return eventSrvc.getEvent(eventId).then(function(response){
						return response
					})
				}
			}
		})
    .state('editEvents', {
			url: '/event/edit/:eventId',
			templateUrl: './app/views/editEvent/editEvent.html',
			controller: 'editEventCtrl',
			resolve: {
				checkLogin: function(sessionSrv, $q, $stateParams, $state, eventSrvc) {
					let eventId = $stateParams.eventId
					var defer = $q.defer();
					sessionSrv.session(eventId).then(function(res){
						console.log(res);
						if (res.isLoggedIn !== true) {
							defer.reject();
						}else {
							const user = res.user[0].user_id;
							eventSrvc.getEvent(eventId).then((response) => {
								const eventCreator = response[0].created_by;
								if (eventCreator == user) {
									defer.resolve();
								}else {
									defer.reject();
									$state.go('home')
									alert("Sorry, you did not create this event")
								}
							})

						}
					})
					return defer.promise;
				},
				myEvent: function(eventSrvc, $stateParams){
					const eventId = $stateParams.eventId
					console.log(eventId);
					return eventSrvc.getEvent(eventId).then(function(response){
						return response
					})
				}
			}
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
			controller: 'createEventCtrl',
			resolve: {
				checkNeigborhood: function(sessionSrv, $q, $stateParams, $state) {
					let eventId = $stateParams.eventId
					var defer = $q.defer();
					sessionSrv.session().then((res) => {
						let hood = res.neighborhood
						console.log(res.neighborhood);
						if (hood == undefined || hood.length == 0) {
							defer.reject()
							$state.go('newNeighborhood')
							alert("Sorry, you need to join/create a neighborhood before you can create an event.")
						}else {
							defer.resolve()
						}
					})

					return defer.promise;
				}
			}
		})
});
