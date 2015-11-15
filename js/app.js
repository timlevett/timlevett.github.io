(function(){

  var timHome = angular.module('timHome', ['ngMaterial','ngSanitize','ui.router']);

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

  timHome.controller('HomeController',function ($sce, $scope, $http) {
    $scope.posts = [];
    $http.get('/json/posts.json', { cache : true})
      .then(function(result){
        $scope.posts = result.data;
      }, function(){console.warn('issue getting posts')});
  });

  timHome.directive('blogPost', function(){
    return {
      restrict : 'E',
      scope : {
        title : '@',
        body : '@',
        date : '@'
      },
      templateUrl : 'partials/blogpost.html'
    }
  });

  timHome.value('date',new Date());
})();
