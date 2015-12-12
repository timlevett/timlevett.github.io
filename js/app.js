(function(){

  var timHome = angular.module('timHome', ['ngMaterial',
                                           'ngSanitize',
                                           'ui.router',
                                           'ui.gravatar',
                                           'angulartics',
                                           'angulartics.google.analytics',
                                           'hc.marked']);

//configuration -----------------------------------------------------------------------
  timHome.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $analyticsProvider) {
    $analyticsProvider.firstPageview(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('blue');

    $mdThemingProvider.theme('altTheme')
      .primaryPalette('orange')
      .accentPalette('red');

    $mdThemingProvider.alwaysWatchTheme(true);


    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', { url: '/', templateUrl : "partials/home2.html", controller : "HomeController"})
      .state('home-detail', { url: '/post/:postid', templateUrl : "partials/detail.html"})
      .state('tags', { url : '/tag/:tag', templateUrl : "partials/home2.html", controller : "TagController"})
  });

  timHome.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.theme = 'default';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
);

//services -------------------------------------------------------------------------

timHome.factory('PostService', ['$http', function($http){

    var getPosts = function() {
      return $http.get('/json/posts.json', { cache : true})
      .then(function(result){
        var posts = result.data;
        return posts;
      }, function(){console.warn('issue getting posts')});
    }

    return {
      getPosts : getPosts
    };
  }]);


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

  timHome.controller('HomeController',function ($sce, $scope, PostService, filterFilter) {
    $scope.posts = [];
    $scope.height = 90;
    $scope.postid = $scope.$stateParams.postid;
    PostService.getPosts()
      .then(function(result){
        $scope.posts = result;
        if($scope.postid) {
          $scope.post = filterFilter($scope.posts, {title : $scope.postid})[0];
        }
      });
  });

  timHome.controller('TagController',function ($sce, $scope, PostService, filterFilter) {
    $scope.posts = [];
    $scope.height = 80;
    $scope.tag = $scope.$stateParams.tag;
    PostService.getPosts()
      .then(function(result){
        if($scope.tag) {
          $scope.posts = filterFilter(result, {tags : $scope.tag});
        }
      });
  });

//directives -----------------------------------------------------------------------

  timHome.directive('blogPostBeta', function(){
    return {
      restrict : 'E',
      scope : {
        title : '@',
        body : '@',
        date : '@',
        md : '@',
        id : '@',
        tags : '='
      },
      templateUrl : 'partials/bp2.html'
    }
  });

  timHome.directive('tags', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/tags.html'
    };
  });

  timHome.directive('blogPost', function(){
    return {
      restrict : 'E',
      scope : {
        title : '@',
        body : '@',
        date : '@',
        md : '@',
        id : '@',
        tags : '='
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
