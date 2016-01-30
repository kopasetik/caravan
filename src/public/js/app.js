var app = angular.module('caravan', [
  'ngRoute',
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/partials/home.html',
    controller: 'HomeController'
  }).otherwise({
    redirectTo: '/home'
  });
}]);

app.directive('header', function() {
  return {
    templateUrl: '/partials/header.html'
  }
});

app.controller('HomeController', ['$scope', function($scope) {
}]);
