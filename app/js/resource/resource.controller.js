'use strict';

angular.module('resource.controllers', ['resource.services'])
.controller('PageCtrl', ['$state','$stateParams','PageService',function($state, $stateParams, PageService){
	var vm = this;

	var currentState = $state.current.name;
	console.log('PageCtrl currentState=' + currentState);
	activate(currentState);

	// initialize objects in view when loading
	function activate(state){
		console.log('PageCtrl.activate() get page name=' + state);
		vm.state = state;
		return PageService.get(state).then(getSuccessFn, getErrorFn);

		function getSuccessFn(data, status, headers, config) {
			// parse the block from page object
			var page = data.data;
			vm.blocks = _.indexBy(page.blocks, 'code');

//			console.log('get returned data from get(), page=%j', vm.blocks);
//			console.log('get=%j', vm.blocks['home_about']['content']);
		}

		function getErrorFn(data, status, headers, config) {
			//TODO show 500 page
			console.error('PageCtrl.activate() get page failure!');
		}

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
}]);
