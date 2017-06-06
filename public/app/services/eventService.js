angular.module('nWatch').service('eventSrvc', function($http) {
  this.getEvent = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id
    }).then(function (response) {
      return response.data;
    })
  }

  this.getEvents = function () {
    return $http({
      method: 'GET',
      url: 'api/events'
    }).then(function (response) {
      return response.data
    })
  }

  this.getFollowers = function (id) {
    return $http({
      method: 'GET',
      url: 'api/events/' + id + '/followers'
    }).then(function (response) {
      return response.data;
    })
  }

  this.postFollowers = function (id, uId, att) {
    return $http({
      method: 'POST',
      url: 'api/events/' + id+ '/following',
      data: {
        user_id: uId,
        attending: att
      }
    }).then(function (response) {
      response.data;
    })
  }

  this.updateFollowers = function (id, uId, att, folId) {
    console.log("this is service fol ", folId);
    console.log("this is service id ", id);
    return $http({
      method: 'PUT',
      url: 'api/events/' + id + '/following',
      data: {
        user_id: uId,
        attending: att,
        following_id: folId
      }
    })
  }

  this.getMyFollowedEvents = (id) => {
    return $http({
      method: "GET",
      url: 'api/imFollowing/' + id,
    })
  }

  this.save = function (event) {
    if (!event.event_id ) {
      return $http({
        method: 'POST',
        url: 'api/events',
        data: event
      }).then(function (response) {
        return response.data;
      })
    } else {
      console.log("there was an event");
      var id = event.event_id
      return $http({
        method: 'PUT',
        url: 'api/events/' + id,
        data: event
      }).then(function (response) {
        return response.data;
      })
    }
  }

  this.delete = function (id) {
    return $http({
      method: 'DELETE',
      url: 'api/events/' + id,
    }).then(function (response) {
      return response.data;
    })
  }
  this.getMaps = (address) => {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    })
  }
  this.getAdd = (latlng) => {
    return $http({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + latlng + "&key=AIzaSyDygNCUy0c-ktsxgQh54x83Rdza88YjOYg"
    })
  }

/*
angular.module('nWatch').service('eventSrvc', function ($http) {

  this.editEvent = (eventObj) => {
    console.log("im in a service" , eventObj);
  }

  this.grabEvent = [
    {
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
  		"title": "orci. Ut sagittis lobortis",
  		"type_id": 7,
  		"created_by": 65,
  		"event_location_lat": "-15.83664",
  		"event_location_lon": "139.77701",
  		"name of location": "Daves house",
  		"event_date": "some date",
  		"event_time": "7:00 pm"
  	},
  	{
  		"lat": "32.72301",
  		"lon": "-137.35647",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper.",
  		"title": "lorem ut",
  		"type_id": 5,
  		"created_by": 74,
  		"event_location_lat": "-58.94132",
  		"event_location_lon": "-162.60614",
  		"event_time": 5
  	},
  	{
  		"lat": "-63.30399",
  		"lon": "45.1698",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam",
  		"title": "arcu. Nunc mauris. Morbi",
  		"type_id": 1,
  		"created_by": 88,
  		"event_location_lat": "-72.76823",
  		"event_location_lon": "120.08304",
  		"event_time": 3
  	},
  	{
  		"lat": "-3.52549",
  		"lon": "-141.7617",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor.",
  		"title": "et malesuada fames ac",
  		"type_id": 2,
  		"created_by": 67,
  		"event_location_lat": "-16.78785",
  		"event_location_lon": "-10.20352",
  		"event_time": 11
  	},
  	{
  		"lat": "69.05574",
  		"lon": "-85.5249",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed",
  		"title": "rhoncus. Proin nisl sem, consequat",
  		"type_id": 2,
  		"created_by": 74,
  		"event_location_lat": "49.54182",
  		"event_location_lon": "59.362",
  		"event_time": 2
  	},
  	{
  		"lat": "7.35512",
  		"lon": "-59.0523",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet",
  		"title": "eu tellus. Phasellus elit pede,",
  		"type_id": 6,
  		"created_by": 55,
  		"event_location_lat": "1.06703",
  		"event_location_lon": "-131.4077",
  		"event_time": 12
  	},
  	{
  		"lat": "32.27714",
  		"lon": "11.33024",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",
  		"title": "arcu imperdiet ullamcorper. Duis",
  		"type_id": 1,
  		"created_by": 89,
  		"event_location_lat": "-63.52479",
  		"event_location_lon": "121.58237",
  		"event_time": 3
  	},
  	{
  		"lat": "62.21508",
  		"lon": "-9.83114",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida",
  		"title": "Nulla facilisis.",
  		"type_id": 6,
  		"created_by": 50,
  		"event_location_lat": "-27.67589",
  		"event_location_lon": "114.89798",
  		"event_time": 12
  	},
  	{
  		"lat": "-26.5582",
  		"lon": "-131.61448",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis",
  		"title": "iaculis odio. Nam interdum",
  		"type_id": 3,
  		"created_by": 75,
  		"event_location_lat": "-6.418",
  		"event_location_lon": "139.44585",
  		"event_time": 8
  	},
  	{
  		"lat": "-10.82466",
  		"lon": "82.16523",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et",
  		"title": "Suspendisse non leo. Vivamus nibh",
  		"type_id": 4,
  		"created_by": 51,
  		"event_location_lat": "88.3255",
  		"event_location_lon": "14.63228",
  		"event_time": 1
  	},
  	{
  		"lat": "25.35664",
  		"lon": "26.60283",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,",
  		"title": "faucibus orci luctus",
  		"type_id": 5,
  		"created_by": 98,
  		"event_location_lat": "32.963",
  		"event_location_lon": "98.48688",
  		"event_time": 7
  	},
  	{
  		"lat": "26.90914",
  		"lon": "-58.19284",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
  		"title": "arcu et",
  		"type_id": 3,
  		"created_by": 96,
  		"event_location_lat": "62.92709",
  		"event_location_lon": "8.22257",
  		"event_time": 4
  	},
  	{
  		"lat": "-1.89265",
  		"lon": "105.38326",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
  		"title": "consequat auctor, nunc nulla",
  		"type_id": 7,
  		"created_by": 59,
  		"event_location_lat": "-31.06213",
  		"event_location_lon": "-69.15561",
  		"event_time": 3
  	},
  	{
  		"lat": "-8.42796",
  		"lon": "11.35168",
  		"details": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
  		"title": "vitae dolor. Donec fringilla. Donec",
  		"type_id": 2,
  		"created_by": 67,
  		"event_location_lat": "-71.7451",
  		"event_location_lon": "-160.49455",
  		"event_time": 7
  	}
  ]
*/


})
