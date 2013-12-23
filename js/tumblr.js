var app = angular.module('app', [ 'ngSanitize' ]);

function getPost($http){
	this.loadTumblr = function(callback){
		var _api  = "http://api.tumblr.com/v2/",
			_user = "blog/yj-creative.tumblr.com/posts",
			_key  = "?api_key=lHZfs3MnhHSI1QkbaZJWrdrmnjgPwn8zEniLUdBHkfsmTQd7R9",
			_callback = "&callback=JSON_CALLBACK",
			_url  = _api + _user + _key + _callback;

		$http.jsonp(_url)
		.success(function(data){
			callback(data.response);
		});
	};
}


function AppController($scope, $http, $sce){
	$scope.onLoad = function(){
		$scope.posts = [];
		var api = new getPost($http);
		api.loadTumblr(function(data){
			// blog info
			$scope.title = data.blog.title;
			$scope.description = data.blog.description;
			$scope.name  = data.blog.name;

			// blog post
			$scope.posts = data.posts;
			// テキスト部分がタグ入りで入ってくるので処理
			angular.forEach($scope.posts, function(value, key){
				$scope.posts[key].body = $sce.trustAsHtml( value.body );
			});
		});
	};
}
