'use strict';

angular.module('feeontime')
	.controller('formCtrl',
		function($scope, $modal, utilities, $cookies, $state) {

      /* hsteps for time pickup */        
      $scope.hstep = 1;
      $scope.mstep = 1;

      /* setting am or pm in timepicker */
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $scope.name = $cookies.get('name');
      $scope.registration_number = $cookies.get('regNum');
      $scope.email = $cookies.get('user_email');
      $scope.instituteId = $cookies.get('institute_id');
      $scope.cashAmount = $cookies.get('cashAmount');
      $scope.user_id = $cookies.get('user_id');
      $scope.selected_coupons = $cookies.get('selectedCoupon');

      $scope.formDataCash = {
        'amount': $scope.cashAmount,
        'mode': 'cash',
        'name': $scope.name,
        'mobile': '',
        'date': '',
        'time': '',
        'address': '',
        'zip': '',
        'state': '',
        'city': '',
        'registration_number': $scope.registration_number,
        'user_email': $scope.email,
        'institute_id': $scope.instituteId,
        'selected_coupons': $scope.selected_coupons,
        'user_id': $scope.user_id
      };

      $scope.submitFormCash = function() {
        $scope.cashresult = '';
        utilities.manualPayment($scope.formDataCash)
        .success(function(response) {
            if(response.success === true) {
                $state.go('receipt');
            } else {
              $scope.cashresult = "*Some Error Occured. Please try again.";
            }
        });
      };

      $scope.formDataCheque = {
        'amount': $scope.cashAmount,
        'mode': 'cheque',
        'name': $scope.name,
        'mobile': '',
        'date': '',
        'time': '',
        'address': '',
        'zip': '',
        'state': '',
        'city': '',
        'registration_number': $scope.registration_number,
        'user_email': $scope.email,
        'institute_id': $scope.instituteId,
        'selected_coupons': $scope.selected_coupons,
        'user_id': $scope.user_id
      };

      $scope.submitFormCheque = function() {
        $scope.chequeresult = '';
        utilities.manualPayment($scope.formDataCheque)
        .success(function(response) {
            if(response.success === true) {
                $cookies.put('manual_txn_id', response.message.txnid);
                console.log(response.message.txnid);
                $state.go('receipt');
            } else {
              $scope.chequeresult = "*Some Error Occured. Please try again.";
            }
        });
      };

		});