'use strict';
angular.module('feeontime')
    .controller('homeCtrl',
        function(
            $scope,
            $modal,
            utilities,
            $state,
            $cookies,
            $window
        ) {

            $scope.loading = false;
            $scope.animationsEnabled = true;
            $scope.userData = {
                userId : $cookies.get('user_id'),
                userName: $cookies.get('user_name'),
                userEmail: $cookies.get('user_email'),
                userPhone: $cookies.get('user_phone'),
                loggedIn: $cookies.get('loggedin')
            };

            $scope.$watch(function(){
               return $window.innerWidth;
            }, function(value) {
                console.log(value);
               if(parseInt(value) < 600) {
                    var size = 'sm';
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/poppop.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
                        backdrop: 'static',
                        resolve: {}
                    });
               }
           });

            /* retrieves a list of all institutes with their type */
            utilities.getInstitutes()
            .success(function(response) {
                $scope.loading = true;
                $scope.institutes = response.message;
                $scope.institutenames = response.message.institute_name;
            });

            $scope.loading = false;

            /* open up the login modal */
            $scope.open = function(size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/login.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });
                modalInstance.result.then(function(id) {
                    
                    console.log(id);
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
                            userName: $cookies.get('user_name'),
                            userEmail: $cookies.get('user_email'),
                            userPhone: $cookies.get('user_phone'),
                            loggedIn: $cookies.get('loggedin')
                        };
                        // ngToast.info('Successfully logged in!');
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
                    }
                    // ngToast.info('Successfully logged out!');
                });
            };

            /* view the profile of user */
            $scope.profile = function() {
                $state.go('profile.payment');
            };

            /* redirects to the institute page from search bar */
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
                    $state.transitionTo('institute', {instituteId:$scope.instituteSelected.institute_id,instituteName:$scope.instituteSelected.institute_name.replace(/ /g,"-")});
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

            $scope.addInstitute = function() {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/add-institute.html',
                    controller: 'ModalAddInstituteCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });
            };

            $scope.startsWith = function(state, viewValue) {
              var newstate = state.toString();
              // console.log(state);
              return newstate.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
            };

            $scope.sendApplink = function() {
                var msg = 'Now Pay Fees on the Go and Earn cashbacks, offers and coupons. Download your FeeonTime App here https:\/\/goo.gl\/WCu9wO';
                utilities.sms(msg, $scope.smsnumber)
                .success(function(response) {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/sms-success.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                })
                .error(function(reason) {
                    alert(reason);
                });
            };

              $scope.open = function() {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/modal-template.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });
                modalInstance.result.then(function(id) {
                    console.log(id);
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
                            userName: $cookies.get('user_name'),
                            userEmail: $cookies.get('user_email'),
                            userPhone: $cookies.get('user_phone'),
                            loggedIn: $cookies.get('loggedin')
                        };
                      ngToast.info('Successfully logged in!');
                    });

                }, function() {
                    console.log('on dismiss');
                });
            };

            $scope.email = {
                'subscribe' : ''
            };

            $scope.sendMail = function() {
                // ngToast.info('Email Sent to : ' + $scope.email.subscribe);
                // API to send email id of subscriber to nishant
                console.log($scope.email.subscribe);
                utilities.subscribe($scope.email.subscribe)
                .success(function(response) {
                    if(response.success === true) {
                        var modalInstance = $modal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'views/subscribe-success.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'size',
                            backdrop: 'static',
                            resolve: {}
                        });
                    }
                });
            };

    });