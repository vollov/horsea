'use strict';

angular.module('ocblApp', ['ui.router', 'hc.marked', 'auth', 'page'])
.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'views/home.html',
		controller : 'PageCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: false
		}
	})
	.state('rules', {
		url : '/rules',
		templateUrl : 'views/rules.html',
		controller : 'PageCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: false
		}
	})
	.state('terms', {
		url : '/terms',
		templateUrl : 'views/terms.html',
		controller : 'PageCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: false
		}
	})
	.state('privacy', {
		url : '/privacy',
		templateUrl : 'views/privacy.html',
		controller : 'PageCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: false
		}
	})
	.state('contacts', {
		url : '/contacts',
		templateUrl : 'views/contacts.html',
		controller : 'PageCtrl',
		controllerAs: 'vm',
		data:{
			requireLogin: false
		}
	});
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home');
}])
.config(['markedProvider', '$logProvider', 'cfgService', function (markedProvider, $logProvider, cfgService) {

	$logProvider.debugEnabled(cfgService.get('debugEnabled'));
	markedProvider.setOptions({
		gfm: true,
		tables: true
	});
}])
.run(['$rootScope','$state','$http', 'AuthService',function ($rootScope,$state,$http,AuthService) {
	// Update xsrf $http headers to align with Django's defaults
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;
		console.log('state change event, isAuthenticated=%s', AuthService.isAuthenticated());
		// typeof $rootScope.currentUser === 'undefined'
		if (requireLogin && (!AuthService.isAuthenticated())) {
			event.preventDefault();
			// code for unauthorized access
			console.log('state change event -- unauthorized');
			$state.go('login');
		}
	});
}]);
