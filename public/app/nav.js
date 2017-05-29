angular.module('nWatch').controller('navCtrl',function($scope, $location, $stateParams){
  // console.log('this is location', $location.path())
  // console.log('this is', $stateParams.id);
  // $scope.personsId = $stateParams.id
  // console.log($scope.personsId);

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
