var app = angular.module('caravan', [
  'ngRoute',
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/partials/home.html',
    controller: 'HomeController'
  }).when('/trips/:tripId', {
    templateUrl: '/partials/trip.html',
    controller: 'TripController'
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

app.directive('review', function() {
  return {
    templateUrl: '/partials/review.html'
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

app.controller('TripController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.tripId = $routeParams.tripId;
  $scope.title = "Scenery & Scotch";

  $scope.rating = 4;
  $scope.max = 5;

  $scope.fullStars = function() {
    return new Array($scope.rating);
  }

  $scope.emptyStars = function() {
    return new Array($scope.max - $scope.rating);
  }
}]);
