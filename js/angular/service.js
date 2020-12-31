app.service('Data', function($http, $localStorage, $cookies, $q){

    
    this.listData = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/offer/section/dashboard/'
        }).then(function(response){
            return response.data.offer;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

 this.priceData = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/order/price/info/'
        }).then(function(response){
            // alert(JSON.stringify(response));
            return response.data.priceInfo;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }



this.companylist = function(){
     return $http({
            method:'POST',
            'url':'https://mom-apicalls.appspot.com/customer/get/delivery/info/'
        });
    }
this.deliveryBoyList = function(){
     return $http({
            method:'POST',
            'url':'https://mom-apicalls.appspot.com/customer/get/delivery/info/'
        });
    }




this.summaryViewData= function(json_data){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/offer/list/'
        }).then(function(response){
            return response.data.subscription_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

    

 // this.ViewData = function(){
        
 //        return $http({
 //            method:'POST',
 //            url :'https://mom-apicalls.appspot.com/api/menu/list/'
 //        }).then(function(response){
 //            return response.data.menu_data;
 //        }).catch(function(response){
 //            console.log("Error in getting employee list");
 //        });
 //    }


this.ViewData = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/vendor/list/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }








 this.deliveryData= function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/customer/get/delivery/info/'
        }).then(function(response){
            return response.data.delivery_data;
        }).catch(function(response){
           
            
            console.log("Error in getting delivery boy list");
        });
    }

this.deliverylistassignData= function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/customer/get/delivery/info/'
        }).then(function(response){
            return response.data.delivery_data;
        }).catch(function(response){
           
            
            console.log("Error in getting delivery boy list");
        });
    }






   
   

   
   
    

// this.AddVendor = function(){
        
//         return $http({
//             method:'POST',
//             url : 'https://mom-apicalls.appspot.com/api/add/vendor/list/'
//         }).then(function(response){
//             return response.data.snp_data;
//         }).catch(function(response){
//             console.log("Error in getting employee list");
//         });
//     }


 this.AddVendor= function(json_data){
        console.log(json_data)
        return $http({

            method:'post',
            data:json_data,

            url:' https://mom-apicalls.appspot.com/api/add/vendor/web/'
        });
    }



    
    
   

    this.addDetail = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com/api/get/user/report/'
        })
    }
   
    
    

   
   

    
    
   
   

    
    
    
    this.reportViewGenerateData = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            headers:{
                'Content-Type': undefined
            },
            
            url:'https://mom-apicalls.appspot.com/api/get/user/report/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
            
        });
    }


this.reportViewGenerateData1 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            headers:{
                'Content-Type': undefined
            },
            
            url:'https://mom-apicalls.appspot.com/customer/get/address/'
        }).then(function(response){
            return response.data.address_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
            
        });
    }


this.momcheforder = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            headers:{
                'Content-Type': undefined
            },
            
            url:'https://mom-apicalls.appspot.com/api/get/complete/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
            
        });
    }


this.momchefdata = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            headers:{
                'Content-Type': undefined
            },
            
            url:'https://mom-apicalls.appspot.com/api/get/vendor/profile/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
            
        });
    }




this.assignData = function(json_data){
        
        return $http({
            method:'POST',
            data:json_data,
            url :'https://mom-apicalls.appspot.com/customer/get/customer/order/list/'
        }).then(function(response){
            return response.data.subscription_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }







  this.totalData = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:' https://mom-apicalls.appspot.com//customer/get/customer/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }



   this.cancelData = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:' https://mom-apicalls.appspot.com/customer/get/cancel/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

this.assignData = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/customer/get/customer/order/list/'
        }).then(function(response){
            return response.data.subscription_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

   
    
    this.unassignData = function(){
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/order/list/'
        }).then(function(response){
            return response.data.subscription_data;
          
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }








// this.partnerData = function(json_data){
        
//         return $http({
//             method:'POST',
//             data:json_data,
//             url : 'https://mom-apicalls.appspot.com/api/get/vendor/list/'
//         }).then(function(response){
//             return response.data.state_data;
//         }).catch(function(response){
//             console.log("Error in getting vendor list");
//         });
//     }


    this.partnerData = function(){
        
        return $http({
            method:'POST',
            
            url :'https://mom-apicalls.appspot.com/api/get/vendor/list/'
        }).then(function(response){
            console .log(response )
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }




    this.assignorderData = function(){
        // alert("hey")
        return $http({
            method:'POST',
            
            url :'https://mom-apicalls.appspot.com/api/get/assign/order/list/'
        }).then(function(response){
            console .log(response )
             // alert(JSON.stringify(response));
            return response.data.order_data;

        })
        
    }

    this.AssignDeliver = function(json_data){
        // alert("hey")
        return $http({
            method:'POST',
            data:json_data,
            
            url :'https://mom-apicalls.appspot.com/api/deliver/order/assign/'
        })
        
    }


   this.neworderData = function(){
        // alert("hey")
        return $http({
            method:'POST',
         url :'https://mom-apicalls.appspot.com/dashboard/get/new/order/'
        }).then(function(response){
            console .log(response )
             // alert(JSON.stringify(response));
            return response.data.order_data;

        })
        
    }


   
   // this.venderorderData = function(){
   //      // alert("hey")
   //      return $http({
   //          method:'POST',
   //       url :'https://mom-apicalls.appspot.com/api/get/new/order/web/'
   //      }).then(function(response){
   //          console .log(response )
   //           // alert(JSON.stringify(response));
   //          return response.data.order_data;

   //      })
        
   //  }



  this.notassignData = function(){
        // alert("hey")
        return $http({
            method:'POST',
            
            url :'https://mom-apicalls.appspot.com/api/get/new/order/web/'
            // url :'https://mom-apicalls.appspot.com/api/get/assign/order/list/'

        }).then(function(response){
            console .log(response )
             // alert(JSON.stringify(response));
            return response.data.order_data;

        })
        
    }


 this.orderInfo = function(){
        // alert("hey")
        return $http({
            method:'POST',            
            url :'https://mom-apicalls.appspot.com/api/get/new/order/web/'
            

        }).then(function(response){
            console .log(response )
             // alert(JSON.stringify(response));
            return response.data.order_data;

        })
        
    }



this.complteData = function(){
        // alert("hey")
        return $http({
            method:'POST',
            
            url :'https://mom-apicalls.appspot.com/api/get/complete/order/web/'
        }).then(function(response){
            console .log(response )
             // alert(JSON.stringify(response));
            return response.data.order_data;

        })
        
    }



    this.contactData = function(){
        
        return $http({
            method:'POST',
            url : 'https://mom-apicalls.appspot.com/api/get/contact/us/'
        }).then(function(response){
            return response.data.contact_data;

        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }






    this.momWebsiteData = function(){
        
        return $http({
            method:'POST',
            url : 'https://mom-apicalls.appspot.com/api/customer/lead/'
        }).then(function(response){
            return response.data.lead_data;

        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }


  



    this.allVendor = function(){
     return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/customer/get/vendor/list/web/'
        });
    }


 this.partnerData1 = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/vendor/list/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }


this.partnerData2 = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/vendor/list/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

this.partnerData3 = function(){
        
        return $http({
            method:'POST',
            url :'https://mom-apicalls.appspot.com/api/get/vendor/list/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }


 this.orderDetail= function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com/dashboard/get/order/iteminfo/'
        }).then(function(response){
            return response.data.orderItem_list;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

this.orderList= function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com//api/get/new/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }


// api/get/running/order/list/

 this.runningList= function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com//api/get/running/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }



this.menuList= function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com//api/get/menu/list/customer/'
        }).then(function(response){
            return response.data.menu_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }





this.completeList= function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://mom-apicalls.appspot.com//api/get/complete/order/list/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }

this.completeOrderlist= function(){
        return $http({
            method:'post',
            url:'https://mom-apicalls.appspot.com/dashboard/get/complete/order/list/total/'
        }).then(function(response){
            return response.data.order_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }



this.AddOffers = function(json_data){
    
        return $http({
            method:'POST',
            'data':json_data,
            
            'url':'https://mom-apicalls.appspot.com/api/add/offer/section/'
        });
    }



this.createmenu= function(json_data){
        return $http({
            method:'post',
            data:json_data,
           url:' https://mom-apicalls.appspot.com/api/add/vendor/menu/'
        
        });
    }







this.addDelivery = function(json_data){
    alert("hey")
        return $http({
            method:'POST',
            'data':json_data,
            'url':'https://mom-apicalls.appspot.com/customer/add/delivery/data/'
        });
    }




this.uploadImage = function(files){
        var form_data = new FormData();
        form_data.append('file', files[0]);
        
        
        return $http({
            method:'POST',
            data:form_data,
            headers:{
                'Content-Type': undefined
            },
            transformRequest:angular.identity, 
            url:'https://mom-apicalls.appspot.com/customer/offer/upload/'
        });
    }


   


    this.approveData = function(){
        
        return $http({
            method:'POST',
            url : 'https://mom-apicalls.appspot.com/api/get/user/report/'
        }).then(function(response){
            return response.data.user_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }
   
    
   

    
   
    this.Job_done = function(json_data){
        
        return $http({
            method:'POST',
            data:json_data,
            url : 'https://m-prop.appspot.com/api/get/product/job/'
        }).then(function(response){
            return response.data.complaint_data;
        }).catch(function(response){
            console.log("Error in getting employee list");
        });
    }
});
(function () {
    'use strict';
 
    angular
        .module('coreuiApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout) {
        var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(username, password,callback) {
 
             var json_data = {
                'username':username,
                'password' : password,
            }

            $http.post('https://mom-apicalls.appspot.com/api/admin/post/login/', { json_data })
            
               .then(function (response) {
                   callback(response);
                   

               });
 
        }
 
        function SetCredentials(username, password, id, datasets) {
            var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username.toUpperCase(),
                    id: id,
                    authdata: authdata,
                    resp_datasets: datasets,



                },
                loggedIn : 1
            };
 
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 365);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }
 
        function ClearCredentials() {
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $rootScope.globals = {loggedIn : 0};
            $cookies.remove('globals');
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            // $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
 
    // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
})();



