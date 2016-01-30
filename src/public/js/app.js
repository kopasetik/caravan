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

app.directive('trip', function() {
  return {
    templateUrl: '/partials/tripCard.html'
  }
});

app.controller('HomeController', ['$scope', function($scope) {
  $scope.start_date = "Jan 1";
  $scope.end_date = "Feb 1";
  $scope.location = "Paris";

  $scope.getTimes = function(n) {
    return new Array(n);
  };
}]);
