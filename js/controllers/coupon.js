'use-strict';

angular.module('feeontime')
    .controller('couponCtrl',
        function($scope, $http, $modal, utilities, $cookies, $state) {

            /* 
             *  need to merge the institute payment form, coupon form and payment selection form data 
             *  in the form of multipart data.
             */
            $scope.userData = {
                userId : $cookies.get('user_id'),
                userName: $cookies.get('user_name'),
                userEmail: $cookies.get('user_email'),
                userPhone: $cookies.get('user_phone'),
                loggedIn: $cookies.get('loggedin')
            };

            $scope.notLoading = true;
            $scope.animationsEnabled = true;
            $scope.totalCoupons = 0;
            $scope.amount = $cookies.get('amount');
            $scope.couponStored = true;
            $scope.institute_name = $cookies.get('institute_name');
            $scope.couponSelected = 0;
			couponSaver=[];
            $scope.categories = [
                {'name': 'ALL'},
                {'name': 'Travel'},
                {'name': 'Kids, Babies and Toys'},
                {'name': 'Home Furnishing & Decor'},
                {'name': 'Automotive'},
                {'name': 'Electronics'},
                {'name': 'Flower, Gifts and Jewellery'},
                {'name': 'Accessories'},
                {'name': 'Fashion'},
                {'name': 'Computer and laptops'},
                {'name': 'Mobile and Tablets'},
                {'name': 'Recharge'},
                {'name': 'Fun and Entertainment'},
                {'name': 'Footwear'},
                {'name': 'Watches'},
                {'name': 'Books and Stationary'}
            ];

            /* retrieves a list of all institutes with their type */
            utilities.getInstitutes()
            .success(function(response) {
                $scope.institutes = response.message;
            });

            $scope.loginModal = function(size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/modal-template.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });

                modalInstance.result.then(function(id) {
                    
                    $cookies.put('user_id', id);
                    $scope.userData = {
                        userId : $cookies.get('user_id')
                    };
                    /* fetch all the user detail for the given user id */
                    utilities.getUserDetail($scope.userData.userId)
                    .success(function(response) {
                        $cookies.put('user_name', response.message.username);
                        $cookies.put('user_email', response.message.user_email);
                        $cookies.put('user_phone', response.message.user_number);
                        $cookies.put('loggedin', 'true');
                        $scope.userData = {
                            userId : $cookies.get('user_id'),
                            userId : $cookies.get('user_id'),
                            userName: $cookies.get('user_name'),
                            userEmail: $cookies.get('user_email'),
                            userPhone: $cookies.get('user_phone'),
                            loggedIn: $cookies.get('loggedin')
                        };
                        // ngToast.info('Successfully loggen in!');
                    });

                }, function() {
                    console.log('on dismiss');
                });

            };

            /* called on logout */
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
                    // ngToast.info('Successfully logged out!');
                });
            };

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



            $scope.filterCoupon = function(index) {
                $scope.couponSelected = index;
                console.log($scope.couponSelected);
                utilities.getCoupons()
                .success(function(response) {
                    $scope.notLoading = false;
                    if(response.Error === "success") {
                        $scope.data = [];
                        if($scope.couponSelected === 0) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].STORE_NAME !== "Paytm") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 1) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Travel") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 2) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Kids, Babies and Toys") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 3) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Home Furnishing & Decor") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 4) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Automotive") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 5) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Electronics") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 6) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Flower, Gifts and Jewellery") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 7) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Accessories") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 8) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Fashion") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 9) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Computer and laptops") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 10) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Mobile and Tablets") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 11) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Recharge") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 12) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Fun and Entertainment") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 13) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Footwear") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 14) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Watches") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        } else if($scope.couponSelected === 15) {
                            for(var i=0; i<response.Data.length; i++) {
                                if(response.Data[i].CATEGORY_NAME === "Books and Stationary") {
                                    $scope.data = $scope.data.concat(response.Data[i]);
                                }
                            }
                        }
                        console.log($scope.data);
						couponSaver=$scope.data;
						console.log(couponSaver);
                    } else {
                        console.log("coupons not found");
                    }
                });
                $scope.notLoading = true;
            };

            /* Coupon selection */
            $scope.selectedCoupon = [];
            $scope.isSelected = [];
            $scope.select = function($index) {
                $scope.couponStored = false;
                $scope.isSelected[$index] = true;
                utilities.getCoupons()
                .success(function(response) {
                    if(response.Error === "success") {
                        $scope.selectedCoupon = $scope.selectedCoupon.concat(response.Data[$index].ID);
                    }
                    $scope.totalCoupons = $scope.selectedCoupon.length;
                    $cookies.put('selectedCoupon', $scope.selectedCoupon);
                    $cookies.put('totalCoupons', $scope.totalCoupons);
                    // console.log($scope.selectedCoupon);
                    $scope.couponStored = true;
                });
            };

            $scope.deselect = function($index) {
                $scope.couponStored = false;
                $scope.isSelected[$index] = false;
                utilities.getCoupons()
                .success(function(response) {
                    if(response.Error === "success") {
                        var a = $scope.selectedCoupon.indexOf(response.Data[$index].ID);
                        $scope.selectedCoupon.splice(a, 1);
                    }
                    $scope.isSelected[$index] = false;
                    $scope.totalCoupons = $scope.selectedCoupon.length;
                    $cookies.put('selectedCoupon', $scope.selectedCoupon);
                    $cookies.put('totalCoupons', $scope.totalCoupons);
                    console.log($scope.selectedCoupon);
                    $scope.couponStored = true;
                });
            };

            $scope.showCoupon = function($index, size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/coupon-modal.html',
                    controller: 'CouponInstanceController',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {
                        index: function() {
                            return $index;
                        }
                    }
                });
				
            };

            $scope.proceedToPayment = function() {
                if($scope.userData.loggedIn) {
                    $state.go('paymentmode');
                } else {
                    var modalInstance = $modal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'views/modal-template.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'size',
                            backdrop: 'static',
                            resolve: {}
                        });

                        modalInstance.result.then(function(id) {
                            
                            $cookies.put('user_id', id);
                            $scope.userData = {
                                userId : $cookies.get('user_id')
                            };
                            /* fetch all the user detail for the given user id */
                            utilities.getUserDetail($scope.userData.userId)
                            .success(function(response) {
                                $cookies.put('user_name', response.message.username);
                                $cookies.put('user_email', response.message.user_email);
                                $cookies.put('user_phone', response.message.user_number);
                                $cookies.put('loggedin', 'true');
                                $scope.userData = {
                                    userId : $cookies.get('user_id'),
                                    userId : $cookies.get('user_id'),
                                    userName: $cookies.get('user_name'),
                                    userEmail: $cookies.get('user_email'),
                                    userPhone: $cookies.get('user_phone'),
                                    loggedIn: $cookies.get('loggedin')
                                };
                                console.log($scope.userData);

                            });

                        }, function() {
                            console.log('on dismiss');
                        });
                }
            };
    });