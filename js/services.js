angular.module('timHome.services',[])
.factory('PostService', ['GIST_URL', '$http', '$q', 'filterFilter', '$analytics', function(GIST_URL, $http, $q, filterFilter, $analytics){
  var getPosts = function(drafts) {
    return $http.get('/json/posts.json', { cache : true})
    .then(function(result){
      var _posts = result.data;
      var justDrafts = drafts ? true : false;
      var _posts = filterFilter(_posts, {draft : justDrafts});
      return _posts;
    }, function(){console.warn('issue getting posts')});
  };

  var getAllPosts = function(drafts){
    return $q.all([getPosts(drafts), getGists(drafts)]).then(function(results){
      var oldPosts = results[0];
      var newPosts = results[1];
      var allPosts = oldPosts.concat(newPosts);
      return allPosts;
    });
  };

  var getGists = function (drafts){
    var foo;
    return $http.jsonp(GIST_URL+'?callback=JSON_CALLBACK', { cache : true})
                .then(function(result){
                  var gist = result.data.data;
                  var _posts = angular.fromJson(gist.files['config.js'].content);
                  angular.forEach(_posts, function(value, key){
                    //populate the content from the gist object
                    var file = gist.files[value.gistFileName];
                    if(file) {
                      value.mdBody = file.content;
                    } else {
                      console.log(value.gistFileName + " doesn't exist in that gist.");
                      $analytics.eventTrack('misconfigured-file', {  category: 'configuration', label:  value.gistFileName, value: value.gistFileName });
                    }
                  });
                  var justDrafts = drafts ? true : false;
                  var _posts = filterFilter(_posts, {draft : justDrafts});
                  return _posts;
                },function(){
                  console.error('issue getting gists');
                });
  };
  var getNav = function() {
    return $http.get('/json/nav.json', { cache : true})
      .then(function(result){
        return result.data;
      }, function(){console.warn('issue getting nav')});
  };

  return {
    getPosts : getPosts,
    getNav : getNav,
    getGists : getGists,
    getAllPosts : getAllPosts
  };
}]);
