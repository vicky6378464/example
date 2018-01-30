'use strict';

angular.module('feeontime')
.controller('paymentCtrl',
    function($scope, $http, $state, $modal, utilities, $cookies) {

        /* 
         *  need to merge the institute payment form, coupon form and payment selection form data 
         *  in the form of multipart data.
         */

         /* Amount Split For Payu Payments */
         $scope.userData = {
             userId : $cookies.get('user_id'),
             userName: $cookies.get('user_name'),
             userEmail: $cookies.get('user_email'),
             userPhone: $cookies.get('user_phone'),
             loggedIn: $cookies.get('loggedin')
         };
         
		 var jbtcid = 2739;
         var serviceTax = 15;
         var feesAmount = $cookies.get('amount');
         var promo = $cookies.get('promo');
         var promoValue=0;
         var specialDiscount =0;
        if(promo === 'FEE50'){
          promoValue=50;

                    $cookies.put('specialDiscount', 0);
                    $scope.specialDiscount=0;
                    specialDiscount = 0;
                    $scope.dis = $cookies.get('specialDiscount');   
        }else{


                    $cookies.put('specialDiscount', 0);
                    $scope.specialDiscount=0;
                    specialDiscount = 0;
                    $scope.dis = $cookies.get('specialDiscount');   

        }

         $scope.feeAmount = parseInt(feesAmount) + parseInt(promoValue);
         $scope.gateway = $cookies.get('gateway');
         var netBankingCharge = $cookies.get('net_banking_charge');
         var creditCardCharge = $cookies.get('credit_card_charge');
         var debitCardCharge = $cookies.get('debit_card_charge');
         var impsCharge = $cookies.get('imps');
         var emiCharge = $cookies.get('emi');
         var walletCharge = $cookies.get('wallet');
         var cashCharge = $cookies.get('cash_charge');
         var chequeCharge = $cookies.get('cheque_charge');
         var totalAmount = parseFloat(feesAmount);
		     var instituteIDcheck = $cookies.get('institute_id');	
		 
         $scope.totalCoupons = $cookies.get('totalCoupons');
         $scope.institute_name = $cookies.get('institute_name');
         $scope.payment = {
            option: 'NB'
         };

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

         $scope.$watch('payment.option', function(value) { console.log(instituteIDcheck);
            
			
			
			if(value === 'NB') {
               
			   if(parseInt(instituteIDcheck) === parseInt(jbtcid))
			   {
				   var totalAmount = parseFloat(feesAmount);
				   } 
				   
				   else
				   {
					   var totalAmount = parseFloat(feesAmount) + parseFloat(netBankingCharge) + (parseFloat(netBankingCharge) * parseFloat(serviceTax))/100;
				   }
			   
			   $scope.convinienceCharge = netBankingCharge;
               $scope.tax = parseFloat((parseFloat(netBankingCharge) * parseFloat(serviceTax))/100).toFixed(2);
               if($scope.gateway === 'payu') {

                  $scope.action = "http://www.feeontime.com/api/PayUMoney_form.php";
                  $scope.amount = totalAmount;
                  $scope.firstname = $cookies.get('name');
                  $scope.enforce_payment = value;
                  console.log($scope.enforce_payment);
                  // console.log($scope.enforce_payment);
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
             //     $scope.udf5 =  totalAmount-$cookies.get('specialDiscount');
              //    console.log($scope.udf5);
                  $scope.iId = $cookies.get('institute_id');
                  $scope.institute_mid = $cookies.get('institute_mid');
                  
				  if(parseInt(instituteIDcheck) === parseInt(jbtcid))
				  {
				  
				  $scope.institute_value = parseFloat(feesAmount) - parseFloat(netBankingCharge) - (parseFloat(netBankingCharge) * parseFloat(serviceTax))/100;
              $scope.dis = $cookies.get('specialDiscount');
				  }
				  else
				  {
					  $scope.institute_value = parseFloat(feesAmount);
			  $scope.dis = $cookies.get('specialDiscount');
          }
				  $scope.fot_commission = parseFloat(netBankingCharge) + (parseFloat(netBankingCharge) * parseFloat(serviceTax))/100;

                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');
                  $scope.udf1 = JSON.stringify($scope.u);
                  console.log($scope.udf1);

                  $scope.surl = "http://www.feeontime.com/api/index.php/User/paymentsuccess";
                  $scope.furl = "http://www.feeontime.com/api/index.php/User/paymentfailure";

               }else if($scope.gateway === 'hdfc'){


		
                  /* FOR HDFC GATEWAY */

                  console.log('hdfc');
                  $scope.action = "api/hdfcDataForm.php";
                  $scope.amount = totalAmount;
                  $scope.enforce_payment = 'OPTNBK';
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');


		
	
	
	
		} else if($scope.gateway === 'ccavenue') {


                  /* FOR CCAVENUE GATEWAY */

                  console.log('ccavenue');
                  $scope.action = "http://52.36.30.121/api/dataForm.php";
                  $scope.amount = totalAmount;
                  $scope.enforce_payment = 'OPTNBK';
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');


               }else if($scope.gateway==='payzapp'){
				console.log('payzapp');
				$scope.action = "http://52.36.30.121/api/payzappForm.php";

		}


            } else if(value === 'CC') {
               var CCCharge = (parseFloat(creditCardCharge) * parseFloat(feesAmount))/100;
               console.log(CCCharge);
               console.log((parseFloat(serviceTax) * CCCharge)/100);
               
			   if(parseInt(instituteIDcheck) === parseInt(jbtcid))
			   {
				   var totalAmount = parseFloat(feesAmount);
			   }
			   else
			   {
				   
			   var totalAmount = parseFloat(parseFloat(feesAmount) + CCCharge + (parseFloat(serviceTax) * CCCharge)/100).toFixed(2);

			   }
               $scope.convinienceCharge = parseFloat(CCCharge).toFixed(2);
               $scope.tax = parseFloat((parseFloat(serviceTax) * CCCharge)/100).toFixed(2);
               if($scope.gateway === 'payu') {

                  $scope.action = "http://www.feeontime.com/api/PayUMoney_form.php";
                  $scope.amount = totalAmount;
                  $scope.firstname = $cookies.get('name');
                  $scope.enforce_payment = value;
                  console.log($scope.enforce_payment);
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.institute_mid = $cookies.get('institute_mid');
                  if(parseInt(instituteIDcheck) === parseInt(jbtcid))
				  {
				  
				  $scope.institute_value = parseFloat(parseFloat(feesAmount) - CCCharge - (parseFloat(serviceTax) * CCCharge)/100).toFixed(2);
            $scope.dis = $cookies.get('specialDiscount');      
				  }
				  else
				  {
					 $scope.institute_value = parseFloat(feesAmount);
				  $scope.dis = $cookies.get('specialDiscount');
          }
				  $scope.fot_commission = parseFloat(CCCharge + (parseFloat(serviceTax) * CCCharge)/100).toFixed(2);

                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');

                  $scope.surl = "http://www.feeontime.com/api/index.php/User/paymentsuccess";
                  $scope.furl = "http://www.feeontime.com/api/index.php/User/paymentfailure";

               } else if($scope.gateway === 'hdfc'){


		
                  /* FOR HDFC GATEWAY */

                  console.log('hdfc');
                  $scope.action = "/api/hdfcDataForm.php";
                  $scope.amount = totalAmount;
                  $scope.enforce_payment = 'OPTCRDC';
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');


		
	
	
	
		}else if($scope.gateway === 'ccavenue') {


                  /* FOR CCAVENUE GATEWAY */

                  console.log('ccavenue');
                  $scope.action = "http://52.36.30.121/api/dataForm.php";
                  $scope.amount = totalAmount;
                  $scope.enforce_payment = 'OPTCRDC';
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                //  $scope.udf5 = totalAmount -  $cookies.get('specialDiscount');
                  $scope.user_id = $cookies.get('user_id');

//console.log($scope.udf5);

               }
            } else if(value === 'DC') {

                  var DCCharge = (parseFloat(debitCardCharge) * parseFloat(feesAmount))/100;
                  console.log(DCCharge);
                  console.log((parseFloat(serviceTax) * DCCharge)/100);
                 

				 if(parseInt(instituteIDcheck) === parseInt(jbtcid)){
					 
					 var totalAmount = parseFloat(feesAmount);
					 
				 }
				 
				 else{
				 
				 var totalAmount = parseFloat(parseFloat(feesAmount) + DCCharge + (parseFloat(serviceTax) * DCCharge)/100).toFixed(2);

				 }
                  $scope.convinienceCharge = parseFloat(DCCharge).toFixed(2);
                  $scope.tax = parseFloat((parseFloat(serviceTax) * DCCharge)/100).toFixed(2);
                  if($scope.gateway === 'payu') {

                     $scope.action = "http://www.feeontime.com/api/PayUMoney_form.php";
                     $scope.amount = totalAmount;
                     $scope.firstname = $cookies.get('name');
                     $scope.enforce_payment = value;
                     console.log($scope.enforce_payment);
                     $scope.email = $cookies.get('user_email');
                     $scope.phone = $cookies.get('user_phone');
                     $scope.iemail = $cookies.get('iemail');
                     $scope.iphone = $cookies.get('iphone');
                //      $scope.udf5 = totalAmount -  $cookies.get('specialDiscount');
                     $scope.iId = $cookies.get('institute_id');
                  //   console.log($scope.udf5);
                     $scope.institute_mid = $cookies.get('institute_mid');
                     if(parseInt(instituteIDcheck) === parseInt(jbtcid))
				  {
				  
				 $scope.institute_value = parseFloat(parseFloat(feesAmount) - DCCharge - (parseFloat(serviceTax) * DCCharge)/100).toFixed(2);
               
				  }
				  else
				  {
					 $scope.institute_value = parseFloat(feesAmount);
				  $scope.dis = $cookies.get('specialDiscount');
          }
				  $scope.fot_commission = parseFloat(DCCharge + (parseFloat(serviceTax) * DCCharge)/100).toFixed(2);

                     $scope.selectedCoupons = $cookies.get('selectedCoupon');
                     $scope.regNum = $cookies.get('regNum');
                     $scope.user_id = $cookies.get('user_id');

                     $scope.surl = "http://www.feeontime.com/api/index.php/User/paymentsuccess";
                     $scope.furl = "http://www.feeontime.com/api/index.php/User/paymentfailure";

                  }else if($scope.gateway === 'hdfc'){


		
                  /* FOR HDFC GATEWAY */

                  console.log('hdfc');
                  $scope.action = "/api/hdfcDataForm.php";
                  $scope.amount = totalAmount;
                  $scope.enforce_payment = 'OPTDBCRD';
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');
                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');


		
	
	
	
		} else if($scope.gateway === 'ccavenue') {


                     /* FOR CCAVENUE GATEWAY */

                     console.log('ccavenue');
                     $scope.action = "http://52.36.30.121/api/dataForm.php";
                     $scope.amount = totalAmount;
                     $scope.enforce_payment = 'OPTDBCRD';
                     $scope.firstname = $cookies.get('name');
                     $scope.email = $cookies.get('user_email');
                     $scope.phone = $cookies.get('user_phone');
                     $scope.iemail = $cookies.get('iemail');

        //              $scope.udf5 =totalAmount -   $cookies.get('specialDiscount');
        //              console.log($scope.udf5);
                     $scope.iphone = $cookies.get('iphone');
                     $scope.iId = $cookies.get('institute_id');
                     $scope.selectedCoupons = $cookies.get('selectedCoupon');
                     $scope.regNum = $cookies.get('regNum');
                     $scope.user_id = $cookies.get('user_id');


                  }
            } else if(value === 'IMPS') {

                  var IMPSCharge = (parseFloat(impsCharge) * parseFloat(feesAmount))/100;
                  console.log(IMPSCharge);
                  console.log((parseFloat(serviceTax) * IMPSCharge)/100);
                  var totalAmount = parseFloat(parseFloat(feesAmount) + IMPSCharge + (parseFloat(serviceTax) * IMPSCharge)/100).toFixed(2);

                  $scope.convinienceCharge = parseFloat(IMPSCharge).toFixed(2);
                  $scope.tax = parseFloat((parseFloat(serviceTax) * IMPSCharge)/100).toFixed(2);
                  if($scope.gateway === 'ccavenue') {


                     /* FOR CCAVENUE GATEWAY */

                     console.log('ccavenue');
                     $scope.action = "http://52.36.30.121/api/dataForm.php";
                     $scope.amount = totalAmount;
                     $scope.enforce_payment = 'OPTIMPS';
                     $scope.firstname = $cookies.get('name');
                     $scope.email = $cookies.get('user_email');
                     $scope.phone = $cookies.get('user_phone');
                     $scope.iemail = $cookies.get('iemail');
                     $scope.iphone = $cookies.get('iphone');
                     $scope.iId = $cookies.get('institute_id');
                     $scope.selectedCoupons = $cookies.get('selectedCoupon');
                     $scope.regNum = $cookies.get('regNum');

            ///      $scope.udf5 =  totalAmount - $cookies.get('specialDiscount');
             //     console.log($scope.udf5);
                     $scope.user_id = $cookies.get('user_id');


                  } else if($scope.gateway === 'payu') {
                     alert('Option not available');
                  }
            } else if(value === 'MW') {

                  var MWCharge = (parseFloat(walletCharge) * parseFloat(feesAmount))/100;
                  console.log(MWCharge);
                  console.log((parseFloat(serviceTax) * MWCharge)/100);
                  var totalAmount = parseFloat(parseFloat(feesAmount) + MWCharge + (parseFloat(serviceTax) * MWCharge)/100).toFixed(2);

                  $scope.convinienceCharge = parseFloat(MWCharge).toFixed(2);
                  $scope.tax = parseFloat((parseFloat(serviceTax) * MWCharge)/100).toFixed(2);
                  if($scope.gateway === 'ccavenue') {


                     /* FOR CCAVENUE GATEWAY */

                     console.log('ccavenue');
                     $scope.action = "http://52.36.30.121/api/dataForm.php";
                     $scope.amount = totalAmount;
                     $scope.enforce_payment = 'OPTWLT';
                     $scope.firstname = $cookies.get('name');
                     $scope.email = $cookies.get('user_email');
                     $scope.phone = $cookies.get('user_phone');
                     $scope.iemail = $cookies.get('iemail');
                     $scope.iphone = $cookies.get('iphone');
                     $scope.iId = $cookies.get('institute_id');
                     $scope.selectedCoupons = $cookies.get('selectedCoupon');
                     $scope.regNum = $cookies.get('regNum');

               //   $scope.udf5 = totalAmount -  $cookies.get('specialDiscount');
               //   console.log($scope.udf5);
                     $scope.user_id = $cookies.get('user_id');


                  } else if($scope.gateway === 'payu') {
                     alert('Option not available');
                  }
            } else if(value === 'EMI') {

                  var EMICharge = (parseFloat(emiCharge) * parseFloat(feesAmount))/100;
                  console.log(emiCharge);
		  
console.log(feesAmount);
                  console.log((parseFloat(serviceTax) * EMICharge)/100);
                  var totalAmount = parseFloat(parseFloat(feesAmount) + EMICharge + (parseFloat(serviceTax) * EMICharge)/100).toFixed(2);
		  console.log(totalAmount);
                  $scope.convinienceCharge = parseFloat(EMICharge).toFixed(2);
                  $scope.tax = parseFloat((parseFloat(serviceTax) * EMICharge)/100).toFixed(2);
                  if($scope.gateway === 'ccavenue') {


                     /* FOR CCAVENUE GATEWAY */

                     console.log('ccavenue');
                     $scope.action = "http://52.36.30.121/api/dataForm.php";
                     $scope.amount = totalAmount;
                     $scope.enforce_payment = 'OPTEMI';
                     $scope.firstname = $cookies.get('name');
                     $scope.email = $cookies.get('user_email');
                     $scope.phone = $cookies.get('user_phone');
                     $scope.iemail = $cookies.get('iemail');

               //   $scope.udf5 = totalAmount - $cookies.get('specialDiscount');
               //   console.log($scope.udf5);
                     $scope.iphone = $cookies.get('iphone');
                     $scope.iId = $cookies.get('institute_id');
                     $scope.selectedCoupons = $cookies.get('selectedCoupon');
                     $scope.regNum = $cookies.get('regNum');
                     $scope.user_id = $cookies.get('user_id');


                  } else if($scope.gateway === 'payu') {
                     alert('Option not available');
                  }
            } else if(value === 'Cash') {

                  $scope.convinienceCharge = cashCharge;
                  $scope.tax = (parseFloat(serviceTax) * parseFloat(cashCharge))/100;
                  var totalAmount = (parseFloat(feesAmount) + parseFloat(cashCharge) + (parseFloat(serviceTax) * parseFloat(cashCharge))/100).toFixed(2);
                  $scope.amount = totalAmount;
                  $cookies.put('cashAmount', $scope.amount);
                  $scope.action = 'http://www.feeontime.com/#/cash';
            }

            else if(value === 'Cheque') {

                  $scope.convinienceCharge = chequeCharge;
                  $scope.tax = (parseFloat(serviceTax) * parseFloat(chequeCharge))/100;
                  var totalAmount = (parseFloat(feesAmount) + parseFloat(chequeCharge) + (parseFloat(serviceTax) * parseFloat(chequeCharge))/100).toFixed(2);
                  $scope.amount = totalAmount;
                  $cookies.put('cashAmount', $scope.amount);
                  $scope.action = 'http://www.feeontime.com/#/cheque';
            }

            else if(value === 'itzcash') {

                  // Charges 2% + S.T.
                  var ItzcashCharge = (parseFloat(2) * parseFloat(feesAmount))/100;
                  console.log(ItzcashCharge);
                  console.log((parseFloat(serviceTax) * ItzcashCharge)/100);
                  var totalAmount = parseFloat(parseFloat(feesAmount) + ItzcashCharge + (parseFloat(serviceTax) * ItzcashCharge)/100).toFixed(2);

                  $scope.convinienceCharge = parseFloat(ItzcashCharge).toFixed(2);
                  $scope.tax = parseFloat((parseFloat(serviceTax) * ItzcashCharge)/100).toFixed(2);
                  $scope.action = "http://www.feeontime.com/api/itzcash.php";
                  $scope.amount = totalAmount;
                  $scope.firstname = $cookies.get('name');
                  $scope.email = $cookies.get('user_email');
                  $scope.phone = $cookies.get('user_phone');
                  $scope.iemail = $cookies.get('iemail');
                  $scope.iphone = $cookies.get('iphone');

                  $scope.iId = $cookies.get('institute_id');
                  $scope.selectedCoupons = $cookies.get('selectedCoupon');
                  $scope.regNum = $cookies.get('regNum');
                  $scope.user_id = $cookies.get('user_id');
            }


         });


         
});
