  angular.module('timHome', ['ngMaterial',
                                           'ngSanitize',
                                           'ui.router',
                                           'ui.gravatar',
                                           'angulartics',
                                           'angulartics.google.analytics',
                                           'hc.marked',
                                           'angular-jqcloud',
                                           'timHome.services',
                                           'timHome.controllers',
                                           'timHome.directives'])

  .constant('GIST_URL','https://api.github.com/gists/3c23e561a785c1985cb0')
  .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $analyticsProvider) {

  Array.prototype.getUnique = function(){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
       if(u.hasOwnProperty(this[i])) {
          u[this[i]] += 1;
          continue;
       }
       a.push(this[i]);
       u[this[i]] = 1;
    }
    var ret = [];
    for(var j = 0; j < a.length; j++) {
      var obj = {};
      obj.text = a[j];
      obj.link = '#/tag/' + obj.text;
      obj.weight = u[obj.text];
      ret.push(obj);
    }
    return ret;
  }

  String.prototype.replaceAll = function(search, replacement) {
     var target = this;
     return target.split(search).join(replacement);
  };


  $analyticsProvider.firstPageview(true);

  $mdThemingProvider.theme('default')
   .primaryPalette('green')
   .accentPalette('blue')
   .backgroundPalette('grey');

  $mdThemingProvider.theme('altTheme')
   .primaryPalette('orange')
   .accentPalette('amber');

  $mdThemingProvider.alwaysWatchTheme(true);


  $urlRouterProvider.otherwise("/");
  $stateProvider
   .state('home', { url: '/', templateUrl : "partials/home.html", controller : "HomeController"})
   .state('gist', { url: '/drafts', templateUrl : "partials/home.html", controller : "DraftController"})
   .state('home-detail', { url: '/post/:postid', templateUrl : "partials/detail.html", controller : "HomeController"})
   .state('tag-home', { url: '/tag', templateUrl : "partials/tag-home.html", controller : "TagHomeController"})
   .state('tags', { url : '/tag/:tag', templateUrl : "partials/home.html", controller : "TagController"})
   .state('cards', {url : '/cards', templateUrl : "partials/cards.html", controller : "HomeController"});
  })

  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
       $rootScope.theme = 'default';
       $rootScope.$state = $state;
       $rootScope.$stateParams = $stateParams;
    }
  ]);
