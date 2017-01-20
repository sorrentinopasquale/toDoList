angular.module("myApp", ['ngCookies']);
var myApp = angular.module("myApp");

myApp.controller('loginController', ['$scope', '$rootScope', '$cookies', 'LoginServices',
function($scope, $rootScope, $cookies, LoginServices) {

	//check if there's a cookie and AUTO-LOGIN to the toDoList
	$scope.checkUser = function() {
		var user = ($cookies.get('user'));
		if (user) {
			user = JSON.parse(user);
		}
		if (user && user.username) {
			window.location.href = "./toDoList.htm";
		}
	};

	//check every time you go in the page
	$scope.init = function() {
		$scope.checkUser();
	}

	$scope.init();
	//for the spinner
	$scope.dataLoading = false;

	$scope.login = function() {
		//call my angular service for the login
		LoginServices.Login($scope.username, $scope.password, function(response) {
			if (response.success) {
				LoginServices.SetCredentials($scope.username, $scope.password);
				$scope.error = "";
				$scope.checkUser();
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		});
	};
}]);
 

myApp.controller('welcomeController', ['$scope', '$rootScope', '$cookies', 'LoginServices',
function($scope, $rootScope, $cookies, LoginServices) {
	//start with 1 list
	$scope.messages = [];
	$scope.messages[1] = [];
	$scope.lists = [{
		"id" : "1",
		"messages" : $scope.messages[1]
	}];
	$scope.nList = 1;

	var user = $cookies.user;
	if (user) {
		user = JSON.parse(user);
	}
	if (user && user.username) {
		$scope.username = user.username;
	} else {
		window.location.href = "./index.htm";
	}
	$scope.logout = function() {
		LoginServices.ClearCredentials();
		 
	};

	$scope.addToList = function(listElement, ID) {
		if (!$scope.messages[ID]) {
			$scope.messages[ID] = [];
		}
		$scope.messages[ID].push({
			"text" : listElement
		});
	};
	$scope.addNewList = function() {
		$scope.nList++;
		$scope.lists.push({
			"id" : $scope.nList,
			"messages" : $scope.messages[($scope.nList++)]
		});
	};
	$scope.removeCurrentList = function(list) {
		var currentID = list.id;
		for (var i in $scope.lists) {
			if ($scope.lists[i].id == currentID) {
				var founded = i;
			}
		}
		$scope.lists.splice(founded, 1);
	};
}]);

