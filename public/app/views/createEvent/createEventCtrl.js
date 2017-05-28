angular.module('nWatch').controller('createEventCtrl', function($scope, eventSrvc ) {
  $scope.lists = [
    {
      name: 'Lost Pet'
    },
    {
      name: 'Damage'
    },
    {
      name: 'Misc'
    },
    {
      name: 'Neighborhood Watch'
    },
    {
      name: 'Clean-up'
    },
    {
      name: 'Missing Person'
    },
    {
      name: 'Meet Up'
    },
    {
      name: 'Entertainment'
    }
  ]
  $scope.category = $scope.lists[0]

  $scope.eventImg = "yoyoyo"

  $scope.event = {
     check1: false,
     check2:  false,
     check3: false
  };
  $scope.eventCreate = (event) => {
    console.log(event);
  }


  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  var tA = '2787 E westerling way'
  eventSrvc.getMaps(tA).then((res) => {
    var cordinates = res.data.results[0].geometry.location;
    $scope.lat = cordinates.lat;
    $scope.long = cordinates.lng
    console.log($scope.lat, $scope.long);
  })

  $scope.changeMap = (map) => {
    if (map.address && map.city && map.state && map.zip) {
    var mapA = map.address;
    var mapC = map.city;
    var mapS = map.state;
    var mapZ = map.zip
    var address = `${mapA} ${mapC}, ${mapS} ${mapZ}`
    console.log(address);
      eventSrvc.getMaps(address)
      .then((res) => {
        var cordinates = res.data.results[0].geometry.location;
        var lati = cordinates.lat;
        var long = cordinates.lng
        console.log($scope.lat, $scope.long);

        var myLatLng = {lat: lati, lng: long};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      })
    }else {
      alert('please fill out all boxes on from to generate a event map')
    }
  }

})
