'use strict';
angular.module('timHome.controllers',[])
  .controller('SidebarController', function($mdSidenav, $rootScope, $scope, $http, PostService){
    $scope.toggleSidebar = function() {
      $mdSidenav('left').toggle();
    };

    $scope.switchTheme = function() {
      $rootScope.theme = $rootScope.theme === 'default' ? 'altTheme' : 'default';
    };

    $scope.nav = [];

    var init = function(){
      PostService.getNav().then(function(result){$scope.nav = result;});
    };

    init();
  })
  .controller('DraftController', function($scope, PostService){
  $scope.posts = [];
  PostService.getAllPosts(true).then(function(results){
    if(results) {
    $scope.posts = results;
    $scope.crumbs = [{title: 'Drafts'}];
    console.log($scope.posts);
    } else {
      console.error('issue loading posts');
    }
  })
  })
  .controller('HomeController',function ($scope, $filter, PostService, filterFilter) {
  $scope.posts = [];
  $scope.height = 90;
  $scope.postid = $scope.$stateParams.postid;
  PostService.getAllPosts()
    .then(function(result){
      $scope.posts = result;
      if($scope.postid) {
        for(var index in $scope.posts) {
          var value = $scope.posts[index];
          if(value) {
            if(value.title === $scope.postid) {//exact match (legacy)
              $scope.post = value;
              break;
            } else if(value.id == $scope.postid) { //based on id
              $scope.post = value;
              break;
            } else if(value.title && value.title.replaceAll(" ","_").toLowerCase() === $scope.postid.toLowerCase()) { //perdy url
              $scope.post = value;
              break;
            }
          }
        }
        if(!$scope.post) {
          $scope.post = {title : '404 : not found', body: 'The page you are looking for does not exist, please try <a href="#/">going home</a>.', date: '01-01-1970'};
        }
        $scope.tags = $scope.post.tags;
        $scope.crumbs = [{title: 'Post'}, {title: $scope.post.date}];
      }
    });
  })
  .controller('TagHomeController', function(PostService, $scope){
  $scope.wordz = [];
  $scope.crumbs = [{title: 'tag'}];
  PostService.getAllPosts()
    .then(function(result){
      angular.forEach(result, function(value, key){
        $scope.wordz = $scope.wordz.concat(value.tags);
      });
      $scope.words = $scope.wordz.getUnique();
      var what = 'yep';
    });
  })
  .controller('TagController',function ($scope, PostService, filterFilter) {
  $scope.posts = [];
  $scope.height = 80;
  $scope.tag = $scope.$stateParams.tag;
  $scope.crumbs = [{title: 'tag', url: '#/tag'}];
  PostService.getAllPosts()
    .then(function(result){
      if($scope.tag) {
        $scope.posts = filterFilter(result, {tags : $scope.tag});
        $scope.crumbs.push({title: $scope.tag});
      }
    });
  });
