'use strict';

angular.module('page.controllers', ['page.services'])
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
}]);