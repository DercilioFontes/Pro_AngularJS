angular
  .module("sportsStore")
  .controller("cartSummaryController", function($scope, cart) {
    $scope.cartData = cart.getProducts();

    $scope.total = () =>
      $scope.cartData.reduce(
        (acc, item) => (acc += item.price * item.count),
        0
      );

    $scope.remove = id => cart.removeProduct(id);
  });
