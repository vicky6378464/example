'use strict';

angular.module('feeontime')

    .service('utilities', ['$http', function($http) {

        var utilities = this;

        /* user logout utility */
        utilities.logout = function() {
            return $http({
                        method : 'GET',
                        url : 'http://www.feeontime.com/api/index.php/User/logout/',
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        /* user login utility */
        utilities.login = function(data) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/login/',
                        //$.param is a jquery function used to implement POST request in angularJS.
                        data : $.param(data),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        /* get user detail */
        utilities.getUserDetail = function(id) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/detail/' + id,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        /* register a new user */
        utilities.registerUser = function(data) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/register/',
                        data : $.param(data),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.getInstituteDetail = function(id) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/detail/' + id,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.validateRegNumber = function(institute_id, reg_number) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/validate_registration_number/' + institute_id,
                        data : $.param({'registration_number' : reg_number}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.getCoupons = function() {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/coupon',
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.getInstitutes = function() {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/search_institutes',
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.call_otp = function(user_id, registration_number, institute_id) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/call_otp/' + user_id,
                        data : $.param({'registration_number' : registration_number, 'institute_id' : institute_id}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.verify_otp = function(user_id, otp) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/verify_otp/' + user_id,
                        data : $.param({'otp' : otp}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        utilities.getDistinctStudents = function(user_id) {
            return $http({
                        method: 'GET',
                        url: 'http://www.feeontime.com/api/index.php/User/distinctStudent/' + user_id,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        utilities.showTxnHistory = function(user_id) {
            return $http({
                        method: 'GET',
                        url: 'http://www.feeontime.com/api/index.php/User/showTxnHistory/' + user_id,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        utilities.calculatePenaltyFixed = function(institute_id, registration_number) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/penalty_fixed/' + institute_id,
                        data : $.param({'registration_number' : registration_number}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}         
                    });
        };

        utilities.calculatePenaltyPerday = function(institute_id, registration_number) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/penalty_per_day/' + institute_id,
                        data : $.param({'registration_number' : registration_number}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}         
                    });
        };

        utilities.calculatePenaltyFixedPerday = function(institute_id, registration_number) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/Institute/penalty_fixed_perday/' + institute_id,
                        data : $.param({'registration_number' : registration_number}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}         
                    });
        };

        utilities.updateUserDetail = function(user_id, username, number) {
            return $http({
                        method : 'POST',
                        url : 'http://www.feeontime.com/api/index.php/User/edit/' + user_id,
                        data : $.param({'username' : username, 'user_number' : number}),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}         
                    });
        };

        utilities.manualPayment = function(data) {
            return $http({
                    method: 'POST',
                    url: 'http://www.feeontime.com/api/index.php/User/addPickup',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
        };

        utilities.help = function(data) {
            return $http({
                    method: 'POST',
                    url: 'http://www.feeontime.com/api/index.php/Admin/helpEmail',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
        };

        utilities.sms = function(msg, number) {
            return $http({
                    method: 'POST',
                    url: 'http://www.feeontime.com/api/index.php/User/sms',
                    data: $.param({'msg': msg, 'number': number}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
        };

        utilities.resetPass = function(data) {
            return $http({
                    method: 'POST',
                    url: 'http://www.feeontime.com/api/index.php/User/forgotPassword',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
                });
        };

        utilities.subscribe = function(email) {
            return $http({
                    method: 'POST',
                    url: 'http://www.feeontime.com/api/index.php/Admin/subscribeEmail',
                    data: $.param({'email': email}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
                });
        };

        utilities.newinstitute = function(data) {
            return $http({
                method: 'POST',
                url: 'http://www.feeontime.com/api/index.php/Admin/addnstitute',
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        return utilities;
        
    }]);