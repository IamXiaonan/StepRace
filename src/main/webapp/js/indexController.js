(function() {
	var indexApp = angular.module('indexApp', []);
	indexApp.value('accessTokenValue','');

	indexApp.controller('accessToken', ['accessTokenValue', function(accessTokenValue) {
		var accessToken = null;
		var returnURL = window.location.href;
		var codeVarChar = returnURL.indexOf('code=') + 5;
		var successVarChar = returnURL.indexOf('#');
		var auCode = returnURL.substring(codeVarChar, successVarChar);
		var requestPayload = {
			'grant_type' : 'authorization_code',
			'client_id' : '227KTY',
			'redirect_uri' : fbRedirectURL,
			'code' : auCode
		};
		$.ajax({
			'url' : fbAccessTokenURL,
			'type' : 'POST',
			'Content-Type' : 'application/x-www-form-urlencoded',
			'dataType' : 'json',
			'headers' : {
				'Authorization' : 'Basic '
						+ 'MjI3S1RZOjQyYWUyZGVmMDZjZjc2MTQyNzM2NGI4MTc2ZjI2ZjI4'
			},
			'data' : requestPayload,
			'success' : function(result) {
				// Process success actions
				accessTokenValue = result.access_token;
				dataLoadWithUrl(accessTokenValue, fbLeaderBoardJSONURL);
				dataLoadWithUrl(accessTokenValue, fbActivityGoalJSONURL);
			},
			'error' : function(XMLHttpRequest, textStatus, errorThrown) {
				// Process error actions
				alert('Error: ' + errorThrown);
				console
						.log(XMLHttpRequest.status + ' '
								+ XMLHttpRequest.statusText);
			}
		});
		return {
			accessToken: accessTokenValue
		};
	}]);

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
	
	function dataLoadWithUrl(accessTokenValue, url){
		$.ajax({
			'url' : url,
			'type' : 'GET',
			'content-Type' : 'x-www-form-urlencoded',
			'dataType' : 'json',
			'headers' : {
				'Authorization' : 'Bearer ' + accessTokenValue
			},
			'success' : function(result) {
				// Process success actions
				var resultJSON = JSON.stringify(result);
				switch(url){
				case fbLeaderBoardJSONURL:
					loadFriendsList(resultJSON);
					break;
				case fbActivityGoalJSONURL:
					
				}
				
			},
			'error' : function(XMLHttpRequest, textStatus, errorThrown) {
				// Process error actions
				alert('Error: ' + errorThrown);
				console
						.log(XMLHttpRequest.status + ' '
								+ XMLHttpRequest.statusText);
				return false;
			}
		});
	}
	
	function loadFriendsList(friendsJSON){
		var friendsTable = $('#friendsTable').DataTable({
			ordering: false,
			columns: [
			          	{	title: "Rank"},
			          	{
			          		title: "Profile",
			          		render: function(data, type, row) {
			    		        return '<img src="'+data+'" class="img-circle" width=50 height=50/>';
			    		    }},
			            {	title: "Friend"},
			            {	title: "Steps"}
			        ]
		});
		var friendsList = JSON.parse(friendsJSON);
		for(var i = 0; i < friendsList.friends.length; i++){
			friendsTable.row.add([
			                      friendsList.friends[i].rank.steps,
			                      friendsList.friends[i].user.avatar,
			                      friendsList.friends[i].user.displayName, 
			                      friendsList.friends[i].average.steps
			                      ]).draw(false);
		}
	}
})();