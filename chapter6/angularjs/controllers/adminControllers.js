angular
  .module("sportsStoreAdmin")
  .constant("authUrl", "http://localhost:2403/users/login")
  .constant("orderUrl", "http://localhost:2403/orders")
  .controller("authCtrl", function ($scope, $http, $location, authUrl) {
    $scope.authenticate = function (user, pass) {
      $http
        .post(
          authUrl,
          {
            username: user,
            password: pass,
          },
          { withCredentials: true }
        )
        .then(
          (resp) => {
            $location.path("/main");
          },
          (error) => {
            $scope.authenticationError = error;
          }
        );
    };
  })
  .controller("mainCtrl", function ($scope) {
    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = (index) => ($scope.current = $scope.screens[index]);
    $scope.getScreen = () =>
      $scope.current === "Products"
        ? "/views/adminProducts"
        : "/views/adminOrders.html";
  })
  .controller("ordersCtrl", function ($scope, $http, orderUrl) {
    $http.get(orderUrl, { withCredentials: true }).then(
      (resp) => {
        $scope.orders = resp.data;
      },
      (error) => {
        $scope.error = error;
      }
    );

    $scope.selectedOrder;

    $scope.selectOrder = (order) => ($scope.selectedOrder = order);

    $scope.calcTotal = order => order.products.reduce(
      (acc, p) => (acc += p.count * p.price),
      0
    );
  });
