'use-strict';

angular.module('feeontime')
	.factory('UserData', ['$cookies', function($cookies) {

			this.userData = {
				id: $cookies.get('user_id'),
				name: $cookies.get('user_name'),
				email: $cookies.get('user_email'),
				number: $cookies.get('user_phone'),
				loginStatus: $cookies.get('loggedin')
			};

			return this;
	}])

	.factory('InstituteData', ['$cookies', function($cookies) {
		
			this.instituteData = {
				
			};

			return this;
	}]);