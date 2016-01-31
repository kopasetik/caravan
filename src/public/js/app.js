var app = angular.module('caravan', [
  'ngRoute',
  'ui.bootstrap'
]);

// routes

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

// values

app.value('tripRegistry', {});

// directives

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

// controllers

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
  $scope.getTrips = function() {
    $http({
      method: 'GET',
      url: '/api/trips/seetrips/' + $scope.location
    }).then(function success(response) {
      $scope.trips = response.data;
    }, function error(response) {
    });
  }
  $scope.getTrips();

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
      $scope.getTrips();
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

app.controller('TripController', [
               '$scope',
               '$routeParams',
               '$http',
               '$uibModal',
               'tripRegistry',
               function($scope, $routeParams, $http, $uibModal, tripRegistry) {
  $scope.trip = {}
  $scope.rating = 4;
  $scope.max = 5;
  $scope.booked = false;
  $scope.image = '/img/trip_detail.png';

  $http({
    method: 'GET',
    url: '/api/trips/' + $routeParams.tripId
  }).then(function success(response) {
    $scope.trip = response.data;
    var images = $scope.trip.images;
    if (images.length > 0) {
      $scope.image = images[0].large;
    }
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

    $scope.booked = true;
    tripRegistry[$scope.trip._id] = true;
  }

  $scope.finishTrip = function() {
    var modalResult = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/partials/finished-trip.html',
      controller: 'FinishedTripController',
    });

    modalResult.result.then(function(result) {
      if (result) {
        $scope.booked = false;
        tripRegistry[$scope.trip._id] = false;
      }
    });
  }
}]);

app.controller('FoundACaravanController', ['$scope', '$uibModalInstance', 'trip', '$http', '$window', function($scope, $uibModalInstance, trip, $http, $window) {
  $scope.trip = trip;

  $scope.exit = function() {
    $uibModalInstance.dismiss('cancel');
  }

  $http({
    method: 'GET',
    url: '/api/trips/seetrips/' + $scope.location + '/cars'
  }).then(function success(response) {
    var cars = response.data;
    var car = cars[0];
    $scope.carUrl = car['DetailsUrl'];

  }, function error(response) {
  });

  $scope.viewCars = function() {
    $window.location = $scope.carUrl;
  }

}]);

app.controller('FinishedTripController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  $scope.exit = function() {
    $uibModalInstance.dismiss('cancel');
  }

  $scope.done = function() {
    $uibModalInstance.close(true);
  }

  $scope.max = 5;
}]);


// filters
app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
