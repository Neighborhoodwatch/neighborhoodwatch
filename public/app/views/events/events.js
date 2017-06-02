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

  // var myEvents = () => {
  //   console.log("this is inside myevents id", $scope.userId);
  //   eventSrvc.getMyFollowedEvents($scope.userId).then((res) => {
  //     console.log("this si my events followed", res);
  //   })
  // }

  $scope.yes = () => {
    const yes = {
      user_id: $scope.userId,
      attending: "yes"
    }
    var mFE = $scope.attending
    var tEF = $scope.followers
    console.log('this is tEF ', tEF);
    if (tEF == undefined || tEF.length == 0 || add(yes.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then((res) => {
        session()
        getFol()
      })
    }
      // for (var i = 0; i < tEF.length; i++) {
      //   if(atten[i].event_id == eventId) {
      //     if (atten.attending !== "yes") {
      //       console.log(atten[i].following_id);
      //       eventSrvc.updateFollowers(eventId, yes.user_id, yes.attending, atten[i].following_id).then((res) => {
      //         session()
      //         getFol()
      //       })
      //     }
      //   }
      // }
  }
  $scope.maybe = () => {
    const maybe = {
      user_id: $scope.userId,
      attending: "maybe"
    }
    var mFE = $scope.attending
    var tEF = $scope.followers
    console.log('this is tEF ', tEF);
    if (tEF == undefined || tEF.length == 0 || add(maybe.user_id, tEF)) {
      eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending).then((res) => {
        session()
        getFol()
      })
    }
  }
  //     for (var i = 0; i < atten.length; i++) {
  //       if(atten[i].event_id == eventId) {
  //         if (atten.attending !== "yes") {
  //           console.log(atten[i].following_id);
  //           eventSrvc.updateFollowers(eventId, yes.user_id, yes.attending, atten[i].following_id).then((res) => {
  //             session()
  //             getFol()
  //           })
  //         }
  //       }
  //     }
  // }
    // console.log('this is mFE', mFe);
    // for (var i = 0; i < tEF.length; i++) {
    //   for (var j = 0; j < mFE.length; j++) {
    //     if (tEF[i].user_id != yes.user_id) {
    //       eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then((res) => {
    //         session()
    //         getFol()
    //       })
    //     }
    //     // tEF[i] mFE[j]
    //   }
    // }
  // }
  // $scope.yes = () => {
  //   console.log(eventId);
  //   console.log();
  //   console.log($scope.attending);
  //   var atten = $scope.attending
  //   const yes = {
  //     user_id: $scope.userId,
  //     attending: "yes"
  //   }
  //   if (atten === undefined || atten.length == 0) {
  //     eventSrvc.postFollowers(eventId, yes.user_id, yes.attending).then((res) => {
  //       session()
  //       getFol()
  //     })
  //   }
  //   for (var i = 0; i < atten.length; i++) {
  //     if(atten[i].event_id == eventId) {
  //       if (atten.attending !== "yes") {
  //         console.log(atten[i].following_id);
  //         eventSrvc.updateFollowers(eventId, yes.user_id, yes.attending, atten[i].following_id).then((res) => {
  //           session()
  //           getFol()
  //         })
  //       }
  //     }
  //   }
  // }
  // $scope.maybe = () => {
  //   console.log(eventId);
  //   console.log();
  //   console.log($scope.attending);
  //   var atten = $scope.attending
  //   const maybe = {
  //     user_id: $scope.userId,
  //     attending: "maybe"
  //   }
  //   if (atten === undefined || atten.length == 0) {
  //     eventSrvc.postFollowers(eventId, maybe.user_id, maybe.attending).then((res) => {
  //       session()
  //       getFol()
  //     })
  //   }
  //   for (var i = 0; i < atten.length; i++) {
  //     if(atten[i].event_id == eventId) {
  //       console.log('this is atten.attending maybe', atten.attending);
  //       if (atten.attending !== "maybe") {
  //         console.log(atten[i].following_id);
  //         eventSrvc.updateFollowers(eventId, maybe.user_id, maybe.attending, atten[i].following_id).then((res) => {
  //           session()
  //           getFol()
  //         })
  //       }
  //     }
  //   }
  // }
  // $scope.no = () => {
  //   console.log(eventId);
  //   console.log($scope.attending);
  //   var atten = $scope.attending
  //   const no = {
  //     user_id: $scope.userId,
  //     attending: "no"
  //   }
  //   if (atten === undefined || atten.length == 0) {
  //     eventSrvc.postFollowers(eventId, no.user_id, no.attending).then((res) => {
  //       session()
  //       getFol()
  //     })
  //   }
  //   for (var i = 0; i < atten.length; i++) {
  //     console.log('inside for');
  //     console.log("i am in no atten id", atten[i].event_id);
  //
  //       if(atten[i].event_id == eventId) {
  //         if (atten.attending !== "no") {
  //           console.log(atten[i].following_id);
  //           eventSrvc.updateFollowers(eventId, no.user_id, no.attending, atten[i].following_id).then((res) => {
  //             session()
  //             getFol()
  //           })
  //         }
  //       }
  //       else if (atten[i].event_id != eventId ) {
  //         // if (atten[i].event_id == eventId)
  //           eventSrvc.postFollowers(eventId, no.user_id, no.attending).then((res) => {
  //             session()
  //             getFol()
  //           })
  //         // }
  //       }
  //   }
  // }
  session();
  getFol();
  // myEvents();

})
