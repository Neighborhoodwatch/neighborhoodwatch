angular.module('nWatch').service('signupSrvc', function($http) {

  this.createUser = (first, last, username, email, face, google, password, photo) => {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        first,
        last,
        username,
        email,
        face,
        google,
        password,
        photo
      }
    })
  }


})
