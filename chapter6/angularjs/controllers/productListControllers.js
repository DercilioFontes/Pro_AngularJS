angular
  .module("sportsStore")
  .constant("productListActiveClass", "btn-primary")
  .controller("productListCtrl", function(
    $scope,
    $filter,
    productListActiveClass
  ) {
    let selectedCategory = null;

    $scope.selectCategory = function(newCategory) {
      selectedCategory = newCategory;
    };

    $scope.categoryFilterFn = function(product) {
      return (
        selectedCategory == /* also processes undefined */ null ||
        product.category === selectedCategory
      );
    };

    $scope.getCategoryClass = function(category) {
      return selectedCategory === category ? productListActiveClass : "";
    };
  });
