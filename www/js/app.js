angular.module('starter', ['ionic',
		'starter.controllers',
		'starter.plaid.service'
])

		.run(function ($ionicPlatform, $rootScope, $ionicScrollDelegate) {
				$ionicPlatform.ready(function () {
						if (window.cordova && window.cordova.plugins.Keyboard) {
								cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
								cordova.plugins.Keyboard.disableScroll(true);
						}
						if (window.StatusBar) {
								StatusBar.styleDefault();
						}
						if (window.navigator.splashscreen) {
								document.addEventListener('deviceready', function () {
										navigator.splashscreen.hide();
								});
						}












				});
		})

		.config(function ($stateProvider, $urlRouterProvider) {
				$stateProvider

						.state('app', {
								url: "/app",
								abstract: true,
								templateUrl: "templates/menu.html",
								controller: 'AppCtrl'
						})


						.state('app.connect', {
								url: "/connect",
								views: {
										'menuContent': {
												templateUrl: "templates/connect.html",
												controller: 'ConnectCtrl'
										}
								}
						})

						.state('app.connect-detail', {
								url: "connect/detail",
								views: {
										'menuContent': {
												templateUrl: "templates/connect-detail.html",
												controller: 'ConnectDetailCtrl'
										}
								}
						})

						.state('app.institutions', {
								url: "/institutions",
								views: {
										'menuContent': {
												templateUrl: "templates/institutions.html",
												controller: 'InstitutionsCtrl'
										}
								}
						})

						.state('app.categories', {
								url: "/categories",
								views: {
										'menuContent': {
												templateUrl: "templates/categories.html",
												controller: 'CategoriesCtrl'
										}
								}
						});


				$urlRouterProvider.otherwise('/app/institutions');
		});
