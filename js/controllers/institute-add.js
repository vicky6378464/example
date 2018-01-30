'use strict';

angular.module('feeontime')
    .controller('ModalAddInstituteCtrl',
     function($scope, $modalInstance, utilities) {

        $scope.addData = {
            'instituteName': '',
            'name': '',
            'email': '',
            'mobile': ''
        };

        $scope.showSuccess = false;
        $scope.showFailure = false;
        $scope.send = function() {
            utilities.newinstitute($scope.addData)
            .success(function(response){
                if(response.success === true) {
                    $scope.showSuccess = true;        
                } else {
                    $scope.showFailure = true;
                }
            });
        };

        /* Dismiss the modal */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    });