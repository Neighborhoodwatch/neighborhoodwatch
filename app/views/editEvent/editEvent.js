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

  $scope.checkboxModel = {
     value1: false,
     value2:  false,
     value3: false
  };



})
