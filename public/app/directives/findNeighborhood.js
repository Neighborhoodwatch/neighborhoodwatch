angular.module('nWatch').directive('nwFindNeighborhood', function() {
    return {
        restrict: 'EA',
        templateUrl: './app/directives/findNeighborhood.html',
        controller: function($scope, neighborhoodSrvc, userSrvc) {
            $scope.applied = false
            //Determines sort order, grabs neighborhoods based on state, orders list by city name

            var previousState;
            var noStateChange = true
            //Function that fires if only state is changed to reload the database calls
            $scope.stateSearchChange = (state, city, sort) => {
                previousState = state
                noStateChange = false
                neighborhoodSrvc.getNeighborhoods(state).then(function(res) {
                    let data = res.data
                    let checkMatch = (obj) => {
                        return obj.city.toUpperCase() === city.toUpperCase()
                    }
                    let noMatch = (obj) => {
                        return obj.city.toUpperCase() !== city.toUpperCase()
                    }
                    var matchingArr = data.filter(checkMatch)
                    var noMatchingArr = data.filter(noMatch)
                    matchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    noMatchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    var joinedArr = matchingArr.concat(noMatchingArr)
                    $scope.neighborhoods = joinedArr
                    if (!sort) {
                        sort = "alphabetical"
                    }
                    if (sort === 'alphabetical') {
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'reverse') {
                        matchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        noMatchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'Top 10') {
                        $scope.quantity = 10
                    } else if (sort === 'Top 20') {
                        $scope.quantity = 20
                    } else if (sort === 'Top 50') {
                        $scope.quantity = 50
                    }
                    noStateChange = true
                })
            }
            //Code that runs if neighborhoods are populated and state was not changed..This is used for if the sort by is changed
            $scope.noChange = (state, city, sort) => {
                neighborhoodSrvc.getNeighborhoods(state).then(function(res) {
                    let data = res.data

                    let checkMatch = (obj) => {
                        return obj.city.toUpperCase() === city.toUpperCase()
                    }
                    let noMatch = (obj) => {
                        return obj.city.toUpperCase() !== city.toUpperCase()
                    }
                    var matchingArr = $scope.neighborhoods.filter(checkMatch)
                    var noMatchingArr = $scope.neighborhoods.filter(noMatch)
                    matchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    noMatchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    var joinedArr = matchingArr.concat(noMatchingArr)
                    $scope.neighborhoods = joinedArr
                    if (!sort) {
                        sort = "alphabetical"
                    }
                    if (sort === 'alphabetical') {
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'reverse') {
                        matchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        noMatchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'Top 10') {
                        $scope.quantity = 10
                    } else if (sort === 'Top 20') {
                        $scope.quantity = 20
                    } else if (sort === 'Top 50') {
                        $scope.quantity = 50
                    }
                    $scope.applied = true
                })
            }
            //Function that runs if neighborhoods haven't been populated
            $scope.grabNeighborhood = (state, city, sort) => {
                $scope.applied = !$scope.applied
                neighborhoodSrvc.getNeighborhoods(state).then(function(res) {
                    let data = res.data
                    let checkMatch = (obj) => {
                        return obj.city.toUpperCase() === city.toUpperCase()
                    }
                    let noMatch = (obj) => {
                        return obj.city.toUpperCase() !== city.toUpperCase()
                    }
                    var matchingArr = data.filter(checkMatch)
                    var noMatchingArr = data.filter(noMatch)
                    matchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    noMatchingArr.sort(function(a, b) {
                        var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });
                    var joinedArr = matchingArr.concat(noMatchingArr)
                    $scope.neighborhoods = joinedArr
                    if (!sort) {
                        sort = "alphabetical"
                    }
                    if (sort === 'alphabetical') {
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'reverse') {
                        matchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        noMatchingArr.sort(function(a, b) {
                            var nameA = a.name.toLowerCase(),
                                nameB = b.name.toLowerCase();
                            if (nameA > nameB) //sort string ascending
                                return -1;
                            if (nameA < nameB)
                                return 1;
                            return 0; //default return value (no sorting)
                        });
                        var joinedArr = matchingArr.concat(noMatchingArr)
                        $scope.neighborhoods = joinedArr
                    } else if (sort === 'Top 10') {
                        $scope.quantity = 10
                    } else if (sort === 'Top 20') {
                        $scope.quantity = 20
                    } else if (sort === 'Top 50') {
                        $scope.quantity = 50
                    }
                })
            }
        //Master function that handles all different search possibilities
        $scope.apply = (state, city, sort, cb1, cb2, cb3) => {
            if (!previousState) {
                previousState = state
            } else if (previousState !== state) {
                cb1(state, city, sort)
            }
            if ($scope.neighborhoods && noStateChange) {
                cb2(state, city, sort)
            } else if (!$scope.neighborhoods) {
                cb3(state, city, sort)
            }
          }
            //Join Neighborhood function
            $scope.joinNeighborhood = (neighborhood_id, user_id) => {
                neighborhoodSrvc.joinNeighborhood(neighborhood_id, user_id).then(function(res) {
                    userSrvc.getUser(user_id).then(function(res) {

                        $scope.getSession()
                        $scope.applied = !$scope.applied
                        $scope.city = ''
                        $scope.state = ''
                        $('#sortBy').text('Sort By')

                        $scope.noNeighborhood = false
                    })
                })
            }
            //Setting button html of sort
            $scope.setSort = (param) => {
                $scope.sort = param
                $('#sortBy').text(param)
            }

        }
    }
})
