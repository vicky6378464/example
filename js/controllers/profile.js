'use strict';
angular.module('feeontime')
	.controller('profileCtrl',
		function($scope, $cookies, $state, utilities, Upload, $timeout, $modal) {

			$scope.editMode = false;

			$scope.userData = {
                userId : $cookies.get('user_id'),
                userName: $cookies.get('user_name'),
                userEmail: $cookies.get('user_email'),
                userPhone: $cookies.get('user_phone'),
                loggedIn: $cookies.get('loggedin')
            };

            // console.log($scope.userData);

            /* FOR SEARCH BAR: retrieves a list of all institutes with their type */
            utilities.getInstitutes()
            .success(function(response) {
                $scope.institutes = response.message;
            });

			$scope.user_id = $cookies.get('user_id');

			$scope.searchInstitute = function() {
                if($scope.instituteSelected.institute_id === undefined) {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/institute-not-found.html',
                        controller: 'ModalAddInstituteCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                } else {
                    $state.transitionTo('institute', {instituteId:$scope.instituteSelected.institute_id});
                }
            };

            $scope.gotoInstitute = function(instituteid) {
            	console.log(instituteid);
                if(instituteid === undefined || instituteid === '') {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/institute-not-found.html',
                        controller: 'ModalAddInstituteCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                } else {
                    $state.transitionTo('institute', {instituteId:instituteid});
                }
            };

            $scope.logout = function() {
                utilities.logout()
                .success(function(response) {
                    if(response.success === true) {
                        $cookies.put('user_id', '');
                        $cookies.put('user_name', '');
                        $cookies.put('user_email', '');
                        $cookies.put('user_phone', '');
                        $cookies.put('loggedin', '');
                        $scope.userData = {
                            userId : $cookies.put('user_id', ''),
                            userName: $cookies.put('user_name', ''),
                            userEmail: $cookies.put('user_email', ''),
                            userPhone: $cookies.put('user_phone', ''),
                            loggedIn: $cookies.put('loggedin', '')
                        };
                        $state.go('home');
                    }
                });
            };

			utilities.getUserDetail($scope.user_id)
			.success(function(response) {
				$scope.profile_pic = response.message.profile;
				// $scope.name = response.message.username;
				// $scope.number = response.message.user_number;
				// $scope.email = response.message.user_email;
				// console.log(response.message);
			});

			$scope.getPayment = function() {
				utilities.getDistinctStudents($scope.user_id)
				.success(function(response) {
					if(response.success === true) {
						$scope.distinctData = response.message;
						// console.log(response.message);
						$scope.schoolFiltered = [];
						$scope.collegeFiltered = [];
						$scope.coachingFiltered = [];
						for(var i =0; i < $scope.distinctData.length; i++) {
							var item = $scope.distinctData[i];
							if($scope.distinctData[i].institute_category === 'school') {
								$scope.schoolFiltered.push(item);
							} else if($scope.distinctData[i].institute_category === 'college') {
								$scope.collegeFiltered.push(item);
							} else if($scope.distinctData[i].institute_category === 'coaching') {
								$scope.coachingFiltered.push(item);
							}
						}
					} else {
						console.log('no response');
					}
				});
			};

			$scope.startsWith = function(state, viewValue) {
              var newstate = state.toString();
              // console.log(state);
              return newstate.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
            };

			$scope.getCoupons = function() {
				utilities.showTxnHistory($scope.user_id)
				.success(function(response) {
					if(response.success === true) {
						$scope.transactionData = response.message;
						$scope.userCoupons = [];
						for(var i = 0; i < $scope.transactionData.length; i++) {
							if($scope.transactionData[i].coupons) {
								var result = $scope.transactionData[i].coupons;
								var modifiedResult = result.split(",");
								$scope.userCoupons = $scope.userCoupons.concat(modifiedResult);
							}
						}
					}
				});

				utilities.getCoupons()
				.success(function(response) {
					if(response.Error === "success") {
						$scope.myCoupons = [];
						for(var i = 0; i<response.Data.length; i++) {
							for(var j = 0; j<$scope.userCoupons.length; j++) {
								if(response.Data[i].ID === $scope.userCoupons[j]) {
									$scope.myCoupons = $scope.myCoupons.concat(response.Data[i]);
								}
							}
						}
					}
				});
			};

			$scope.txnHistory = function() {
				utilities.showTxnHistory($scope.user_id)
				.success(function(response) {
					if(response.success === true) {
						$scope.txnData = response.message;
						// console.log($scope.txnData);
					}
				});
			};

			$scope.edit = function() {
				$scope.editMode = true;
			};

			$scope.update = function() {
				utilities.updateUserDetail($scope.userData.userId, $scope.userData.userName, $scope.userData.userPhone)
				.success(function(response) {
					if(response.success === true) {
						$cookies.put('user_name', $scope.userData.userName);
						$cookies.put('user_phone', $scope.userData.userPhone);
						// ngToast.info('Profile Updated');
					} else {
						alert(response.message);
						// ngToast.info('Some Error Occurred. Please Try Again!');
					}
				});
				$scope.editMode = false;
			};

			$scope.cancelEdit = function() {
				$scope.editMode = false;	
			};

			$scope.uploadFiles = function(file, errFiles) {
				$scope.f = file;
				$scope.errFile = errFiles && errFiles[0];
				if(file) {
					file.upload = Upload.upload({
						url: 'http://52.41.82.157/Feeontime/index.php/Service/uploadOthers',
						data: {profile: file}
					});

					file.upload.success(function(response) {
						$timeout(function() {
							file.result = response.message;
							 ngToast.info('Profile Picture Updated!');
						});
						console.log(response.message);
						$scope.profile_pic = response.message;
					}, function(response) {
						if(response.success === false)
							$scope.errorMsg = response.success + ': ' + response.message;
							ngToast.info('Some Error Occurred. Please Try Again!');
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					});
				}
			};

			$scope.previewFees = function(data) {
	            console.log('fee preview');
	            var modalInstance = $modal.open({
	                animation: $scope.animationsEnabled,
	                templateUrl: 'views/feereceipt .html',
	                // controller: 'FeePreviewModalInstanceCtrl',
	                size: 'size',
	                backdrop: 'static',
	                resolve: {
	                    feeDescription : function() {
	                        return data;
	                    }
	                }
	            });
            };

            	

			$scope.modalHelp = function() {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/modal-help.html',
                    controller: 'ModalHelpCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });
            };

	})
	.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        };
    });