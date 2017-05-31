angular.module('nWatch').service('sessionSrv', function($http) {
  this.session = () => {
    return $http({
      method: "GET",
      url: "/whoami"
    }).then((res) => {
      return res.data
    })
  }
})
