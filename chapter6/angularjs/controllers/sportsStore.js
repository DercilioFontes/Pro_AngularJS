angular
  .module("sportsStore")
  .constant("dataUrl", "http://localhost:2403/products")
  .constant("orderUrl", "http://localhost:2403/orders")
  .controller("sportsStoreCtrl", function (
    $scope,
    $http,
    $location,
    dataUrl,
    orderUrl,
    cart
  ) {
    $scope.data = {};

    $http.get(dataUrl).then(
      (resp) => ($scope.data.products = resp.data),
      (error) => ($scope.data.error = error.data)
    );

    $scope.sendOrder = function (shippingDetails) {
      const order = angular.copy(shippingDetails);
      order.products = cart.getProducts();

      $http
        .post(orderUrl, order)
        .then(
          (resp) => {
            $scope.data.orderId = resp.data.id;
            cart.getProducts().length = 0;
          },
          (error) => ($scope.data.orderError = error.data)
        )
        .finally(() => $location.path("/complete"));
    };
  });
