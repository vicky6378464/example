'use strict';

angular.module('feeontime')
	.controller('FeePreviewModalInstanceCtrl',
		function($scope, $modalInstance, utilities, feeDescription) {

			if(feeDescription !== null) {
				$scope.info = feeDescription.split('&');	
			} else {
				$scope.info = ["No Preview Available"];
			}

			$scope.close = function() {
	            $modalInstance.dismiss('cancel');
	        };
	});