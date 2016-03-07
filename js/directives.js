angular.module('timHome.directives',[])
  .directive('blogPost', function(){
    return {
      restrict : 'E',
      scope : {
        title : '@',
        body : '@',
        mdBody : '@',
        date : '@',
        md : '@',
        id : '@',
        tags : '='
      },
      templateUrl : 'partials/bp.html'
    }
  })

  .directive('tags', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/tags.html'
    };
  })

  .directive('breadcrumbs', function(){
    return {
      restrict : 'E',
      templateUrl : 'partials/breadcrumbs.html',
      scope : {
        crumbs : '='
      }
    }
  })
