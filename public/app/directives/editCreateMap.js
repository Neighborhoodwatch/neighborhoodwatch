angular.module('nWatch').directive('nwEditCreateMap', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/editCreateMap.html',
      controller: function($scope, eventSrvc) {
        var myLatLng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
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
          var lat = cordinates.lat;
          var long = cordinates.lng;
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
              $scope.lat = cordinates.lat
              console.log(lati, long);
              $scope.long = cordinates.lng

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
      }
    }
})
