angular.module('nWatch').controller('newNeighborhoodCtrl', function($scope, neighborhoodSrvc, $state) {


  $scope.saveNeighborhood = (name, city, state) => {
    neighborhoodSrvc.createNeighborhood(name, city, state).then(function(res) {
      if(res.status === 200) {
        $state.go('user')
      } else {
        alert('Failed to create neighborhood')
      }
    })
  }


})
