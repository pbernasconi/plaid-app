angular.module('starter.controllers', [])

		.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
				// Form data for the login modal
				$scope.loginData = {};

				// Create the login modal that we will use later
				$ionicModal.fromTemplateUrl('templates/login.html', {
						scope: $scope
				}).then(function (modal) {
						$scope.modal = modal;
				});

				// Triggered in the login modal to close it
				$scope.closeLogin = function () {
						$scope.modal.hide();
				};

				// Open the login modal
				$scope.login = function () {
						$scope.modal.show();
				};

				// Perform the login action when the user submits the login form
				$scope.doLogin = function () {
						console.log('Doing login', $scope.loginData);

						// Simulate a login delay. Remove this and replace with your login
						// code if using a login system
						$timeout(function () {
								$scope.closeLogin();
						}, 1000);
				};
		})


		.controller('InstitutionsCtrl', function ($scope, $stateParams, $ionicScrollDelegate, Plaid) {






				$scope.searchInput = "";
				var searchInputEle = angular.element(document.getElementsByClassName('search-input'));

				$scope.scrollTop = function () {
						$ionicScrollDelegate.scrollTop(true);
						searchInputEle[0].focus();
				};

				$scope.clearInput = function () {
						$scope.searchInput = "";
				};

				Plaid.getInstitutions().then(function (result) {
						$scope.institutions = result.data || noop;
				}, function (error) {
						console.error(error);
				});

		})


		.controller('CategoriesCtrl', function ($scope, $rootScope, $stateParams, $timeout, $ionicScrollDelegate, Plaid) {

				$scope.searchInput = "";
				$scope.slideHeader = false;
				$scope.slideHeaderPrevious = 0;

				var searchInputEle = angular.element(document.getElementsByClassName('search-input'));

				$scope.scrollTop = function () {
						$ionicScrollDelegate.scrollTop(true);
						searchInputEle[0].focus();
				};

				$scope.clearInput = function () {
						$scope.searchInput = "";
				};


				// get All institutions
				Plaid.getCategories().then(function (result) {
						$scope.categories = result.data;
				}, function (error) {
						console.error(error);
				})

		})


		.controller('ConnectCtrl', function ($scope, $state, $stateParams, Plaid, ConnectStore) {

				$scope.user = {
						type: '',
						name: 'Plaid Test',
						username: 'plaid_test',
						email: 'pl@i.d',
						password: 'plaid_good'
				};


				// get All institutions
				Plaid.getInstitutions().then(function (result) {
						$scope.institutions = result.data;
						//console.log(result.data);
				}, function (error) {
						console.error(error);
				});

				$scope.connect = function (user) {

						Plaid.connect(user.type, user.username, user.password).then(function (result) {
								console.log(result);

								if (result.status == 200) {
										ConnectStore.save(result.data);
										$state.go('app.connect-detail');
								}

								if (result.status == 201) {
										alert("MFA required");
								}

						}, function (error) {
								alert("There was an error connecting\n ERROR: " + error.data.message + '\n RESOLVE: ' + error.data.resolve);
						});
				};

		})


		.controller('ConnectDetailCtrl', function ($scope, $state, $stateParams, Plaid, ConnectStore) {


				$scope.connection = ConnectStore.get();

				console.log($scope.connection);

		});