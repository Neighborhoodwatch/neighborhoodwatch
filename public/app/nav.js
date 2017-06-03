angular.module('nWatch').controller('navCtrl',function($scope, $location, $stateParams, userSrvc, loginSrvc, $state, $rootScope, adminAuth){
  //This sets navbar to logged out initially until check login fires and determines whether user is logged in
  $scope.isLoggedIn = false
  //fires off on page load to determine whether user is logged in
    $scope.checkLogin = () => {
      userSrvc.getSession().then(function(resp) {
        if(resp.data.isLoggedIn) {

          $scope.isLoggedIn = resp.data.isLoggedIn
        } else {
          $scope.isLoggedIn = false
        }
      })
    }
    $scope.checkLogin()
    //Listens for the login function to fire off in loginCtrl and then fires of checklogin to set isLoggedIn to true
    $scope.$on('login', function(event, array) {
      $scope.checkLogin()
    })
    //fires off when logout button is clicked and resets adminAuth.access to false so resolve on login view can see user is not logged in, then gets session and resets $scope.isLoggedIn to false
    $scope.$on('logout', function(event, array) {
      adminAuth.logout()
      userSrvc.getSession().then(function(resp) {
        if(resp.data.isLoggedIn) {

          $scope.isLoggedIn = resp.data.isLoggedIn
        } else {
          $scope.isLoggedIn = false
        }
        $state.go('login')
      })
    })


  $scope.isActive = function(viewLocation) {
    return viewLocation == $location.path();

  };

  $scope.classActive = function( viewLocation ) {
    // console.log(viewLocation);
    if( $scope.isActive(viewLocation) ) {
      // return 'events-nav-color';
      return 'active';
    }
    else {
      // return false;
      return '';
    }
  }
  //fires off when logout is clicked, destroys the session then does the rest of the logout function
  $scope.logout = () => {
    loginSrvc.logout().then(function(res) {
      $rootScope.$broadcast('logout')
    })
  }
});
