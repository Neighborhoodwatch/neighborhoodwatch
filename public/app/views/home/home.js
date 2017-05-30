angular.module('nWatch').controller('homeCtrl', function($scope, eventSrvc) {
  eventSrvc.getEvents().then((res) => {
    console.log(res);
    $scope.events = res;
  })
  // $scope.events = eventSrvc.getEvents()
  console.log(eventSrvc.getEvents());
})
