'use-strict';

angular.module('feeontime')
	.controller('receiptCtrl',
		function($scope, $cookies, $state) {

	  var d = new Date();
      $scope.amount = $cookies.get('cashAmount');
      $scope.date = d.toDateString();
      $scope.name = $cookies.get('name');
      $scope.registration_number = $cookies.get('regNum');
      $scope.institute_name = $cookies.get('institute_name');
      $scope.transaction_id = $cookies.get('manual_txn_id');

		});