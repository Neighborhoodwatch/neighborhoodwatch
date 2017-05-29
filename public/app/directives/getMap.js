angular.module('nWatch').directive('nwGetMap', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/getMap.html',
      controller: function($scope, eventSrvc) {
        var lat = parseFloat(eventSrvc.grabEvent[4].event_location_lat)
        var long = parseFloat(eventSrvc.grabEvent[4].event_location_lon)
        console.log(lat, long);
        var myLatLng = {lat: lat, lng: long};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }
    }
})
