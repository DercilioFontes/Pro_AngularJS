angular.module("exampleApp.Filters", []).filter("dayName", function () {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return function (input) {
    return angular.isNumber(input) ? dayNames[input - 1] : input;
  };
});
