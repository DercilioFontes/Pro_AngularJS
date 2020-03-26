angular
  .module("customFilters", [])
  .filter("unique", function() {
    return function(data, propertyName) {
      if (angular.isArray(data) && angular.isString(propertyName)) {
        const results = [];
        const keys = {};
        for (let i = 0; i < data.length; i++) {
          const val = data[i][propertyName];
          if (angular.isUndefined(keys[val])) {
            keys[val] = true;
            results.push(val);
          }
        }
        return results;
      } else {
        return data;
      }
    };
  })
  .filter("range", function($filter) {
    return function(data, page, size) {
      if (
        angular.isArray(data) &&
        angular.isNumber(page) &&
        angular.isNumber(size)
      ) {
        const startIndex = (page - 1) * size;
        if (data.length < startIndex) return [];
        else return $filter("limitTo")(data.splice(startIndex), size);
      } else return data;
    };
  })
  .filter("pageCount", function() {
    return function(data, size) {
      if (angular.isArray(data)) {
        const result = [];
        for (let i = 0; i < Math.ceil(data.length / size); i++) result.push(i);
        return result;
      } else return data;
    };
  });
