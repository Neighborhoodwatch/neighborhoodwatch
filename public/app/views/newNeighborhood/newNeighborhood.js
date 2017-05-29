angular.module('nWatch').controller('newNeighborhoodCtrl', function($scope, neighborhoodSrvc, $state) {


  $scope.saveNeighborhood = (name, city, state) => {
    $state.go('hood')
    neighborhoodSrvc.createNeighborhood(name, city, state).then(function(res) {
      //if response is 200, will navigate to my neighborhood and show new neighborhood view
    })
  }


})
