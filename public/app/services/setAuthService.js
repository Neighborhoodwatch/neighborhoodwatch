
angular.module('nWatch')
  .factory('adminAuth', function() {

    var obj = {}
    this.access = false
    obj.getClientPermission = function() {
      this.access = true;
    }
    obj.logout = function() {
      this.access = false
    }
    obj.checkClientPermission = function() {
      return this.access;
    }
    return obj;









  })
