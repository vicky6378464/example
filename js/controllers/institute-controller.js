'use strict';

angular.module('feeontime')
    .controller('instituteCtrl',
        function($scope, $stateParams, $state, $modal, utilities, $cookies) {

            $scope.loading = false;
			$scope.institute_name=$stateParams.instituteName;
            $scope.institute_id = $stateParams.instituteId;
            $scope.animationsEnabled = true;

            $cookies.put('regNum', '');
            $cookies.put('name', '');
            $cookies.put('course', '');
            $cookies.put('year', '');
            $cookies.put('class', '');
            $cookies.put('section', '');
            $cookies.put('amount', '');
            $cookies.put('cashAmount', '');

            /* Show details of every instiute by Id. */
            utilities.getInstituteDetail($scope.institute_id)
            .success(function(response) {
                $scope.loading = true;
                if(response.success === true) {
                    $scope.instituteData = response.message;
                    // console.log($scope.instituteData[0].institute_name);
                    $scope.institute_type = response.message[0].institute_type;
                    // console.log($scope.institute_type);
                    $scope.penalty = response.message[0].penalty_type;
                    $cookies.put('institute_name', $scope.instituteData[0].institute_name);
                    $cookies.put('institute_id', $scope.instituteData[0].institute_id);
                    $cookies.put('institute_mid', $scope.instituteData[0].institute_mid);
                    $cookies.put('net_banking_charge', $scope.instituteData[0].net_banking_charge);
                    $cookies.put('credit_card_charge', $scope.instituteData[0].credit_card_charge);
                    $cookies.put('debit_card_charge', $scope.instituteData[0].debit_card_charge);
                    $cookies.put('imps', $scope.instituteData[0].imps);
                    $cookies.put('emi', $scope.instituteData[0].emi);
                    $cookies.put('wallet', $scope.instituteData[0].wallet);
                    $cookies.put('cheque_charge', $scope.instituteData[0].cheque_charge);
                    $cookies.put('cash_charge', $scope.instituteData[0].cash_charge);
                    $cookies.put('penalty_type', $scope.instituteData[0].penalty_type);
                    $cookies.put('gateway', $scope.instituteData[0].gateway);
                    $cookies.put('iemail', $scope.instituteData[0].email_id);
                    $cookies.put('iphone', $scope.instituteData[0].mobile_number);
                } else {
                    console.log(response.message);
                }
            });

            $scope.loading = false;

            /* registration number and form data to be prefilled and carried further to controllers */
            $scope.instiData = {
                regNum: '',
                name: '',
                course: '',
                class: '',
                section: '',
                year: '',
                amount: '',
                fee_description: '',
                total_amount: ''
            };

            $scope.startsWith = function(state, viewValue) {
              var newstate = state.toString();
              // console.log(state);
              return newstate.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
            };

            $scope.sendMail = function() {
                // ngToast.info('Email Sent to : ' + $scope.email.subscribe);
                // API to send email id of subscriber to nishant
                console.log($scope.email.subscribe);
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/subscribe-success.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'size',
                    backdrop: 'static',
                    resolve: {}
                });
            };

            /* Start Of Repetitive Code From Home Controller */

            $scope.userData = {
                userId : $cookies.get('user_id'),
                userName: $cookies.get('user_name'),
                userEmail: $cookies.get('user_email'),
                userPhone: $cookies.get('user_phone'),
                loggedIn: $cookies.get('loggedin')
            };

            $scope.otpInfo = [$scope.userData.userId, $scope.instiData.regNum, $scope.institute_id];
            // console.log($scope.otpInfo);

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

            /* view the profile of user */
            $scope.profile = function() {
                $state.go('profile.payment');
            }

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

            /* End Of Repetitive Code From Home Controller */


            $scope.penalty = $cookies.get('penalty_type');
            $scope.penaltyAmount = parseFloat("0");

            /* registration number validation */
            $scope.check = function() {

                $scope.registrationNumberNotFound = false;
                utilities.validateRegNumber($scope.institute_id, $scope.instiData.regNum)
                .success(function(res) {
                    if(res.success === true) {

                        /*
                        *  check if user is logged in or not
                        *  case 1 : user is logged in - send OTP and open prefilled form
                        *  case 2 : user is not logged in - open signup/signin then send
                        *           OTP and open prefilled form after success.
                        */

                        if($scope.userData.loggedIn){
                            // ngToast.info('OTP Sent!');

                            $scope.otpInfo = [$scope.userData.userId, $scope.instiData.regNum, $scope.institute_id];

                            var modalInstance = $modal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: 'views/otp-modal-template.html',
                                controller: 'OtpModalInstanceCtrl',
                                size: 'size',
                                backdrop: 'static',
                                resolve: {
                                    otpInfo : function() {
                                        return $scope.otpInfo;
                                    }
                                }
                            });

                            modalInstance.result.then(function(response) {
                                // console.log(response);
                                $scope.instiData = {
                                    regNum: res.message.registration_number,
                                    name: res.message.name,
                                    course: res.message.course,
                                    class: res.message.class,
                                    section: res.message.section,
                                    year: res.message.year,
                                    amount: res.message.amount,
                                    fee_description: res.message.fee_description,
                                    total_amount: parseFloat(parseFloat(res.message.amount) + parseFloat($scope.penaltyAmount)).toFixed(2)
                                };

                            }, function(){
                                console.log('on dismiss');
                            });

                        } else if(!$scope.userData.loggedIn) {

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
                                        userName: $cookies.get('user_name'),
                                        userEmail: $cookies.get('user_email'),
                                        userPhone: $cookies.get('user_phone'),
                                        loggedIn: $cookies.get('loggedin')
                                    };

                                });

                                $scope.otpInfo = [$scope.userData.userId, $scope.instiData.regNum, $scope.institute_id];

                                var modalInstance = $modal.open({
                                    animation: $scope.animationsEnabled,
                                    templateUrl: 'views/otp-modal-template.html',
                                    controller: 'OtpModalInstanceCtrl',
                                    size: 'size',
                                    backdrop: 'static',
                                    resolve: {
                                        otpInfo : function() {
                                            return $scope.otpInfo;
                                        }
                                    }
                                });

                                modalInstance.result.then(function(response) {
                                    $scope.instiData = {
                                        regNum: res.message.registration_number,
                                        name: res.message.name,
                                        course: res.message.course,
                                        year: res.message.year,
                                        class: res.message.class,
                                        section: res.message.section,
                                        amount: res.message.amount,
                                        fee_description: res.message.fee_description,
                                        total_amount: parseFloat(parseFloat(res.message.amount) + parseFloat($scope.penaltyAmount)).toFixed(2)
                                    };

                                }, function(){
                                    console.log('on dismiss');
                                });

                            }, function() {
                                console.log('dismissed!! Now back to institute controller');
                            });
                        }

                        $scope.calculatingPenalty = false;
                        if($scope.penalty === '1') {
                            $scope.calculatingPenalty = true;
                            utilities.calculatePenaltyPerday($scope.institute_id, $scope.instiData.regNum)
                            .success(function(response) {
                                $scope.penaltyAmount = response.message;
                            });
                        } else if($scope.penalty === '2') {
                            $scope.calculatingPenalty = true;
                            utilities.calculatePenaltyFixed($scope.institute_id, $scope.instiData.regNum)
                            .success(function(response) {
                                $scope.penaltyAmount = response.message;
                            });
                        } else if ($scope.penalty === '3') {
                            $scope.calculatingPenalty = true;
                            utilities.calculatePenaltyFixedPerday($scope.institute_id, $scope.instiData.regNum)
                            .success(function(response) {
                                $scope.penaltyAmount = response.message;
                            });
                        } else {
                            $scope.penaltyAmount = parseFloat("0");
                        }
                        $scope.calculatingPenalty = false;


                    } else {

                        /* registration number not found */
                        $scope.registrationNumberNotFound = true;
                        $scope.instiData = {
                            regNum: '',
                            name: '',
                            course: '',
                            class: '',
                            section: '',
                            year: '',
                            amount: '',
                            fee_description: '',
                            total_amount: ''
                        };
                    }
                });
            };




$scope.flag=0;
     $scope.promoApply = function(y) {
			
//console.log($scope.instiData.promo); 
	$scope.x="FEE50";
    if($scope.instiData.total_amount<50 ){
        if(y==1)
        document.getElementById("abcd1").innerHTML="Please enter a valid amount";

else if(y==2)
    document.getElementById("abcd2").innerHTML="Please enter a valid amount";


else if(y==3)
    document.getElementById("abcd3").innerHTML="Please enter a valid amount";

else if(y==4)
    document.getElementById("abcd4").innerHTML="Please enter a valid amount";

else if(y==5)
    document.getElementById("abcd5").innerHTML="Please enter a valid amount";

else if(y==6)
    document.getElementById("abcd6").innerHTML="Please enter a valid amount";

    


    }else if($scope.institute_id==4 || $scope.institute_id==164 || $scope.institute_id==623 || $scope.institute_id==1839 ){

    		console.log("YOLO");
    		$scope.x="NOT VALID";
    		$scope.instiData.promo="NO";

    		 if(y==1)
        document.getElementById("abcd1").innerHTML="Coupon Expired";
        
        else if(y==2)
        document.getElementById("abcd2").innerHTML="Coupon Expired";

        else if(y==3)
        document.getElementById("abcd3").innerHTML="Coupon Expired";

        else if(y==4)
        document.getElementById("abcd4").innerHTML="Coupon Expired";

        else if(y==5)
        document.getElementById("abcd5").innerHTML="Coupon Expired";

        else if(y==6)
        document.getElementById("abcd6").innerHTML="Coupon Expired";
    }
    else{


	if($scope.x===$scope.instiData.promo && $scope.flag==0  ){
/*    $scope.instiData.total_amount-=50;

        if(y==1)
        document.getElementById("abcd1").innerHTML="Coupon Applied";
        
        else if(y==2)
        document.getElementById("abcd2").innerHTML="Coupon Applied";

        else if(y==3)
        document.getElementById("abcd3").innerHTML="Coupon Applied";

        else if(y==4)
        document.getElementById("abcd4").innerHTML="Coupon Applied";

        else if(y==5)
        document.getElementById("abcd5").innerHTML="Coupon Applied";

        else if(y==6)
        document.getElementById("abcd6").innerHTML="Coupon Applied";

        
$scope.flag=1;
*/
        
    		 if(y==1)
        document.getElementById("abcd1").innerHTML="Coupon Expired";
        
        else if(y==2)
        document.getElementById("abcd2").innerHTML="Coupon Expired";

        else if(y==3)
        document.getElementById("abcd3").innerHTML="Coupon Expired";

        else if(y==4)
        document.getElementById("abcd4").innerHTML="Coupon Expired";

        else if(y==5)
        document.getElementById("abcd5").innerHTML="Coupon Expired";

        else if(y==6)
        document.getElementById("abcd6").innerHTML="Coupon Expired";
    }else if($scope.flag==1 && $scope.x===$scope.instiData.promo){

    }else if($scope.flag==1){

        if(y==1)
        document.getElementById("abcd1").innerHTML="Wrong Coupon Applied ";

 else if(y==2)
        document.getElementById("abcd2").innerHTML="Wrong Coupon Applied ";

 else if(y==3)
        document.getElementById("abcd3").innerHTML="Wrong Coupon Applied ";

 else if(y==4)
        document.getElementById("abcd4").innerHTML="Wrong Coupon Applied ";

 else if(y==5)
        document.getElementById("abcd5").innerHTML="Wrong Coupon Applied ";

 else if(y==6)
        document.getElementById("abcd6").innerHTML="Wrong Coupon Applied ";
$scope.instiData.total_amount+=50;
$scope.flag=0;
    }
        else{
if(y==1)
        document.getElementById("abcd1").innerHTML="Wrong Coupon Applied ";

 else if(y==2)
        document.getElementById("abcd2").innerHTML="Wrong Coupon Applied ";

 else if(y==3)
        document.getElementById("abcd3").innerHTML="Wrong Coupon Applied ";

 else if(y==4)
        document.getElementById("abcd4").innerHTML="Wrong Coupon Applied ";

 else if(y==5)
        document.getElementById("abcd5").innerHTML="Wrong Coupon Applied ";

 else if(y==6)
        document.getElementById("abcd6").innerHTML="Wrong Coupon Applied ";

        }

}
}

            $scope.proceedToCoupon = function() {
                if($scope.instiData.regNum && $scope.instiData.total_amount) {
                    $state.transitionTo('coupon', {});
                    $cookies.put('regNum', $scope.instiData.regNum);
                    $cookies.put('name', $scope.instiData.name);
                    $cookies.put('course', $scope.instiData.course);
                    $cookies.put('year', $scope.instiData.year);
                    $cookies.put('class', $scope.instiData.class);
                    $cookies.put('section', $scope.instiData.section);
                    $cookies.put('promo', $scope.instiData.promo);
                    $cookies.put('amount', $scope.instiData.total_amount);
                } else {
                    $scope.errorMessageCloseCollege = "* Please fill in the required fields.";
                }
            };

            $scope.previewFees = function() {
                if($scope.instiData.regNum && $scope.instiData.amount) {
                    console.log($scope.instiData.fee_description);
                    var modalInstance = $modal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/feepreview-modal-template.html',
                        controller: 'FeePreviewModalInstanceCtrl',
                        size: 'size',
                        backdrop: 'static',
                        resolve: {
                            feeDescription : function() {
                                return $scope.instiData.fee_description;
                            }
                        }
                    });
                } else {
                    alert('Please fill in the required details first');
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
