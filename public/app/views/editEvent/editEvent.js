angular.module('nWatch').controller('editEventCtrl', function ($scope) {
  $scope.lists = [
    {
      name: 'Lost Pet'
    },
    {
      name: 'Damage'
    },
    {
      name: 'Neighborhood Lurker'
    },
    {
      name: 'Looking For'
    }
  ]
  $scope.category = $scope.lists[0]
  // console.log($scope.category);
  // setTimeout(function(){
  //   console.log($scope.category);
  // }, 3000);

  $scope.event = {
     check1: false,
     check2:  false,
     check3: false
  };
  $scope.eventEdit = (event) => {
    console.log(event);
  }


})
