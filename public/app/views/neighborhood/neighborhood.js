angular.module('nWatch').controller('hoodCtrl', function($scope, neighborhoodSrvc, authSrvc) {


  $scope.leaveNeighborhood = function(id) {
    var neighborhood_id = null
    neighborhoodSrvc.updateUserNeighborhood(id, neighborhood_id).then(function(res) {
      $scope.noNeighborhood = true
    })
  }
  // Will delete these two calls once I can actually grab data from the database
  //Sets whether or not user is logged in and whether or not user has neighborhood
  $scope.getSession = () => {
    neighborhoodSrvc.getSession().then(function(res) {
      let data = res.data
      $scope.neighborhood = data.neighborhood[0]
      $scope.user = data.user[0]
      if(data.neighborhood.length === 0) {
        $scope.noNeighborhood = true
      } else if(data.neighborhood.length > 0) {
        $scope.noNeighborhood = false
      }
      if($scope.user.neighborhood_id) {

        let id = $scope.user.neighborhood_id
        var getNeighborhoodEvents = (id) => {
          neighborhoodSrvc.getEvents(id).then(function(res) {
            let data = res.data
            if(data.length === 0) {
              $scope.hasNeighborhoodEvents = false
            } else {
              $scope.hasNeighborhoodEvents = true

              $scope.neighborhoodEvents = data
            }
          })
        }
        getNeighborhoodEvents(id)
      }
    })
  }
  $scope.getSession()


})
