'use strict';

angular.module('feeontime')
    .controller('ModalInstanceCtrl',
     function($scope, $modalInstance, utilities, $modal) {

        /* login data from modal form */
        $scope.loginDetails = {};

        /* signup data from modal form */
        $scope.signupDetails = {};

        /* Login function which sends back user_id to the controller on successfull login */
        $scope.login = function() {

            $scope.loginfail = false;
            utilities.login($scope.loginDetails)
            .success(function(response) {
                if(response.success === true) {
                    /* sends back user_id on successful login */
                    $modalInstance.close(response.message.user_id);
                } else {
                    $scope.loginfail = true;
                }
            });
        };

        /* Registration for new users */
        $scope.signup = function() {
  
            utilities.registerUser($scope.signupDetails)
            .success(function(response) {
                if(response.success === true) {
                    console.log(response.message);
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/signup-success.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                    $modalInstance.dismiss('cancel');
                } else {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/signup-failure.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                    $modalInstance.dismiss('cancel');
                }
            });
        };

        /* Dismiss the modal */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.reset = {
            'user_email': ''
        };
        $scope.forgot = false;
        $scope.reset = function() {
            $scope.forgot = true;
        };

        $scope.sendEmail = function() {
            utilities.resetPass($scope.reset)
            .success(function(response) {
                if(response.success === true) {
                    $modalInstance.dismiss('cancel');
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/forgot-success.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                } else if(response.success === false) {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/forgot-failure.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                }
            });
        };

    })

    .directive('confirmPwd', function($interpolate, $parse) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModelCtrl) {

          var pwdToMatch = $parse(attr.confirmPwd);
          var pwdFn = $interpolate(attr.confirmPwd)(scope);

          scope.$watch(pwdFn, function(newVal) {
              ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
          });

          ngModelCtrl.$validators.password = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return value == pwdToMatch(scope);
          };

        }
      };
    });