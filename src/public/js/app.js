var app = angular.module('caravan', [
  'ngRoute',
  'ui.bootstrap'
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

app.controller('NavController', ['$scope', '$window', function($scope, $window) {
  $scope.back = function() {
    $window.history.back();
  }
}]);

app.controller('HomeController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
  $scope.start_date = "JAN 1";
  $scope.end_date = "FEB 1";
  $scope.location = "PARIS";
  $scope.trips = [];
  $scope.home = true;

  // get trips
  $http({
    method: 'GET',
    url: '/api/trips/seetrips'
  }).then(function success(response) {
    $scope.trips = response.data;
  }, function error(response) {
  });

  $scope.pickWhereWhen = function() {
    var modalResult = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/partials/where-when.html',
      controller: 'WhereWhenController',
      resolve: {
        start_date: function() { return $scope.start_date; },
        end_date: function() { return $scope.end_date; },
        location: function() { return $scope.location; },
      }
    });

    modalResult.result.then(function(result) {
      $scope.start_date = result.start_date;
      $scope.end_date = result.end_date;
      $scope.location = result.location;
    });
  }
}]);

app.controller('WhereWhenController', ['$scope', '$uibModalInstance', 'start_date', 'end_date', 'location', function($scope, $uibModalInstance, start_date, end_date, location) {
  $scope.start_date = start_date;
  $scope.end_date = end_date;
  $scope.location = location;

  $scope.save = function() {
    $uibModalInstance.close({
      start_date: $scope.start_date,
      end_date: $scope.end_date,
      location: $scope.location,
    });
  }

  $scope.exit = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]);

app.controller('TripController', ['$scope', '$routeParams', '$http', '$uibModal', function($scope, $routeParams, $http, $uibModal) {
  $scope.trip = {}
  $scope.rating = 4;
  $scope.max = 5;

  $http({
    method: 'GET',
    url: '/api/trips/' + $routeParams.tripId
  }).then(function success(response) {
    $scope.trip = response.data;
  }, function error(response) {});

  $scope.fullStars = function() {
    return new Array($scope.rating);
  }

  $scope.emptyStars = function() {
    return new Array($scope.max - $scope.rating);
  }

  $scope.join = function() {
    var modalResult = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/partials/found-a-caravan.html',
      controller: 'FoundACaravanController',
      resolve: {
        trip: function() { return $scope.trip; }
      }
    });
  }
}]);

app.controller('FoundACaravanController', ['$scope', '$uibModalInstance', 'trip', function($scope, $uibModalInstance, trip) {
  $scope.trip = trip;

  $scope.exit = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]);

