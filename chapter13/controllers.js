$(document).ready(function () {
  $("#jqui button")
    .button()
    .click(function (e) {
      angular.element(angularRegion).scope().$apply("handleClick()");
    });
});

const app = angular.module("exampleApp", []);

app.controller("simpleCtrl", function ($scope) {
  $scope.buttonEnabled = true;
  $scope.clickCounter = 0;

  $scope.handleClick = function () {
    $scope.clickCounter++;
  };

  $scope.$watch("buttonEnabled", function (newValue) {
    $("#jqui button").button({
      disabled: !newValue,
    });
  });
});

// app.controller("simpleCtrl", function () {
//   this.dataValue = "Hello, Adam";

//   this.reverseText = function () {
//     this.dataValue = this.dataValue.split("").reverse().join("");
//   };
// });

// app.controller("firstController", function ($scope) {
//   $scope.dataValue = "Hello, Adam";

//   $scope.reverseText = function () {
//     $scope.dataValue = $scope.dataValue.split("").reverse().join("");
//   };
// });

// app.controller("secondController", function ($scope) {
//   $scope.dataValue = "Hello, Jacqui";

//   $scope.changeCase = function () {
//     $scope.dataValue = $scope.dataValue.toUpperCase();
//   };
// });

// app.controller("TopLevelController", function ($scope) {
//   $scope.data = { dataValue: "Hello, Adam" };

//   $scope.reverseText = function () {
//     $scope.data.dataValue = $scope.data.dataValue.split("").reverse().join("");
//   };

//   $scope.changeCase = function () {
//     const result = [];
//     angular.forEach($scope.data.dataValue.split(""), function (char, index) {
//       result.push(
//         index % 2 === 1
//           ? char.toString().toUpperCase()
//           : char.toString().toLowerCase()
//       );
//     });
//     $scope.data.dataValue = result.join("");
//   };
// });

// app.controller("FirstChildController", function ($scope) {
//   $scope.changeCase = function () {
//     $scope.data.dataValue = $scope.data.dataValue.toUpperCase();
//   };
// });

// app.controller("SecondChildController", function ($scope) {
//   $scope.changeCase = function () {
//     $scope.data.dataValue = $scope.data.dataValue.toLowerCase();
//   };

//   $scope.shiftFour = function () {
//     const result = [];
//     angular.forEach($scope.data.dataValue.split(""), function (char, index) {
//       result.push(index < 4 ? char.toUpperCase() : char);
//     });
//     $scope.data.dataValue = result.join("");
//   };
// });
