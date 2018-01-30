'use strict';

angular.module('feeontime')
    .controller('ModalHelpCtrl',
     function($scope, $modalInstance, utilities, $modal) {

        console.log('help');
        $scope.helpData = {
            'firstname': '',
            'lastname': '',
            'email': '',
            'mobile': '',
            'query': ''
        };

        $scope.formfail = false;
        $scope.send = function() {
            utilities.help($scope.helpData)
            .success(function(response) {
                if(response.success === true) {
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/help-success.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {}
                    });
                    $modalInstance.dismiss('cancel');
                } else {
                    $scope.formfail = true;
                }
            });
        };

        /* Dismiss the modal */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    });