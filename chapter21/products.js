angular
  .module("exampleApp", ["increment", "ngResource"])
  .constant("baseUrl", "http://localhost:2403/products/")
  .controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {
    $scope.displayMode = "list";
    $scope.currentProduct = null;

    const productsResource = $resource(
      baseUrl + ":id",
      { id: "@id" },
      { create: { method: "POST" }, save: { method: "PUT" } }
    );

    $scope.listProducts = function () {
      $scope.products = productsResource.query();
    };

    $scope.deleteProduct = function (product) {
      product.$delete().then(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
      $scope.displayMode = "list";
    };

    function createProduct(product) {
      new productsResource(product).$create().then(function (newProduct) {
        $scope.products.push(newProduct);
        $scope.displayMode = "list";
      });
    }

    function updateProduct(product) {
      product.$save();
      $scope.displayMode = "list";
    }

    $scope.editOrCreateProduct = function (product) {
      $scope.currentProduct = product ? product : {};
      $scope.displayMode = "edit";
    };

    $scope.saveEdit = function (product) {
      if (angular.isDefined(product.id)) {
        updateProduct(product);
      } else {
        createProduct(product);
      }
    };

    $scope.cancelEdit = function () {
      if ($scope.currentProduct && $scope.currentProduct.$get) {
        $scope.currentProduct.$get();
      }
      $scope.currentProduct = {};
      $scope.displayMode = "list";
    };

    $scope.listProducts();
  });
