'use strict';

angular.module('feeontime')
	.controller('CouponInstanceController',
		function($scope, $modalInstance, index) {

			$scope.index = index;
			console.log(couponSaver);
					if(couponSaver[$scope.index].TYPE === "COUPON") {
                        $scope.data = couponSaver[$scope.index];
						console.log($scope.data);
                        $scope.endDate = couponSaver[$scope.index].END_DATE.split(" ");
                    }  else {
                    	console.log("Error");
                    }

			$scope.loading = false;

			$scope.cancel = function() {
	            $modalInstance.dismiss('cancel');
	        };
	});