angular.module('nWatch').service('signupSrvc', function($http) {

  this.createUser = (first_name, last_name, username, email, facebook_id, google_id, password, photo) => {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        first_name,
        last_name,
        username,
        email,
        facebook_id,
        google_id,
        password,
        photo
      }
    })
  }


})
