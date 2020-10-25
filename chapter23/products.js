"use strict";

angular
  .module("exampleApp", ["increment", "ngResource", "ngRoute", "ngAnimate"])
  .constant("baseUrl", "http://localhost:2403/products/")
  .factory("productsResource", function ($resource, baseUrl) {
    return $resource(
      baseUrl + ":id",
      { id: "@id" },
      { create: { method: "POST" }, save: { method: "PUT" } }
    );
  })
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when("/edit/:id", {
      templateUrl: "/editorView.html",
      controller: "editCtrl",
    });

    $routeProvider.when("/create", {
      templateUrl: "/editorView.html",
      controller: "editCtrl",
    });

    $routeProvider.otherwise({
      templateUrl: "/tableView.html",
      controller: "tableCtrl",
      resolve: {
        data: function (productsResource) {
          return productsResource.query();
        },
      },
    });
  })
  .controller("defaultCtrl", function ($scope, $location, productsResource) {
    $scope.data = {};

    $scope.createProduct = function (product) {
      new productsResource(product).$create().then(function (newProduct) {
        $scope.data.products.push(newProduct);
        $location.path("/list");
      });
    };

    $scope.deleteProduct = function (product) {
      product.$delete().then(function () {
        $scope.data.products.splice($scope.data.products.indexOf(product), 1);
        $location.path("/list");
      });
    };
  })
  .controller("tableCtrl", function ($scope, $route, data) {
    $scope.data.products = data;

    $scope.refreshProducts = function () {
      $route.reload();
    };
  })
  .controller("editCtrl", function ($scope, $routeParams, $location) {
    $scope.currentProduct = null;

    if ($location.path().indexOf("/edit") === 0) {
      const id = $routeParams["id"];
      $scope.currentProduct = $scope.data.products.find((p) => p.id === id);
    }

    $scope.cancelEdit = function () {
      $location.path("/list");
    };

    function updateProduct(product) {
      product.$save();
      $location.path("/list");
    }

    $scope.saveEdit = function (product) {
      if (angular.isDefined(product.id)) {
        updateProduct(product);
      } else {
        $scope.createProduct(product);
      }
      $scope.currentProduct = {};
    };
  });
