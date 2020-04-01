angular
  .module("cart", [])
  .factory("cart", function() {
    const cartData = [];

    return {
      addProduct: function(id, name, price) {
        const product = cartData.find(p => p.id === id);
        if (product) product.count++;
        else cartData.push({ count: 1, id: id, price: price, name: name });
      },
      removeProduct: function(id) {
        const productIndex = cartData.findIndex(p => p.id === id);
        if (productIndex >= 0) cartData.splice(productIndex, 1);
      },
      getProducts: function() {
        return cartData;
      }
    };
  })
  .directive("cartSummary", function(cart) {
    return {
      restrict: "E",
      templateUrl: "components/cart/cartSummary.html",
      controller: function($scope) {
        const cartData = cart.getProducts();

        $scope.total = () =>
          cartData.reduce((acc, e) => (acc += e.price * e.count), 0);

        $scope.itemCount = () =>
          cartData.reduce((acc, e) => (acc += e.count), 0);
      }
    };
  });
