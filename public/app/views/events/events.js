angular.module('nWatch').controller('eventsCtrl', ($scope, eventSrvc) => {

  $scope.event = eventSrvc.event
  console.log($scope.event);
  $scope.eventSignUp = (id) => {

  }
})
