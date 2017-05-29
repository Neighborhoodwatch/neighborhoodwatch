angular.module('fileModelDirective', []).directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var parsedFile = $parse(attrs.fileModel);
            var parsedFileSetter = parsedFile.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    parsedFileSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

/*Usage*/
/*template*/
/*
<div ng-show="uploading" class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
          <span class="sr-only">45% Complete</span>
        </div>
      </div>

      <div ng-show="message">
        <div ng-class="alert">{{ message }}</div>
      </div>
      <br>
      <br>
      <form ng-submit="Submit();">
        <label class="btn btn-success">
          Browse
          <input type="file" ng-disabled="uploading" file-model="file.upload" name="myfile" style="display: none;" onchange="angular.element(this).scope().photoChanged(this.files)">
        </label>
        <br>
        <br>
        <button ng-disabled="uploading" type="submit" class="btn btn-primary">Upload</button>
      </form>

      <br>

      <img class="mythumbnail" ng-src="{{ thumbnail.dataUrl || defaultUrl }}">
*/

/*uploadFileService.js*/
/*
angular.module('uploadFileService', []).service('uploadFile', function($http) {
    this.upload = function(file) {
        var fd = new FormData();
        fd.append('myfile', file.upload);
        return $http.post('/upload/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };
});
*/


/*app, controller*/
/*
include in app array --> 'uploadFileService', 'fileModelDirective'  //fileModelDirective = this file (check name tf directive),  Service included below
include in service list -->  $timeout, uploadFile

	$scope.file = {};
	$scope.message = false;
	$scope.alert = '';
	$scope.defaultUrl = 'images/app_product.png';

	$scope.Submit = function() {
      $scope.uploading = true;
      uploadFile.upload($scope.file).then(function(data) {
          if (data.data.success) {
              $scope.uploading = false;
              $scope.alert = 'alert alert-success';
              $scope.message = data.data.message;
              $scope.file = {};
          } else {
              $scope.uploading = false;
              $scope.alert = 'alert alert-danger';
              $scope.message = data.data.message;
              $scope.file = {};
          }
      });
  };

  $scope.photoChanged = function(files) {
      if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
          $scope.uploading = true;
          var file = files[0];
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
              $timeout(function() {
                  $scope.thumbnail = {};
                  $scope.thumbnail.dataUrl = e.target.result;
                  if(!$scope.product.imageurl) {
                    $scope.product.imageurl = 'images/' + file.name || $scope.defaultUrl;
                  }
                  $scope.uploading = false;
                  $scope.message = false;
              });
          };
      } else {
          $scope.thumbnail = {};
          $scope.message = false;
      }
  };

*/
