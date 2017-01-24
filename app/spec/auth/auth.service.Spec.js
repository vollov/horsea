'use strict';

describe('Test AuthService', function() {
	
	var authService, $http;
	
	beforeEach(module('auth.services'));
	beforeEach(inject(function(_AuthService_,_$http_) {
		authService = _AuthService_;
		$http = _$http_;
	}));
	
	it('localstorage should be able to store a token', function() {
		
		authService.saveToken('authenticated', true);
		
		var res = authService.getToken('authenticated');
		expect(res).toBe(true);
	});
	
	it('isAuthenticated should be true after save token', function() {
		
		authService.saveToken('authenticated', true);
		
		var res = authService.isAuthenticated();
		expect(res).toBe(true);
	});
	
	it('isAuthenticated should be false after logout', function() {
		
		authService.logout();
		
		var res = authService.isAuthenticated();
		expect(res).toBe(false);
	});
});