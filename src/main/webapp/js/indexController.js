(function() {
	var indexApp = angular.module('indexApp', []);

	indexApp.directive("navHead", function() {
		return {
			restrict : 'E',
			templateUrl : 'navHead.html'
		};
	});
	
	indexApp.directive("navSide", function() {
		return {
			restrict : 'E',
			templateUrl : 'navSide.html'
		};
	});
	
	indexApp.directive("navRightProfile", function() {
		return {
			restrict : 'A',
			templateUrl: 'navRight_profile.html'
		}
	});
})();