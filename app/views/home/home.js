angular.module('nWatch').controller('homeCtrl', function($scope, one) {
  $scope.arr = one.words()

  $scope.people = [
    {
      name: 'Mike Davis',
      img: 'https://www.maxprog.com/img/cat.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: () => {
        var date = new Date()
        return date
      }
    },
    {
      name: 'Susan Willis',
      img: 'https://s-media-cache-ak0.pinimg.com/originals/ca/17/a9/ca17a924a05c848ef199dd510eed1d75.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: () => {
        var date = new Date()
        return date
      }
    },
    {
      name: 'Dave Lake',
      img: 'http://www.piz18.com/wp-content/uploads/2015/05/So-beautiful-melancholic-cat-550x371.jpg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: () => {
        var date = new Date()
        return date
      }
    }
  ];
  $scope.date = new Date();
})
