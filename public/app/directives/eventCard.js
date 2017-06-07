angular.module('nWatch')
    .directive('eventCard', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            date: '@',
            details: '@',
            eventId: '@',
            photo: '@'
          },
        templateUrl: './app/directives/eventCard.html',
        // controller: controllerFunction, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) {
          // console.log($scope,attrs);
        } //DOM manipulation
    }
});
