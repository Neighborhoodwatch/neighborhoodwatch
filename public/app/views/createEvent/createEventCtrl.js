angular.module('nWatch').controller('createEventCtrl', function($scope, eventSrvc, $log, sessionSrv, typeService ) {
  var session = () => {
    sessionSrv.session().then((res) => {
      console.log("this is session", res);
      //
      // console.log("this is user session", res.user[0].user_id)
      if (res.isLoggedIn) {
        $scope.userId = res.user[0].user_id
      }
      console.log(res.followedEvents);
      $scope.attending = res.followedEvents;
      if (res.isLoggedIn) {
        $scope.hood = res.neighborhood[0].neighborhood_id;
      }
      console.log("this is attending", $scope.attending);
    })
  }

  $scope.lists = [
    {
      name: 'Lost Pet',
      type_id: 1
    },
    {
      name: 'Damage',
      type_id: 2
    },
    {
      name: 'Neighborhood Watch',
      type_id: 4
    },
    {
      name: 'Clean-up',
      type_id: 5
    },
    {
      name: 'Missing Person',
      type_id: 6
    },
    {
      name: 'Meet Up',
      type_id: 7
    },
    {
      name: 'Entertainment',
      type_id: 8
    },
    {
      name: 'Other',
      type_id: 3
    }
  ]

  // typeService.getTypes().then(function (res, err) {
  //   console.log('types', res, err);
  //   $scope.lists = res.data;
    $scope.category = $scope.lists[0]
  //
  // })

  $scope.eventImg = "yoyoyo"

  $scope.event = {};
  $scope.eventCreate = (event) => {

    event.type_id = $scope.category.type_id;
    event.event_location_lat = $scope.lat
    event.event_location_lon = $scope.long
    // we need to update the db for this time. maybe text?
    event.event_time = $scope.mytime
    event.date = $scope.dt.toDateString()
    event.photo = ''
    event.created_by = $scope.userId
    if ($scope.userId) {
      event.neighborhood_id = $scope.hood
    }
    console.log(event);
    eventSrvc.save(event)
  }

  //photo upload
  $scope.file = {};
  $scope.message = false;
  $scope.alert = '';
  $scope.defaultUrl = 'app/img/solitary-weed.png';

  $scope.Submit = function() {
      $scope.uploading = true;
      uploadFile.upload($scope.file).then(function(data) {
          if (data.data.success) {
              $scope.uploading = false;
              $scope.alert = 'alert alert-success';
              $scope.message = data.data.message;
              $scope.file = {};
          } else {
              $scope.uploading = false;
              $scope.alert = 'alert alert-danger';
              $scope.message = data.data.message;
              $scope.file = {};
          }
      });
  };

  $scope.photoChanged = function(files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
          $scope.uploading = true;
          var file = files[0];
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
              $timeout(function() {
                  $scope.thumbnail = {};
                  $scope.thumbnail.dataUrl = e.target.result;
                  if(!$scope.photo) {
                    $scope.photo = 'app/img/' + file.name || $scope.defaultUrl;
                  }
                  $scope.uploading = false;
                  $scope.message = false;
              });
          };
      } else {
          $scope.thumbnail = {};
          $scope.message = false;
      }
  };
  //end photo upload

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
  // time picker
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };
  session();
})
