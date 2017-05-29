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

  $scope.event = {};
  $scope.eventCreate = (event,) => {

    if ($scope.category.name === 'Lost Pet') {
      event.type_id = 1
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Damage') {
      event.type_id = 2
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Misc') {
      event.type_id = 3
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Neighborhood Watch') {
      event.type_id = 4
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Clean-up') {
      event.type_id = 5
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Missing Person') {
      event.type_id = 6
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Meet Up') {
      event.type_id = 7
      console.log(event.type_id);
    }
    else if ($scope.category.name === 'Entertainment') {
      event.type_id = 8
      console.log(event.type_id);
    }

    event.event_location_lat = $scope.lat
    event.event_location_lon = $scope.long
    event.date = $scope.dt.toDateString()
    event.photo = ''
    console.log(event);
    // eventSrvc.createdEvent(event)
  }
  // ui--bootstrap date js
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }

})
