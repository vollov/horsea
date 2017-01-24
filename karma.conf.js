module.exports = function(config){
	config.set({
		basePath : 'app/',
		frameworks: ['jasmine'],
		browsers : ['Firefox','Chrome'],
		
		files : [
		         'bower_components/angular/angular.js',
		         'bower_components/angular-mocks/angular-mocks.js',
		         'js/auth/auth.service.js',
		         'spec/auth/auth.service.Spec.js'
		         ],
})}
