


app.directive("fileread", [function () {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
          $scope.$apply(function () {
            var data = evt.target.result;
            
            var workbook = XLSX.read(data, {type: 'binary'});
            
            var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
            
            var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
            
            $scope.opts.columnDefs = [];
            headerNames.forEach(function (h) {
              $scope.opts.columnDefs.push({ field: h });
            });
            
            $scope.opts.data = data;
            
            $elm.val(null);
          });
        };
        
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  }
}]);

app.directive('autoComplete', function($timeout) {
  return function(scope, iElement, iAttrs) {
          iElement.autocomplete({
              source: scope[iAttrs.uiItems],
              select: function() {
                  $timeout(function() {
                    iElement.trigger('input');
                  }, 0);
              }
          });
  };
});

app.directive('dynamicModel', ['$compile', '$parse', function ($compile, $parse) {
  return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function (scope, elem) {
          var name = $parse(elem.attr('dynamic-model'))(scope);
          elem.removeAttr('dynamic-model');
          elem.attr('ng-model', name);
          $compile(elem)(scope);
      }
  };
}]);