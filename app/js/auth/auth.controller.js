'use strict';

angular.module('auth.controllers', ['auth.services'])
.controller('NavCtrl', ['$state','AuthService',function($state, AuthService){
	var vm = this;
	
	vm.isAuthenticated = function(){
		var res = AuthService.isAuthenticated();
		console.log('NavCtrl.isAuthenticated() res =' + res);
		return res;
	}
	
	vm.user = AuthService.getToken('ocbl.user');
	
	vm.logout = function(){
		console.log('NavCtrl.logout()');
		AuthService.logout();
		$state.go('home');
	}
}])
.controller('ProfileCtrl', ['AuthService','profile', function(AuthService, profile){
	var vm = this;
	vm.profile = profile;
	//activate();
	
	// initialize the user when loading
	function activate(){
		vm.user = AuthService.getToken('ocbl.user');
		console.log('get returned user from localstorage, vm.user=%j', vm.user);
	}
}])
.controller('RegisterCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	//vm.user = {};
	
	vm.register = function() {
		return AuthService.register(vm.user).then(registerSuccessFn, registerErrorFn);

		function registerSuccessFn(data, status, headers, config) {
			// if return data have user, set token to true.
			var user = data.data;
			console.log('get returned data from register(), data=%j', user);
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', user);
			$state.go('profile', {'username': user.username});
		}

		function registerErrorFn(data, status, headers, config) {
			console.error('register failure!');
		}
	};
}])
.controller('LoginCtrl', ['$state', 'AuthService',
function($state, AuthService) {
	var vm = this;
	vm.user = {};

	vm.login = function(){
		console.log('in LoginCtrl.login() user = {0}', vm.user.username);
		AuthService.login(vm.user).then(loginSuccessFn, loginErrorFn);
		
		function loginSuccessFn(data, status, headers, config) {
			var user = data.data;
			console.log('get returned data from login(), data=%j', user);
			
			AuthService.saveToken('authenticated', true);
			AuthService.saveToken('ocbl.user', user);
			$state.go('profile',{'username': user.username});
		}

		function loginErrorFn(data, status, headers, config) {
			vm.error = data.data;
			
			console.error('login failure! data={0}',data);
		}
	}
}]);
