angular.module('nWatch').controller('eventsCtrl', ($scope, eventSrvc, event, $stateParams, sessionSrv) => {
  const eventId = $stateParams.eventId
  $scope.event = event[0]
  var lat = Number(event[0].event_location_lat)
  var long = Number(event[0].event_location_lon)
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
  function add(name, arr) {
    var id = arr.length + 1;
    var found = arr.some(function (el) {
      return el.user_id === name;
    });
    if (!found) {
      return true;
    }
    else if(found) {
    return false;
    }
  }

  var getFol = () => {
    eventSrvc.getFollowers(eventId).then((res) => {
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
      $scope.buttons = res.isLoggedIn
      if (res.isLoggedIn == true) {
        $scope.userId = res.user[0].user_id
      }
      $scope.attending = res.followedEvents
    })
  }
  $scope.yes = () => {
    const yes = {
      user_id: $scope.userId,
      attending: "yes"
    }
    var mFE = $scope.attending
    var tEF = $scope.followers
    if (tEF == undefined || tEF.length == 0 || add(yes.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then((res) => {
        session()
        getFol()
      })
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = []
      if (tEF[i].user_id == yes.user_id){
        correctFol.push(tEF[i])
        if (correctFol.attending !== "yes") {
          eventSrvc.updateFollowers(eventId, yes.user_id, yes.attending, correctFol[0].following_id).then((res) => {
            session()
            getFol()
          })
        }
      }
    }
  }
  $scope.maybe = () => {
    const maybe = {
      user_id: $scope.userId,
      attending: "maybe"
    }
    var mFE = $scope.attending
    var tEF = $scope.followers
    if (tEF == undefined || tEF.length == 0 || add(maybe.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending).then((res) => {
        session()
        getFol()
      })
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = []
      if (tEF[i].user_id == maybe.user_id){
        correctFol.push(tEF[i])
        if (correctFol.attending !== "maybe") {
          eventSrvc.updateFollowers(eventId, maybe.user_id, maybe.attending, correctFol[0].following_id).then((res) => {
            session()
            getFol()
          })
        }
      }
    }
  }
  $scope.no = () => {
    const no = {
      user_id: $scope.userId,
      attending: "no"
    }
    var mFE = $scope.attending
    var tEF = $scope.followers
    if (tEF == undefined || tEF.length == 0 || add(no.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, no.user_id, no.attending).then((res) => {
        session()
        getFol()
      })
    }
    for (var i = 0; i < tEF.length; i++) {
      var correctFol = []
      if (tEF[i].user_id == no.user_id){
        correctFol.push(tEF[i])
        if (correctFol.attending !== "no") {
          eventSrvc.updateFollowers(eventId, no.user_id, no.attending, correctFol[0].following_id).then((res) => {
            session()
            getFol()
          })
        }
      }
    }
  }
  session();
  getFol();
})
