'use strict';

angular.module('resource.services', [])
.factory('resourceService', [ '$http', 'cfgService', '_', '$log', function($http, cfgService, _, $log) {

	var service = {
			resources : [],
			buffer : [],
			roles : []
	};

  /**
   * get all resources
   * @return promise for http get
   */
	service.getAll = function() {
    return $http.get(cfgService.getApiUrl() + '/resources');
	};

  /**
   * load resource by id
   * @return promise for http get
   */
   service.get = function(id) {
     $log.debug('service get resource by id = %s', id);
     return $http.get(API + 'posts/' + id);
   };

   /**
    * load resources by role
    * @return promise for http get
    */
	// service.findByRole = function(role) {
	// 	$log.debug('service load resources by role = %s', role);
	// 	// filter out data and return
	// 	var data = _.filter(service.resources, function(item){
	// 		if(item.role.name == role){
	// 			$log.debug('iter item role.name=' + item.role.name);
	// 			return true;
	// 		}
	// 		return false;
	// 	});
	// 	angular.copy(data, service.buffer);
	// };

  /**
   * create resource
   * @param {Resource} data Resource to save
   * @return promise for http POST
   */
	service.create = function(data) {
		return $http.post(API + 'resources', data);
	};

  /**
   * create resource
   * @param {String} id Resource id to update
   * @param {Resource} data Resource to save
   * @return promise for http POST
   */
	service.update = function(data, id) {
		$log.debug('service PUT resource by id = %s', id);
		return $http.put(API + 'resources/' + id, data);
	};

	service.deleteById = function(id) {
		return $http.delete(API + 'resources/' + id);
	};

	service.sort = function(){
		return _.sortBy(service.resources, 'id');
	};

	return service;
}]);
