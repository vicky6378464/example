'use strict';

angular
  .module('feeontime', [
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'LocalStorageModule',
    'ngFileUpload',
    'ngMessages'
    ])
  .config(function($stateProvider, $urlRouterProvider, $sceProvider, $uiViewScrollProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })

      .state('receipt', {
        url: '/receipt',
        templateUrl: 'views/receipt.html',
        controller: 'receiptCtrl'
      })

      .state('institute', {
        url: '/institute/:instituteName-:instituteId',
        templateUrl: 'views/institute.html',
        controller: 'instituteCtrl',
		resolve:{
			instituteName: ['$stateParams', function ($stateParams) {
             return $stateParams.instituteName;
         }],
			instituteId: ['$stateParams', function ($stateParams) {
             return $stateParams.instituteId;
         }]
		}
      })

      .state('coupon', {
        url: '/coupons',
        templateUrl: 'views/coupons.html',
        controller: 'couponCtrl'
      })

      .state('paymentmode', {
        url: '/payment',
        templateUrl: 'views/payment.html',
        controller: 'paymentCtrl'
      })

      .state('base', {
        templateUrl: 'views/base.html',
        controller: 'baseCtrl'
      })

      .state('base.benefits', {
        url: '/benefits',
        views: {
          'base-view': {
            templateUrl: 'views/benefits.html'
          }
        }
      })

      .state('base.company', {
        url: '/company',
        views: {
          'base-view': {
            templateUrl: 'views/company.html'
          }
        }
      })

      .state('base.team', {
        url: '/team',
        views: {
          'base-view': {
            templateUrl: 'views/team.html'
          }
        }
      })

      .state('base.disclaimer', {
        url: '/disclaimer',
        views: {
          'base-view': {
            templateUrl: 'views/disclaimer.html'
          }
        }
      })

      .state('base.terms', {
        url: '/terms',
        views: {
          'base-view': {
            templateUrl: 'views/terms.html'
          }
        }
      })

      .state('base.career', {
        url: '/career',
        views: {
          'base-view': {
            templateUrl: 'views/career.html'
          }
        }
      })

      .state('base.policy', {
        url: '/policy',
        views: {
          'base-view': {
            templateUrl: 'views/policy.html'
          }
        }
      })

      .state('base.faq', {
        url: '/faqs',
        views: {
          'base-view': {
            templateUrl: 'views/faq.html'
          }
        }
      })

      .state('base.pickupForm', {
        url: '/cheque',
        views: {
          'base-view': {
            templateUrl: 'views/form.html',
            controller: 'formCtrl'
          }
        }
      })

      .state('base.cashpickupForm', {
        url: '/cash',
        views: {
          'base-view': {
            templateUrl: 'views/cash.html',
            controller: 'formCtrl'
          }
        }
      })

      .state('profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })

      .state('profile.payment', {
        url: '/profile/payment',
        views: {
          'profile-view': {
            templateUrl: 'views/profile-payment.html'
          }
        }
      })

      .state('profile.coupons', {
        url: '/profile/coupons',
        views: {
          'profile-view': {
            templateUrl: 'views/profile-coupon.html'
          }
        }
      })

      .state('profile.history', {
        url: '/profile/history',
        views: {
          'profile-view': {
            templateUrl: 'views/profile-history.html'
          }
        }
      })

      .state('profile.userProfile', {
        url: '/profile/userprofile',
        views: {
          'profile-view': {
            templateUrl: 'views/profile-user-profile.html'
          }
        }
      })

      .state('profile.userSetting', {
        url: '/profile/usersetting',
        views: {
          'profile-view': {
            templateUrl: 'views/profile-user-setting.html'
          }
        }
      })

      .state('mpolicy', {
        url: '/mpolicy',
        templateUrl: 'views/mpolicy.html'
      })

      .state('mabout', {
        url: '/mabout',
        templateUrl: 'views/mabout.html'
      })

      .state('mterms', {
        url: '/mterms',
        templateUrl: 'views/mterms.html'
      })

      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
      });

      $sceProvider.enabled(false);
      $uiViewScrollProvider.useAnchorScroll();

  });
  
  angular.run(run)
  function run(){
	   var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			// Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';
			// At least Safari 3+: "[object HTMLElementConstructor]"
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			// Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
			// Edge 20+
		var isEdge = !isIE && !!window.StyleMedia;
			// Chrome 1+
		var isChrome = !!window.chrome && !!window.chrome.webstore;
			// Blink engine detection
		var isBlink = (isChrome || isOpera) && !!window.CSS;

		var output = 'Detecting browsers by ducktyping:<hr>';
		output += 'isFirefox: ' + isFirefox + '<br>';
		output += 'isChrome: ' + isChrome + '<br>';
		output += 'isSafari: ' + isSafari + '<br>';
		output += 'isOpera: ' + isOpera + '<br>';
		output += 'isIE: ' + isIE + '<br>';
		output += 'isEdge: ' + isEdge + '<br>';
		output += 'isBlink: ' + isBlink + '<br>';
		console.log(output);
  }