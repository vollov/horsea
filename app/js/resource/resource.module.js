'use strict';

angular.module('resource', ['resource.controllers','ui.router'])
.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('resources-list', {
		url : '/resources',
		templateUrl : 'js/resource/views/list.html',
		controller : 'LoginCtrl',
		controllerAs: 'vm',
		onEnter : [ '$state', 'AuthService', function($state, AuthService) {
			// disable login if user is authenticated
			if (AuthService.isAuthenticated()) {
				$state.go('home');
			}
		} ],
		data:{
			requireLogin: false
		}
	})
	.state('register', {
		url : '/register',
		templateUrl : 'js/auth/views/register.html',
		controller : 'RegisterCtrl',
		controllerAs: 'vm',
		onEnter : [ '$state', 'AuthService', function($state, AuthService) {
			// disable login if user is authenticated
			if (AuthService.isAuthenticated()) {
				$state.go('home');
			}
		} ],
		data:{
			requireLogin: false
		}
	})
	.state('profile', {
		url : '/profile/:username',
		templateUrl : 'js/auth/views/profile.html',
		controller: 'ProfileCtrl',
		controllerAs: 'vm',
		resolve : {
			profile : ['$stateParams',
			function($stateParams) {
				console.log('profile username=' + $stateParams.username);
				return $stateParams.username;

			}]
		},
		data:{
			requireLogin: false
		}
	});

}]);
