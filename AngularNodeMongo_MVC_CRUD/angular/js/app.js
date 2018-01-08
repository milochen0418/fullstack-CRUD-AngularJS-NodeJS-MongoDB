var app = angular.module("FormApp", []);
app.controller("FormController", function ($scope, $http) {
	$http.get("/api/form").success(function(response) {
		$scope.forms = response;
	});

	$scope.$on('InvalidateEvent', function(event,args) {
		console.log('InvalidateEvent is received.');
		$http.get("/api/form").success(function(response) {
			$scope.hello = "Hello Test";
			$scope.forms = response;
		});
	});


	$scope.deleteMessage = function(id) {
		console.log('Message Deleted');
		$http.delete('/api/form/'+id).success( function(response) {
			$scope.forms = response;
		});
	};


	$scope.updateMessage = function(id, o) {
		console.log('Message Update');
		$http.put('/api/form/'+id, o ).
		success( function (response) {
			console.log('put successfully');
			$scope.forms = response;
		}).error(function(data) {
			console.error("error in http put");
			console.log(data);
		});
	};

	$scope.updateMessageFormToggle = function(id) {
		//alert("Message Update with id = " + id);
		console.log('Message Update Form Toggle');
		$(function() {
			var selected = '#updateMessage' + id;
			if( $(selected).is(':hidden') ) {
				$(".updateMessageTD").fadeOut(200);
				$(selected).delay(400).fadeIn(400);
			}
			else {
				$(".updateMessageTD").fadeOut(400);
			}
		});
	};
});

app.controller("FormInputController", function ($scope, $http) {
	$scope.createMessage = function () {
		console.log('$scope.formData.name = ' + $scope.formData.name);
		$http.post('/api/form', $scope.formData ).
		success( function (data, status) { 
			console.log('posted successfully');
			console.log('InvalidateEvent is emit.');
			$scope.$parent.$broadcast('InvalidateEvent', [1,2,3]);
		}).error(function(data) {
			console.error("error in posting");
		});
	
		$http.get("/api/form").success(function(response) {
			$scope.LogResult = response;
		});
	};
});





