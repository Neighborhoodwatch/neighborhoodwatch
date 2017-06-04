angular.module('nWatch').service('typeService', function($http) {
  this.getTypes = function () {
    return $http({
      method: "GET",
      url: '/api/types'
    })
  }
})
