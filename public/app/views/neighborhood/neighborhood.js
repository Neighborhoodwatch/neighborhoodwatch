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
      ////map addition
      const neighId = $scope.user.neighborhood_id
      console.log('this is the array of event data ', $scope.data);
      //getting the neighbothoods city and state
      var neighCity = $scope.neighborhood.city;
      var neighState = $scope.neighborhood.state
      var neighAdd = `${neighCity}, ${neighState}`
      //sending city/state to service to gen long late
      neighborhoodSrvc.getMaps(neighAdd).then((res) => {
        //grabbing long lat from googe assigning them to lat lng vars
        var lata = res.data.results[0].geometry.location.lat
        var lnga = res.data.results[0].geometry.location.lng
        var myLatLng = {lat: lata, lng: lnga};
        //generateing map bassed off long lat from google
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: myLatLng
        });
      })
      // mapp addition
    })
  }
  $scope.getSession()


})
