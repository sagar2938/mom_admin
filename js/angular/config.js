var app = angular.module('coreuiApp', ['ui.router', 'oc.lazyLoad', 'ngCookies','angular-loading-bar','ngStorage', 'base64']);

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){

    $urlRouterProvider.otherwise("/main/home");
    

    $stateProvider
    
    // login page url
    .state('login', {
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'loginCtrl'
    })
    // home page url
    .state('main', {
        url:'/main',
        templateUrl:'templates/main.html'
    })
    .state('main.home', {
        url:'/home',
        templateUrl:'templates/home.html',
        // controller:'homeCtrl',
        resolve : {
            summaryViewData: function(Data){
                return Data.summaryViewData();
            }
        }
    })
    .state('main.list_view', {
        url:'/list-view',
        templateUrl:'templates/list-view.html',
        controller: 'listCtrl',
        resolve : {
            listData: function(Data){
                return Data.listData();
                }
        }
    })

  .state('main.deliverylist', {
        url:'/deliverylist',
        templateUrl:'templates/deliverylist.html',
        controller: 'deliverylistvCtrl',
        resolve : {
            deliveryData: function(Data){
                return Data.deliveryData();
                }
        }
    })

   .state('main.deliverylistassign', {
        url:'/deliverylistassign',
        templateUrl:'templates/deliverylistassign.html',
        controller: 'deliverylistassignCtrl',
        resolve : {
            deliverylistassignData: function(Data){
                return Data.deliverylistassignData();
                }
        }
    })


    .state('main.neworder', {
        url:'/neworder',
        templateUrl:'templates/neworder.html',
        controller: 'totalorderCtrl',
        resolve : {
            neworderData: function(Data){
                return Data.neworderData();
                }
        }
    })
    .state('main.order', {
        url:'/order',
        templateUrl:'templates/order.html',
        controller: 'orderCtrl',
        resolve : {
            neworderData: function(Data){
                return Data.neworderData();
                }
        }
    })

    .state('main.vendorwiseorder', {
        url:'/vendorwiseorder',
        templateUrl:'templates/vendorwiseorder.html',
        controller: 'vendorwiseorderCtrl',
        resolve : {
            neworderData: function(Data){
                return Data.neworderData();
                }
        }
    })

  .state('main.totalorder', {
        url:'/totalorder',
        templateUrl:'templates/totalorder.html',
        // controller: 'totalCtrl',
        // resolve : {
        //     neworderData: function(Data){
        //         return Data.neworderData();
        //         }
        // }
    })


 .state('main.cancelorder', {
        url:'/cancelorder',
        templateUrl:'templates/cancelorder.html',
        // controller: 'totalCtrl',
        // resolve : {
        //     neworderData: function(Data){
        //         return Data.neworderData();
        //         }
        // }
    })




 .state('main.list', {
        url:'/list',
        templateUrl:'templates/list.html',
        controller: 'listvCtrl',
        resolve : {
            ViewData: function(Data){
                return Data.ViewData();
                }
        }
    })


.state('main.menulist', {
        url:'/menulist',
        templateUrl:'templates/menulist.html',
        controller: 'menulistCtrl',
        // resolve : {
        //     menulistData: function(Data){
        //         return Data.menulistData();
        //         }
        // }
    })


    .state('main.addnewuser', {
        url:'/addnewuser',
        templateUrl:'templates/addnewuser.html',
        controller: 'listCtrl',
        // resolve : {
        //     summaryViewData: function(Data){
        //         return Data.summaryViewData();
        //         }
        // }
    })
    
    .state('main.userlist', {
        url:'/userlist',
        templateUrl:'templates/userlist.html',
        controller: 'listCtrl',
        // resolve : {
        //     summaryViewData: function(Data){
        //         return Data.summaryViewData();
        //         }
        // }
    })

   

    .state('main.complete', {
        url:'/complete',
        templateUrl:'templates/complete.html',
        controller: 'completeCtrl',
        resolve : {
            completeList: function(Data){
                return Data.completeList();
                }
        }
    })
    .state('main.vendorprofile', {
        url:'/vendorprofile',
        templateUrl:'templates/vendorprofile.html',
        controller: 'vendorprofileCtrl',
        // resolve : {
        //     CompleteData: function(Data){
        //         return Data.CompleteData();
        //         }
        // }
    })

   .state('main.pending', {
        url:'/pendingWork',
        templateUrl:'templates/pendingOrder.html',
        controller: 'pendingCtrl',
        resolve : {
            PendingData: function(Data){
                return Data.PendingData();
                }
        }
    })
    

    
    
    .state('main.assignOrder', {
        url:'/assignOrder',
        templateUrl:'templates/assignOrder.html',
        controller: 'assignCtrl',
        resolve : {
            assignData: function(Data){
                return Data.assignData();
                }
        }
    })
    
    
    .state('main.partner', {
        url:'/partner',
        templateUrl:'templates/partner.html',
        controller: 'partnerCtrl',
        resolve : {
            partnerData: function(Data){
                return Data.partnerData();
                }
        }
    })

    .state('main.assignorder', {
        url:'/assignorder',
        templateUrl:'templates/assignorder.html',
        controller: 'assignorderCtrl',
        resolve : {
            assignorderData: function(Data){
                return Data.assignorderData();
                }
        }
    })
     .state('main.cancel', {
        url:'/cancel',
        templateUrl:'templates/cancelorder.html',
        controller: 'cancelCtrl',
        resolve : {
            cancelData: function(Data){
                return Data.cancelData();
                }
        }
    })


    .state('main.uassignorder', {
        url:'/uassignorder',
        templateUrl:'templates/uassignorder.html',
        controller: 'uassignorderCtrl',
        resolve : {
            notassignData: function(Data){
                return Data.notassignData();
                }
        }
    })

    
     .state('main.complte', {
        url:'/complte',
        templateUrl:'templates/complte.html',
        controller: 'complteCtrl',
        resolve : {
            complteData: function(Data){
                return Data.complteData();
                }
        }
    })



    
    .state('main.websitevendor', {
        url:'/websitevendor',
        templateUrl:'templates/websitevendor.html',
        controller: 'websitevendorCtrl',
        resolve : {
            momWebsiteData: function(Data){
                return Data.momWebsiteData();
                }
        }
    })

    .state('main.contact', {
        url:'/contact',
        templateUrl:'templates/contact.html',
        controller: 'contactCtrl',
        resolve : {
           contactData: function(Data){
                return Data.contactData();
                }
        }
    })


    .state('main.approved', {
        url:'/approved',
        templateUrl:'templates/approved.html',
        controller: 'approvedCtrl',
        resolve : {
            approveData: function(Data){
                return Data.approveData();
                }
        }
    })
    .state('main.userstatus', {
        url:'/userstatus',
        templateUrl:'templates/userstatus.html',
        controller: 'statusCtrl',
        resolve : {
            statusData: function(Data){
                return Data.statusData();
                }
        }
    })
    
    .state('main.subscribe', {
        url:'/subscribe',
        templateUrl:'templates/subscribe.html',
        controller: 'subscribeCtrl',
        // resolve : {
        //     subsData: function(Data){
        //         return Data.subsData();
        //         }
        // }
    })


    .state('main.createmenu', {
        url:'/createmenu',
        templateUrl:'templates/createmenu.html',
        controller: 'createmenuCtrl',
        // resolve : {
        //     createmenuData: function(Data){
        //         return Data.createmenuData();
        //         }
        // }
    })


    .state('main.deliveryreg', {
        url:'/deliveryreg',
        templateUrl:'templates/deliveryreg.html',
        controller: 'deliveryregCtrl',
        // resolve : {
        //     createmenuData: function(Data){
        //         return Data.createmenuData();
        //         }
        // }
    })

    .state('main.addLead', {
        url:'/addLead',
        templateUrl:'templates/addLead.html',
        controller: 'addMenuCtrl',
        resolve : {
            partnerData1: function(Data){
                return Data.partnerData1();
                }
        }
    })
     .state('main.runningorder', {
        url:'/runningorder',
        templateUrl:'templates/runningorder.html',
        controller: 'runningorderCtrl',
        resolve : {
            partnerData2: function(Data){
                return Data.partnerData2();
                }
        }
    })
    
     .state('main.completeorder', {
        url:'/completeorder',
        templateUrl:'templates/completeorder.html',
        controller: 'completeorderCtrl',
        resolve : {
            completeOrderlist: function(Data){
                return Data.completeOrderlist();
                }
        }
    })

   .state('main.runningordercur', {
        url:'/runningordercur',
        templateUrl:'templates/runningordercur.html',
        controller:'runningordercurCtrl',
      
    })


   .state('main.cancelordercur', {
        url:'/cancelordercur',
        templateUrl:'templates/cancelordercur.html',
        controller:'cancelordercurCtrl',
      
    })


   .state('main.completeordercur', {
        url:'/completeordercur',
        templateUrl:'templates/completeordercur.html',
        controller:'completeordercurCtrl',
      
    })



.state('main.menu', {
        url:'/menu',
        templateUrl:'templates/menu.html',
        controller:'menuCtrl',
      
    })


.state('main.orderdetail', {
        url:'/orderdetail',
        templateUrl:'templates/orderdetail.html',
        controller:'orderdetailCtrl',
      
    })



.state('main.neworderdetail', {
        url:'/neworderdetail',
        templateUrl:'templates/neworderdetail.html',
        controller:'neworderdetailCtrl',
      
    })




.state('main.uassignorderdetail', {
        url:'/uassignorderdetail',
        templateUrl:'templates/uassignorderdetail.html',
        controller:'uassignorderdetailCtrl',
      
    })

.state('main.completeorderdetail', {
        url:'/completeorderdetail',
        templateUrl:'templates/completeorderdetail.html',
        controller:'completeorderdetailCtrl',
      
    })



    

    .state('main.partnerprofile', {
        url:'/partnerprofile',
        templateUrl:'templates/partnerprofile.html',
        controller: 'partnerprofileCtrl',
        // resolve : {
        //     totalData: function(Data){
        //         return Data.totalData();
        //         }
        // }
        
    })

 .state('main.ordercomplete', {
        url:'/ordercomplete',
        templateUrl:'templates/ordercomplete.html',
        controller:'ordercompleteCtrl',
        
    })
  .state('main.momchef', {
        url:'/momchef',
        templateUrl:'templates/momchef.html',
        controller:'momchefCtrl',
        
    }) 


    .state('main.price', {
        url:'/price',
        templateUrl:'templates/price.html',
        controller:'priceCtrl',

        resolve : {
            priceData: function(Data){
                return Data.priceData();
                }
        }
        
        
    })   



}]);