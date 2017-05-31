angular.module('nWatch').controller('eventsCtrl', ($scope, eventSrvc, event, $stateParams, sessionSrv) => {
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

  var getFol = () => {
    eventSrvc.getFollowers(eventId).then((res) => {

      console.log("rhis is getfollowers res", res);
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
  }
  var session = () => {
    sessionSrv.session().then((res) => {
      console.log("this is session", res);

      console.log("this is user session", res.user[0].user_id)
      $scope.userId = res.user[0].user_id
      console.log(res.followedEvents);
      $scope.attending = res.followedEvents
      console.log("this is attending", $scope.attending);
    })
  }

  $scope.yes = () => {
    const yes = {
      user_id: $scope.userId,
      attending: "yes"
    }
    eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then((res) => {
      session()
      getFol()
    })
  }
  $scope.maybe = () => {
    const maybe = {
      user_id: $scope.userId,
      attending: "maybe"
    }
    eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending).then((res) => {
      session()
      getFol()
    })
  }
  $scope.no = () => {
    const no = {
      user_id: $scope.userId,
      attending: "no"
    }
    eventSrvc.postFollowers(eventId, no.user_id, no.attending).then((res) => {
      session()
      getFol()
    })
  }
  session()
  getFol()

})
