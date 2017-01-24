'use strict';

angular.module('page.services', ['cfg'])
.factory('PageService', [ '$http', 'cfgService', function($http, cfgService) {

	var service = {
			users : [],
			groups : [],
			key: 'user-list',
	};
	
	service.get = function(name) {
		console.log('PageService.get(' + name + ')');
		return $http.get(cfgService.getApiUrl() + '/page/' + name);
	};
	
	return service;
}]);