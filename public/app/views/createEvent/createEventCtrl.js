angular.module('nWatch').controller('createEventCtrl', function($scope,) {
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

})
