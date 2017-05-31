angular.module('nWatch').controller('homeCtrl', function($scope, eventSrvc) {
  eventSrvc.getEvents().then((res) => {
    console.log(res);
    $scope.events = res;
  })
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
  $scope.category = $scope.lists[0]
  console.log(eventSrvc.getEvents());
})
