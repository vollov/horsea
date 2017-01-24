'use strict';

angular.module('page', ['page.controllers','ui.router']);
//.config(['$stateProvider',function($stateProvider) {
////	$stateProvider.state('login', {
////		url : '/login',
////		templateUrl : 'js/auth/views/login.html',
////		controller : 'LoginCtrl',
////		controllerAs: 'vm',
////		onEnter : [ '$state', 'AuthService', function($state, AuthService) {
////			// disable login if user is authenticated
////			if (AuthService.isAuthenticated()) {
////				$state.go('home');
////			}
////		} ],
////		data:{
////			requireLogin: false
////		}
////	});
//
//}]);