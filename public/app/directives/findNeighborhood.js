angular.module('nWatch').directive('nwFindNeighborhood', function() {
    return {
        restrict: 'EA',
        templateUrl: './app/directives/findNeighborhood.html',
        controller: function($scope, neighborhoodSrvc) {
            $scope.applied = false
            $scope.apply = (state, city, sort) => {
              $scope.applied = !$scope.applied
                if(!sort) {
                  sort = 'alphabetical'
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab all neighborhoods by alphabetical order. need sql call made
                  })
                }
                else if(sort === 'alphabetical') {
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab all neighborhoods by alphabetical order. need sql call made
                  })

                } else if(sort === 'reverse') {
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab all neighborhoods by reverse alphabetical order. need sql call made

                  })
                } else if(sort === 'Top 10') {
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab top 10 neighborhoods. need sql call made

                  })
                } else if(sort === 'Top 20') {
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab top 20 neighborhoods. need sql call made

                  })
                } else if(sort === 'Top 50') {
                  neighborhoodSrvc.grabNeighborhoods(state, city, sort).then(function(response) {
                    //Will grab top 50 neighborhoods. need sql call made

                  })
                }
            }

            $scope.setSort = (param) => {
              $scope.sort = param
              $('#sortBy').text(param)
            }

        }
    }
})
