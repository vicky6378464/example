'use strict';

angular.module('feeontime')
	.controller('OtpModalInstanceCtrl',
		function($scope, $modalInstance, utilities, otpInfo) {

			utilities.call_otp(otpInfo[0], otpInfo[1], otpInfo[2])
            .success(function(response) {
            	if(response.success === true) {
            		// console.log(response.message);
            	}
	        });

			// console.log(otpInfo[0]);

			$scope.verify = function() {
				$scope.otpinvalid = false;
				utilities.verify_otp(otpInfo[0], $scope.otp)
				.success(function(response) {
					if(response.success === true) {
						$modalInstance.close('otp verified');
					} else {
						$scope.otpinvalid = true;
					}
				});
				
			};

			$scope.cancel = function() {
	            $modalInstance.dismiss('cancel');
	        };
	});