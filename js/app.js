(function(){

  var timHome = angular.module('timHome', ['ngMaterial','ngSanitize','ui.router','ui.gravatar']);

  timHome.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('blue');


    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', { url: '/', templateUrl : "partials/home.html"})
      .state('home-detail', { url: '/:postid', templateUrl : "partials/home.html"})
      .state('homebeta', { url: '/beta/home', templateUrl : "partials/home2.html"});
  });

  timHome.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
)

  timHome.controller('NavController',function ($scope, $http) {
    $scope.nav = [];
    $http.get('/json/nav.json', { cache : true})
      .then(function(result){
        $scope.nav = result.data;
      }, function(){console.warn('issue getting nav')});
  });

  timHome.controller('HomeController',function ($sce, $scope, $http) {
    $scope.posts = [];
    $scope.postid = $scope.$stateParams.postid;
    $http.get('/json/posts.json', { cache : true})
      .then(function(result){
        $scope.posts = result.data;
      }, function(){console.warn('issue getting posts')});
  });

  timHome.controller('BetaHomeController', function ($scope, $http) {
    $scope.posts = [];
    $http.get('/json/posts.json', { cache : true})
      .then(function(result){
        $scope.posts = result.data;
      }, function(){console.warn('issue getting posts')});
  });

  timHome.directive('blogPostBeta', function(){
    return {
      restrict : 'E',
      scope : {
        title : '@',
        body : '@',
        date : '@'
      },
      templateUrl : 'partials/bp2.html'
    }
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
