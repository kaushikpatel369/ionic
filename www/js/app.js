(function(){

	var app = angular.module('starter', ['ionic']);
	
	app.service('sp', function () {
        var property = 'First';
		var paper;
		console.log('inside service');
        return {
            getProperty: function () {
                return paper;
            },
            setProperty: function(pcode) {
				paper=pcode;
				console.log(paper);
            }
        };
    });
	
	app.config(function($stateProvider, $urlRouterProvider){
		
		$stateProvider.state('list', {
			url: '/list',
			
			templateUrl: 'templates/login.html',
			cache: false,
			controller: 'AppCtrl1'
		});
		
		console.log('3');
		$stateProvider.state('menu', {
			url: '/menu',
			templateUrl: 'templates/pg2.html',
			controller: 'menuCtrl'
		});
		
		$stateProvider.state('student1', {
			url: '/studentLogin',
			templateUrl: 'templates/pg3.html',
			controller: 's1Ctrl'
		});
		
		$stateProvider.state('student2', {
			url: '/studentRegistration',
			templateUrl: 'templates/pg4.html',
			controller: 's2Ctrl'
		});
		
		$stateProvider.state('company1', {
			url: '/companyLogin',
			templateUrl: 'templates/pg5.html',
			controller: 'c1Ctrl'
		});
		
		$stateProvider.state('company2', {
			url: '/companyRegistration',
			templateUrl: 'templates/pg6.html',
			controller: 'c2Ctrl'
		});
		$stateProvider.state('companylist', {
			url: '/companylist',
			templateUrl: 'templates/clist.html',
			cache: false,
			controller: 'clistCtrl'
		});
		$stateProvider.state('listcompany', {
			url: '/listcompany',
			templateUrl: 'templates/listcompany.html',
			cache: false,
			controller: 'listcompanyCtrl'
		});
		
		console.log('4');
			

		$urlRouterProvider.otherwise('/list');
	});
	


	
	
	
	
	app.controller('AppCtrl1', function($scope, $ionicPopup, $http,$state,$stateParams){
			$scope.login=function(user){
				$state.go('menu');
			}	
	});



	app.controller('menuCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('INNNNNNNNNNNN Student');
		$scope.stud=function(){
			console.log("In student");
			$state.go('student1');
		}
		$scope.comp=function(){
			console.log('Innnnnnn Company');
			$state.go('company1');
		}
			
	});
	
	
	
	app.controller('s1Ctrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log(' student for Registration');
		//login student.
		$scope.login=function(user){
				console.log(user);
				console.log(user);
				$http.post('/studentlogin',user).then(function(response){
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
		$scope.sLogin=function(){
			console.log("In student");
			$state.go('student2');
		}		
	});
	
	app.controller('s2Ctrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log('return to student login');
		//new student register.
		$scope.signup=function(data){
			console.log(data);
			if(data==undefined || data.name==undefined || data.college==undefined || data.stream==undefined || data.sem==undefined || data.phone==undefined || data.username==undefined || data.password==undefined){
					$ionicPopup.alert({
						title:'Fill all fields',
					});
			}else{
					$http.post('/stureg',data).then(function(response){
						console.log("student added");
						var alertPopup=$ionicPopup.alert({
							title:'Student Added Successfully!',
							template:'Now Login with Mobile no & Password... '
						});
						alertPopup.then(function(res){
							console.log('thank u for adding student');
							$state.go('student1');
						});
					});
			}
		};
		$scope.sReturn=function(){
			console.log("In student");
			$state.go('student1');
		}	
	});
	
	app.controller('c1Ctrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log(' Company for login');
		//company login
		$scope.login=function(user){
				console.log(user);
				console.log(user);
				$http.post('/companylogin',user).then(function(response){
					console.log(response);
					console.log(response.data.length);
					if(response.data.length>0)
					{
					$scope.user="";
					$state.go('listcompany');
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
		$scope.cLogin=function(){
			console.log("In company");
			$state.go('company2');
		}
	});
	
	app.controller('c2Ctrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		console.log(' Company for Registration');
		$scope.cReturn=function(){
			console.log("In company");
			$state.go('company1');
		}
		//new company register.
		$scope.signup=function(data){
			console.log(data);
			if(data==undefined || data.cname==undefined || data.userid==undefined || data.phone==undefined || data.password==undefined || data.address==undefined){
					$ionicPopup.alert({
						title:'Fill all fields',
					});
			}else{
					$http.post('/comreg',data).then(function(response){
						console.log("company added");
						var alertPopup=$ionicPopup.alert({
							title:'company Added Successfully',
							template:'please click ok'
						});
						alertPopup.then(function(res){
							console.log('thank u for adding company');
						});
					});
			}
		};
		
	});
	
    app.controller('clistCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		
	});
	
	 app.controller('listcompanyCtrl', function($scope, $stateParams, $http, $state,$ionicPopup){
		
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