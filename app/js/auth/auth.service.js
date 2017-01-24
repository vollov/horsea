'use strict';

angular.module('auth.services', ['cfg'])
.constant('clientToken', 'ocbl-client-token')
.factory('AuthService', [ '$http', 'cfgService', function($http, cfgService) {

	var service = {
			users : [],
			groups : [],
			key: 'user-list',
	};

	service.saveToken = function(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}

	service.getToken = function(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	service.isAuthenticated = function() {
		var authenticated = localStorage.getItem('authenticated');
		if(authenticated)
			return JSON.parse(authenticated);
		else
			return false;
	};

	service.register = function(user) {
		return $http.post(cfgService.getApiUrl() + '/register', user);
	}

	service.login = function(user) {
		return $http.post(cfgService.getApiUrl() + '/login', user);
	};

	service.logout = function() {
		console.log('AuthService.logout()');
		localStorage.removeItem('authenticated');
		localStorage.removeItem('ocbl.user');
	};
	
	return service;
}]);
