angular
  .module("sportsStoreAdmin")
  .constant("productUrl", "http://localhost:2403/products/")
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  })
  .controller("productCtrl", function ($scope, $resource, productUrl) {
    $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });

    $scope.listProducts = () =>
      ($scope.products = $scope.productsResource.query());

    $scope.deleteProduct = (product) =>
      product
        .$delete()
        .then(() =>
          $scope.products.splice($scope.products.indexOf(product), 1)
        );

    $scope.createProduct = (product) =>
      new $scope.productsResource(product).$save().then((newProduct) => {
        $scope.products.push(newProduct);
        $scope.editedProduct = null;
      });

    $scope.updateProduct = (product) => {
      product.$save();
      $scope.editedProduct = null;
    };

    $scope.startEdit = (product) => ($scope.editedProduct = product);

    $scope.cancelEdit = () => ($scope.editedProduct = null);

    $scope.listProducts();
  });
