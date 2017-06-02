angular.module('nWatch').controller('navCtrl',function($scope, $location, $stateParams, userSrvc, $transitions){
  $scope.checkLogin = () => {
    userSrvc.getSession().then(function(resp) {
      console.log(resp)
    })
  }
  $scope.checkLogin()
  // console.log($transitions)
  $scope.isActive = function(viewLocation) {
    return viewLocation == $location.path();
  
  };

  $scope.classActive = function( viewLocation ) {
    // console.log(viewLocation);
    if( $scope.isActive(viewLocation) ) {
      return 'events-nav-color';
    }
    else {
      return false;
    }
  }
});
