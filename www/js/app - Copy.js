(function(){

	var app = angular.module('starter', ['ionic']);
	
	
	app.config(function($stateProvider, $urlRouterProvider){

		console.log('2');
		$stateProvider.state('list', {
			url: '/list',
			templateUrl: 'templates/login.html',
			cache: false,
			controller: 'AppCtrl1'
		});
		$stateProvider.state('companylist', {
			url: '/companylist',
			templateUrl: 'templates/clist.html',
			cache: false,
			controller: 'clistCtrl'
		});
		console.log('3');
		$stateProvider.state('menu', {
			url: '/menu',
			templateUrl: 'templates/pg2.html',
			controller: 'MenuCtrl'
		});
		$stateProvider.state('student1', {
			url: '/student',
			templateUrl: 'templates/pg3.html',
			controller: 'SCtrl'
		});
		$stateProvider.state('company1', {
			url: '/company',
			templateUrl: 'templates/company.html',
			controller: 'CCtrl'
		});
		$urlRouterProvider.otherwise('/list');
	});
//Manages first page Enter button.
	
	app.controller('AppCtrl1', function($scope, $ionicPopup, $http,$state,$stateParams){
			$scope.login=function(user){
					$state.go('menu');

			}
	});
//manages 2nd page -student and company button event.

	app.controller('MenuCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('INNNNNNNNNNNN');
		$scope.stap=function(){
			console.log('Innnnnnn student');
			$state.go('student1');
		}
		$scope.ctap=function(){
			console.log('Innnnnnn company');
			$state.go('company1');
		}		
	});
	
//manages 3rd page where student gives all details and login page
	
	app.controller('SCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('INNNNNNNNNNNN');
		//Register student.
		$scope.register=function(student){
			console.log(student);
			if(student==undefined || student.name==undefined ||student.college==undefined || student.stream==undefined || student.sem==undefined || student.email==undefined || student.phone==undefined || student.username==undefined || student.password==undefined){
					$ionicPopup.alert({
						title:'Fill all fields',
					});
			}else{
					$http.post('http://localhost:8000/stureg',student).then(function(response){
						console.log("student added");
						var alertPopup=$ionicPopup.alert({
							title:'Student Added Successfully',
							template:'please click ok'
						});
						alertPopup.then(function(res){
							console.log('thank u for adding student');
						});
					});
			}
		};
		//login student.
		$scope.login=function(user){
				console.log(user);
				console.log(user);
				$http.post('http://localhost:8000/studentlogin',user).then(function(response){
					console.log(response);
					console.log(response.data.length);
					if(response.data.length>0)
					{
					$scope.user="";
					$state.go('companylist');
					}else{
						var alertPopup=$ionicPopup.alert({
							title:'wrong Input',
							//template:'Re-input OK'
						});
						alertPopup.then(function(res){
							console.log('Proper Input ');
						})
					}
				});
		}
		
	});			
	
//manages 3rd page where company gives register details.
	app.controller('CCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('INNNNNNNNNNNN');
		$scope.register=function(company){
			$http.post('http://localhost:8000/comreg',company).then(function(response){
					console.log("company added");
					var alertPopup=$ionicPopup.alert({
						title:'Company Added Successfully',
						template:'Please click ok'
					});
					alertPopup.then(function(res){
						console.log('thank u for adding company');
					});
			});
		};
	});
	
	app.controller('clistCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		
	});
	
	
	app.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the
				keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
}());
