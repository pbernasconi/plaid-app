angular.module('starter.plaid.service', [])

  .value('API_URL', "https://tartan.plaid.com")
  .value('plaid_client_id', "test_id")
  .value('plaid_secret', "test_secret")

  .factory('Plaid', function ($http, API_URL, plaid_client_id, plaid_secret) {

    return {

      getInstitutions: function () {
        return $http.get(API_URL + "/institutions");
      },

      getCategories: function () {
        return $http.get(API_URL + "/categories");
      },

      connect: function (type, username, password, pin, options) {
        return $http.post(API_URL + "/connect", {
          client_id: plaid_client_id,
          secret: plaid_secret,
          type: type,
          username: username,
          password: password,
          pin: pin || null,
          options: options || null
        });
      },

      connectStep: function (type, username, password, pin, options) {
        return $http.post(API_URL + "/connect/step", {
          client_id: plaid_client_id,
          secret: plaid_secret,
          type: type,
          username: username,
          password: password,
          pin: pin || null,
          options: options || null
        });
      },

      connectGet: function (type, username, password, pin, options) {
        return $http.post(API_URL + "/connect/get", {
          client_id: plaid_client_id,
          secret: plaid_secret,
          type: type,
          username: username,
          password: password,
          pin: pin || null,
          options: options || null
        });
      },


      balance: function (access_token) {
        return $http.post(API_URL + "/balance", {
          client_id: plaid_client_id,
          secret: plaid_secret,
          access_token: access_token
        });
      },


      upgrade: function (access_token, upgrade_to, options) {
        return $http.post(API_URL + "/upgrade", {
          client_id: plaid_client_id,
          secret: plaid_secret,
          access_token: access_token,
          upgrade_to: upgrade_to,
          options: options
        });
      },


      auth: function () {
        return $http.post(API_URL + "/auth", {
          client_id: plaid_client_id,
          secret: plaid_secret
        });
      }
    }
  })


  .factory('ConnectStore', function () {

    var connectionStore = this.connectionStore = {};

    return {
      save: function (connection) {
        connectionStore = connection;
      },

      get: function () {
        return connectionStore;
      }
    }
  });
