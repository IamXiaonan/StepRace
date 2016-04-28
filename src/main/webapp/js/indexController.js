(function() {
	var indexApp = angular.module('indexApp', []);
	
	indexApp.controller('accessToken', function($scope, $http) {
		var returnURL = window.location.href;
		var codeVarChar = returnURL.indexOf('code=') + 5;
		var successVarChar = returnURL.indexOf('#success');
		var auCode = returnURL.substring(codeVarChar, successVarChar);
		var requestPayload = {
			'grant_type' : 'authorization_code',
			'client_id' : '227KTY',
			'redirect_uri' : 'http://localhost:8080/LearnAngular/pages/index.html',
			'code' : auCode
		}
	    $http({
	        method : 'POST',
	        url : 'https://api.fitbit.com/oauth2/token'
	    }).then(function success(response) {
	        alert(response.data);
	    }, function myError(response) {
	        alert(response.statusText);
	    });
	});

	indexApp.directive('navHead', function() {
		return {
			restrict : 'E',
			templateUrl : 'navHead.html'
		};
	});
	
	indexApp.directive('navSide', function() {
		return {
			restrict : 'E',
			templateUrl : 'navSide.html'
		};
	});
	
	indexApp.directive('indexPage', function() {
		return {
			restrict : 'A',
			templateUrl : 'indexPage.html'
		};
	});
})();