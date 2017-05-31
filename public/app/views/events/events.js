angular.module('nWatch').controller('eventsCtrl', ($scope, eventSrvc, event, $stateParams) => {
  const eventId = $stateParams.eventId
  $scope.event = event[0]
  // console.log($scope.event);
  var lat = Number(event[0].event_location_lat)
  var long = Number(event[0].event_location_lon)
  console.log(lat, long);
  var myLatLng = {lat: lat, lng: long};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  eventSrvc.getFollowers(eventId).then((res) => {
    console.log(res);
    $scope.followers = res
    $scope.attStatus = (res) => {
        if (res.attending === "yes") {
          return "alert-success"
        }
        else if (res.attending === "maybe") {
          return "alert-warning"
        }
        else if (res.attending === "no") {
          return "alert-danger"
        }
    }
  })

  $scope.yes = () => {
    const yes = {
      user_id: 1,
      attending: "yes"
    }
    eventSrvc.postFollowers(eventId, yes.user_id, yes.attending)
  }
  $scope.maybe = () => {
    const maybe = {
      user_id: 1,
      attending: "maybe"
    }
    eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending)
  }
  $scope.no = () => {
    const no = {
      user_id: 1,
      attending: "no"
    }
    eventSrvc.postFollowers(eventId, no.user_id, no.attending)
  }


})
