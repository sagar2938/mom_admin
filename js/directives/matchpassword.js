// materialAdmin.directive('pwCheck', [function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, elem, attrs, ctrl) {
//             var firstPassword = '#' + attrs.pwCheck;
//             elem.add(firstPassword).on('keyup', function () {
//                 scope.$apply(function () {
//                     // console.info(elem.val() === $(firstPassword).val());
//                     ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
//                 });
//             });
//         }
//     }
// }]);



materialAdmin.directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;
                
                if (scope.passwordVerify || ctrl.$viewValue) {
                   combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
                }                    
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});