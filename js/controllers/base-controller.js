'use-strict';

angular.module('feeontime')
	.controller('baseCtrl',
		function($scope, $modal, utilities, $cookies, $state, UserData) {

            $scope.animationsEnabled = true;
            $scope.userData = {
                userId : $cookies.get('user_id'),
                userName: $cookies.get('user_name'),
                userEmail: $cookies.get('user_email'),
                userPhone: $cookies.get('user_phone'),
                loggedIn: $cookies.get('loggedin')
            };

            /* FOR SEARCH BAR: retrieves a list of all institutes with their type */
            utilities.getInstitutes()
            .success(function(response) {
                $scope.institutes = response.message;
            });

			/* opens up the modal for signIn and signUp */
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
                            userName: $cookies.get('user_name'),
                            userEmail: $cookies.get('user_email'),
                            userPhone: $cookies.get('user_phone'),
                            loggedIn: $cookies.get('loggedin')
                        };

                    });

                }, function() {
                    console.log('on dismiss');
                });

            };

            /* logging out the user */
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

            /* redirects to the user profile */
            // $scope.profile = function() {
            //     $state.transitionTo('profile.payment', {});
            // };

            /* redirects to the particular institute page from search bar */
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

		});