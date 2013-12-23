var app = angular.module('app', [ 'ngSanitize' ]);

function getPost($http){
	this.loadTumblr = function(callback){
		var _api  = "http://api.tumblr.com/v2/",
			_user = "blog/yj-creative.tumblr.com/posts",
			_key  = "?api_key=X7ezD7uWgkAh3rNmbM34E9qPo98XKOF3pN8vb9teRMebhmog2L",
			_callback = "&callback=JSON_CALLBACK",
			_url  = _api + _user + _key + _callback;

		$http.jsonp(_url)
		.success(function(response){
			callback(response.response);
		});
	};
}


function AppController($scope, $http, $sce){
	$scope.onLoad = function(){
		$scope.posts = [];
		var api = new getPost($http);
		api.loadTumblr(function(response){
			// blog info
			$scope.title = response.blog.title;
			$scope.description = response.blog.description;
			$scope.name  = response.blog.name;

			// blog post
			$scope.posts = response.posts;
			// テキスト部分がタグ入りで入ってくるので処理
			angular.forEach($scope.posts, function(value, key){
				$scope.posts[key].body = $sce.trustAsHtml( value.body );
			});
		});
	};

	$scope.openBody = function(e){
		e.preventDefault();
		return 'on';
	};
}
