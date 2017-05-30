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
    console.log('this is response', res);
    $scope.followers = res
  })

})
