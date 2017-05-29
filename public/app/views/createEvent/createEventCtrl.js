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
  $scope.eventCreate = (event, category) => {
    event.event_location_lat = $scope.lat
    event.event_location_lon = $scope.long
    event.date = $scope.dt.toDateString()
    event.photo = ''
    event.category = $scope.category.name
    console.log(event);
    eventSrvc.createdEvent(event)
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
