var app = angular.module('caravan', [
  'ngRoute',
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/partials/login.html',
    controller: 'LoginController'
  }).otherwise({
    redirectTo: '/login'
  });
}]);
