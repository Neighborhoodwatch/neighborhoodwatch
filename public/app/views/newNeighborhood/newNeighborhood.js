angular.module('nWatch').controller('newNeighborhoodCtrl', function($scope, neighborhoodSrvc, $state, userSrvc) {
  //callback function invoked by saveNeighborhood that gets invoked if neighborhood creation was successful that updates users neighborhood and updates session then routes to user view
  $scope.updateUsersNeighborhood = (neighborhood_id) => {
    neighborhoodSrvc.getSession().then(function(resp) {
      var session = resp.data
      var user_id = session.user[0].user_id
      neighborhoodSrvc.joinNeighborhood(neighborhood_id, user_id).then(function(resp) {
        userSrvc.getUser(user_id).then(function(resp) {
          $state.go('user')
        })
      })
    })
  }
  //This is a callback function passed to saveNeighborhood on save neighborhood button submit that is used to reset the form if there was an error creating the neighborhood
  $scope.reset = function(form) {
    form.$setPristine();
    form.$setUntouched();
    let controlNames = Object.keys(form).filter(key => key.indexOf('$') !== 0);
    for (let name of controlNames) {
        let control = form[name];
        control.$setViewValue(undefined);
    }

    $scope.neighborhoodName = ''
    $scope.city = ''
    $scope.state = ''
};
//Function that is invoked when save neighborhood is clicked..If neighborhood was created it invokes updateUsersNeighborhood which updates the users neighborhood to newly created neighborhood and then routes back to user view
  $scope.saveNeighborhood = (name, city, state, cb, cb2, form) => {
    neighborhoodSrvc.createNeighborhood(name, city, state).then(function(res) {
      let data = res.data[0]
      let neighborhood_id = data.neighborhood_id
      if(res.status === 200 && res.data !== "Could not create neighborhood") {

        cb2(neighborhood_id)
      } else if (res.data === "Could not create neighborhood") {
        alert('Failed to create neighborhood. Neighborhood name must be unique')
        cb(form)
      }
    }, function(err) {
      if(err.status === 420) {
        alert('Failed to create neighborhood. Neighborhood name must be unique')
        cb(form)
      }
    })
  }


})
