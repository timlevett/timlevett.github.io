(function(){

  var timHome = angular.module('timHome', ['ngMaterial','ngSanitize','ui.router','ui.gravatar','angulartics', 'angulartics.google.analytics']);

//configuration -----------------------------------------------------------------------
  timHome.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('blue');

    $mdThemingProvider.theme('altTheme')
      .primaryPalette('orange')
      .accentPalette('red');

    $mdThemingProvider.alwaysWatchTheme(true);


    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', { url: '/', templateUrl : "partials/home2.html"})
      .state('home-detail', { url: '/post/:postid', templateUrl : "partials/detail.html"})
      .state('homebeta', { url: '/beta/home', templateUrl : "partials/home.html"});
  });

  timHome.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.theme = 'default';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
);

//controllers -----------------------------------------------------------------------

    timHome.controller('NavController',function ($scope, $http, $rootScope) {
    $scope.nav = [];

    $scope.switchTheme = function() {
      $rootScope.theme = $rootScope.theme === 'default' ? 'altTheme' : 'default';
    };

    $http.get('/json/nav.json', { cache : true})
      .then(function(result){
        $scope.nav = result.data;
      }, function(){console.warn('issue getting nav')});
  });

  timHome.controller('HomeController',function ($sce, $scope, $http, filterFilter) {
    $scope.posts = [];
    $scope.postid = $scope.$stateParams.postid;
    $http.get('/json/posts.json', { cache : true})
      .then(function(result){
        $scope.posts = result.data;
        if($scope.postid) {
          $scope.post = filterFilter($scope.posts, $scope.postid)[0];
        }
      }, function(){console.warn('issue getting posts')});
  });

//directives -----------------------------------------------------------------------

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

  timHome.directive('nav', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/nav.html'
    };
  });

})();
