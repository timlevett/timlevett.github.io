(function(){

  var timHome = angular.module('timHome', ['ngMaterial','ui.router']);
  
  timHome.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('blue');
      
  
    $urlRouterProvider.otherwise("/");  
    $stateProvider
      .state('home', { url: '/', templateUrl : "partials/home.html"});
  });

  timHome.controller('NavController',function ($scope, $http) {
    $scope.nav = [];
    $http.get('/json/nav.json', { cache : true})
      .then(function(result){
        $scope.nav = result.data;
      }, function(){console.warn('issue getting nav')});
  });
})();