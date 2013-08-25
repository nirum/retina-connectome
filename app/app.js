/*
 * Retina Connectome
 */

angular.module('myApp', ['myApp.controllers', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
    //$locationProvider.html5Mode(true);
  }]);
