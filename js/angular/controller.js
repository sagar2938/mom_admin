app.run(function($rootScope, $location, $cookies, $http, $state, AuthenticationService, $timeout, $localStorage) {
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.loggedIn == 1) {
    $localStorage.empcode = $rootScope.globals.currentUser.resp_datasets;
    $localStorage.dbName = $rootScope.globals.currentUser.dbName;
    if ($location.path() == '/') {
    $location.path('/main/home');
    
    } else {
      $location.path($location.path());
    }
  } else {
    $location.path('/login');
  }
  $rootScope.logout = function() {
    
    AuthenticationService.ClearCredentials();
    $timeout(function() {
      $location.path('/login');
    }, 1000);
    $localStorage.imgsrc = '';
  }
});
app.controller('AppController', ['$scope', '$route', function($scope, $route) {
  $scope.reloadRoute = function() {
    $route.reload();
  };
}]);

app.controller('loginCtrl', ['$rootScope', '$cookies', '$scope', '$timeout', 'Data', '$location', 'AuthenticationService', '$state', '$localStorage', function($rootScope, $cookies, $scope, $timeout, Data, $location, AuthenticationService, $state, $localStorage) {
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.loggedIn == 1) {
    $location.path('/home');
  }
  $scope.wrongpass = false;
  $scope.islogin = false;
  $scope.submitLogin = function(username, password) {
    AuthenticationService.Login(username, password, function(response) {
      console.log(response)
      if (response.data.success == 1) {
        if (response.data.configure_data[4] == 1) {
          AuthenticationService.SetCredentials(username, password, response.data.configure_data, response.data.datasets);
          $state.go('main.home');
          $localStorage.username = response.data.username;
          $scope.name = response.data.datasets[0].name;
        } else {

          $state.go('resetpassword');
        }
      } else {
        $scope.wrongpass = true;
        $state.go('login')
      }
    }).catch(function(response) {
      $scope.wrongpass = true;
    });
  }
}]);

app.controller('subscribeCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, Data, $base64) {
  $scope.servce_form = true;
  $scope.contact_submit = false;
  $scope.uploadFile = function() {
      $rootScope.isViewLoading = true;
      console.log("hii");
      var filename = event.target.files[0].name;
      $localStorage.filename = filename;
      
      console.log(filename);
      Data.uploadImage(event.target.files).then(function(response) {
        $rootScope.isViewLoading = false;
      }).catch(function(response) {});
    }
    $scope.AddOffers = function() {
 
    var momPart = document.getElementById("momPart").value;
    var minVal = document.getElementById("minVal").value;
    var maxVal = document.getElementById("maxVal").value;
    var image = document.getElementById('blah2').value;
    var minCartVal = document.getElementById("minCartVal").value;
    // var valid_to = document.getElementById("valid_to").value;
    var chefPart = document.getElementById("chefPart").value;
    var allowInfiniteUses = document.getElementById("allowInfiniteUses").value;
    $scope.valid_to = '';
    $scope.status = '';
    $scope.mobile = '';
    // $scope.chefPart = '';
    var json_data = {

      'allowInfiniteUses': $scope.allowInfiniteUses,
      'offer_name': $scope.offer_name,
      'offer_type': $scope.offer_type,
      'discount': $scope.discount,
      'maxdiscount': $scope.maxdiscount,
      'valid_to': $scope.valid_to,
      'promoCode': $scope.promoCode,
      'mobile': $scope.mobile,
      'image': $localStorage.filename,
      'status': $scope.status,
      // 'image':$localStorage.filename,
      'pvalues': $scope.pvalues,
      'chefPart': chefPart,
       'momPart': momPart,
      'minVal': minVal,
      'maxVal': maxVal,
      'minCartVal': minCartVal,
    }
    // alert(JSON.stringify(json_data));
    console.log(json_data);
    console.log(json_data)
    Data.AddOffers(json_data).then(function(response) {
    console.log(response)
    $scope.servce_form = false;
      $scope.contact_submit = true;
    })
  };
}]);

app.controller('createmenuCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, Data, $base64) {
  $scope.uploadFile = function() {
    var filename = event.target.files[0].name;
    $localStorage.filename = filename;
    console.log(filename);
    Data.uploadImage(event.target.files).then(function(response) {
      $scope.alertmsg = "Succefully Submitted!!";
      $timeout(function() {
        $scope.alertshow = true;
      }, 2000);
    }).catch(function(response) {});
  }
  $scope.createmenu = function() {
    $scope.half = '';
    $scope.full = '';
    $scope.halfPrice = '';
    $scope.quarterPrice = '';
    $scope.quarter = '';
    $scope.item_image = '';
    var json_data = {
      'mobile': $scope.mobile,
      'food_type': $scope.food_type,
      'itemName': $scope.itemName,
      'itemDescription': $scope.itemDescription,
      'itemGroup': $scope.itemGroup,
      'item_image': $localStorage.filename,
      'fullPrice': $scope.fullPrice,
      'halfPrice': $scope.halfPrice,
      'quarterPrice': $scope.quarterPrice,
      'half': $scope.half,
      'full': $scope.full,
      'quarter': $scope.quarter,
    }
    console.log(json_data)
    Data.createmenu(json_data).then(function(response) {
      console.log(response)
      window.location.reload();
    })
  };
}]);
app.controller('deliveryregCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, Data, $base64) {
  Data.companylist().then(function(response) {
   // alert(JSON.stringify(response))
    var categoryList = response.data.delivery_data;
    $scope.list = categoryList;
    // alert(JSON.stringify($scope.list));
    
    console.log($scope.list)
     }).catch(function(response) {})
     $scope.servce_form = true;
     $scope.contact_submit = false;
     $scope.uploadFile = function() {
     var filename = event.target.files[0].name;
     $localStorage.filename = filename;
     console.log(filename);
     Data.uploadImage(event.target.files).then(function(response) {
     $scope.alertmsg = "Succefully Submitted!!";
     $timeout(function() {
        $scope.alertshow = true;
      }, 2000);
    }).catch(function(response) {});
  }
  $scope.addDelivery = function() {
    var companyName = document.getElementById("companyName").value;
    var companyId = "momco" + Math.floor(1000 + Math.random() * 9000);
    $scope.vehicleNo = '';
    var json_data = {
      "companyName": companyName,
      "companyId": companyId,
    
      'name': $scope.name,
      'mobile': $scope.mobile,
      'address': $scope.address,
      'driveringLicense': $scope.driveringLicense,
      'aadharNo': $scope.aadharNo,
      'vehicleNo': $scope.vehicleNo,
       'image': $localStorage.filename,
     }
    
    console.log(json_data)
    Data.addDelivery(json_data).then(function(response) {
      $scope.servce_form = false;
      $scope.contact_submit = true;
      console.log(json_data)
      
    })
  };


 // $scope.deliveryData = function() {
 //    var mobile = $localStorage.report_json_data.mobile
 //  var json_data = {
 //    'mobile': mobile,
 //  }
 //  console.log(json_data)
 //  Data.deliveryData(json_data).then(function(response) {
      
 //  console.log(json_data)
      
 //    })
 //  };




  
 



}]);
app.controller('vendorprofileCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$timeout', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $timeout, $localStorage, Data, $base64) {
  $scope.servce_form = true;
  $scope.contact_submit = false;
  $scope.uploadFile = function() {
    var filename = event.target.files[0].name;
    $localStorage.filename = filename;
    // return filename
    console.log(filename);
    Data.uploadImage(event.target.files).then(function(response) {
      $scope.alertmsg = "Succefully Submitted!!";
      $timeout(function() {
        $scope.alertshow = true;
      }, 2000);
    }).catch(function(response) {});
  }
  $scope.AddVendor = function() {
    var email = document.getElementById("email").value;
    var openTime = document.getElementById("openTime").value;
    var endTime = document.getElementById("endTime").value;
    var breakStart = document.getElementById("breakStart").value;
    var breakEnd = document.getElementById("breakEnd").value;
    
    $scope.dob = '';
    $scope.longitude = '';
    $scope.latitude = '';
    $scope.status = '';
    var json_data = {
     
      'email': email,
      'openTime': openTime,
      'endTime': endTime,
      'breakStart': breakStart,
      'breakEnd': breakEnd,
      'firstName': $scope.firstName,
      'middleName': $scope.middleName,
      'lastName': $scope.lastName,
      'dob': $scope.dob,
      'address': $scope.address,
      'openTime': $scope.openTime,
      'endTime': $scope.endTime,
      'breakStart': $scope.breakStart,
      'breakEnd': $scope.breakEnd,
      'country': $scope.country,
      'state': $scope.state,
      'city': $scope.address,
      'zipCode': $scope.zipCode,
      'mobile': $scope.mobile,
      'foodLicenseNo': $scope.foodLicenseNo,
      'specialization': $scope.specialization,
      'comment': $scope.comment,
      'image': $localStorage.filename,
      'longitude': $scope.longitude,
      'latitude': $localStorage.latitude,
      'status': $localStorage.status,
    }
        console.log(json_data)
        Data.AddVendor(json_data).then(function(response) {
        console.log(response)
        $scope.servce_form = false;
        $scope.contact_submit = true;
      })
  };
}]);

app.controller('partnerCtrl', ['$scope', '$rootScope', '$location','$cookies','partnerData','$localStorage', 'Data',   '$base64', function($scope, $rootScope, $location,$cookies,partnerData, $localStorage, Data,$base64){
  
  var StudentData = partnerData;
  console.log(StudentData)
   var length=StudentData.length;
   $scope.total = StudentData.length;
   
   var dataArray=[];

    for (var i=0; i<length; i++) {
    if(StudentData[i]['status'] == 1){
          console.log(StudentData[i]['status'])
         
         dataArray.push([ StudentData[i]['firstName'], StudentData[i]['mobile'],StudentData[i]['foodLicenseNo'],'<button  type="submit" class="mybtn1 " class="tooltip" data-target="/#!/main/menulist" onclick="function('+ StudentData[i]['mobile']+')";  style="background: url(../images/menu.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>','<button type="submit" class="mybtn" data-target="/#!/main/momchef" onclick="function('+ StudentData[i]['mobile']+')"; style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button><button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/edit.png) !important;margin-left:-22px!important;background-size: 34px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>','<label class="switch"><input type="checkbox" checked onclick="toggleBox1('+ StudentData[i]['mobile']+');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser('+ StudentData[i]['mobile'] +')" style="margin-left:20px;"></i>'] ); 
       
        }
        
        else{
        dataArray.push([StudentData[i]['firstName'], StudentData[i]['mobile'],StudentData[i]['foodLicenseNo'],'<button type="submit" class="mybtn1" data-target="/#!/main/menulist" onclick="function('+ StudentData[i]['mobile']+')"; style="background: url(../images/menu.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>','<button type="submit" class="mybtn" data-target="/#!/main/momchef" onclick="function('+ StudentData[i]['mobile']+')"; style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button><button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/edit.png) !important;margin-left:-22px!important;background-size: 34px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>','<label class="switch"><input onclick="toggleBox('+ StudentData[i]['mobile']+');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser('+ StudentData[i]['mobile'] +')" style="margin-left:20px;"></i>'] );  
        }
    } 
   
$.fn.dataTable.ext.errMode = 'none';

    $('#runningOrdersTable').on( 'error.dt', function ( e, settings, techNote, message ) {
    console.log( 'An error has been reported by DataTables: ', message );
    } ) ;


   $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>' );
     var table =$('#example').DataTable( {
        "scrollX": true,  
    
        "data": dataArray,
        "colReorder": true,
        "buttons": ['copy', 'excel', 'pdf','colvis'],
        "dom": 'Blfrtip',
        "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],      
         "responsive": true,
        
        "columns": [

            { "title": "Name" },
            { "title": "Mobile" },
            { 'title': "foodLicenseNo" },
            { "title": "Menu" },
            { "title": "Action" },
            { 'title': "Status" },
 
        ]
    });

    $('#example').on('click', '.btn-details', function(){
        showModalDialog(this);
        console.log("hii")

     });




     $('.mybtn').on('click', function(event) {
    event.preventDefault();
    var data = table.row( $(this).parents('tr') ).data();
    $localStorage.report_json_data = {
            'mobile':data[1],
            }
    
    var url = $(this).data('target');
    location.replace(url);
    });
$('.mybtn1').on('click', function(event) {
    
 event.preventDefault();
    var data = table.row( $(this).parents('tr') ).data();
    $localStorage.report_json_data = {
            'mobile':data[1],
            
          }
    var url = $(this).data('target');
    location.replace(url);
     });
function showModalDialog(elBtn){
        $('#dlg-details').data('btn', elBtn);
        console.log("hii")
       }

     $('#dlg-details').on('show.bs.modal', function (e){
      console.log("hii")

        var $dlg = $(this);

        var $tr    = $($dlg.data('btn')).closest('tr');
        var $table = $($dlg.data('btn')).closest('table');
        var data = $table.DataTable().row($tr).data();

        
        
        var html = 
            '<form>'+
                '<div class="row" style="margin-top:25px;padding-bottom:20px;">'+
               
                    '<div class="col-md-6">'+
                        '<label style="padding-left:10px;">MomName</label>'+
                        '<input type="text" class="form-control"   style="padding-left:10px;" id="firstName"  value="' +$('<div/>').text(data[0]).html() +'" disabled>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<label>MomMobile</label>'+
                        '<input type="text" class="form-control"    style="padding-left:10px;" id="mobile" value="' +$('<div/>').text(data[1]).html() +'" disabled>'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-md-6">'+
                        '<label style="padding-left:10px;">FoodLicenseNo</label>'+
                        '<input type="text" class="form-control"   style="padding-left:10px;" id="foodLicenseNo" value="' +$('<div/>').text(data[2]).html() +'">'+
                    '</div>'+
                   '</div>'+
                    


                
                
            '</form>';
       
 
                    
  
        $('h5', $dlg).html(data[2]);
  
        $('.modal-body', $dlg).html(html);
  
     })
     $(document).ready(function(){

      $('#sure').click(function(){
        
        var mobile = $('#mobile').val();
        var foodLicenseNo = $('#foodLicenseNo').val();
        
        
      var json_data =
         {
            'mobile':mobile,
            'foodLicenseNo':foodLicenseNo,
            
          }   


       console.log(json_data);
 
       $.ajax({
            type:'post',
            data: JSON.stringify(json_data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url:' https://mom-apicalls.appspot.com/api/update/vendor/web/',
            success: function(result){
           $('#dlg-details').modal('hide');
              window.location.reload();
            },error:function(result){
              $('#dlg-details').modal('hide');
              $('#popup').css("display", "block");
              var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
              $('#popup').html(datavar);
              setTimeout(function(){
                $('#popup').css("display", "none");
              }, 3000);
             
             console.log(json_data)
             // alert("hey")

            }
          });
      });
    });

    }]); 


app.controller('assignorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'assignorderData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, assignorderData, $localStorage, Data, $base64) {
  var StudentData = assignorderData;
  console.log(StudentData)
  $scope.list = StudentData;
  var productlist = [];
  $.each($scope.list, function(idx2, val2) {
    var str = val2;
    productlist.push(str);
  });
  console.log(productlist.join(", "));
  var data = productlist.join(", ");
  $scope.productlist = data;
  console.log(data, $scope.productlist);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['firstName'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['orderId'], StudentData[i]['deliver_number']]);
    // '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background-color: #e9602a;border: none;padding: 3px 28px;text-align: center;text-decoration: none;display: inline-block;color:#FFF;margin: 4px 2px;cursor: pointer;-webkit-transition-duration: 0.4s; /* Safari */transition-duration: 0.4s" >Edit</button>' ,'<label class="switch"><input type="checkbox" checked onclick="toggleBox1('+ StudentData[i]['mobile']+');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser('+ StudentData[i]['mobile'] +')" style="margin-left:20px;"></i>'
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Name"
      }, {
        "title": "Address"
      }, {
        "title": "MomMobile"
      }, {
        'title': "OrderId"
      }, {
        "title": "DeliverNumber"
      },
     
      
    ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
    console.log("hii")
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
    console.log("hii")
    
  }
  $('#dlg-details').on('show.bs.modal', function(e) {
    console.log("hii")
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomName</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="firstName"  value="' + $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label>MomMobile</label>' + '<input type="text" class="form-control"    style="padding-left:10px;" id="mobile" value="' + $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomEmail</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="email" value="' + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >MomAddress</label>' + '<input type="text" class="form-control"   id="address" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >MiddleName</label>' + '<input type="text" class="form-control" value="saurabh" id="middleName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >LastName</label>' + '<input type="text" class="form-control" value="saurabh" id="lastName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control"  value="saurabh" id="image_name" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Country</label>' + '<input type="text" class="form-control" value="saurabh"  id="country" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >State</label>' + '<input type="text" class="form-control" value="saurabh" id="state" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >ZipCode</label>' + '<input type="text" class="form-control" value="saurabh" id="zipCode" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >FoodLicenseNo</label>' + '<input type="text" class="form-control" value="saurabh" id="foodLicenseNo" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Specialization</label>' + '<input type="text" class="form-control" value="saurabh" id="specialization" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Comment</label>' + '<input type="text" class="form-control" value="saurabh" id="comment" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >openTime</label>' + '<input type="text" class="form-control" value="saurabh"  id="openTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >EndTime</label>' + '<input type="text" class="form-control" value="saurabh" id="endTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >BreakStart</label>' + '<input type="text" class="form-control" value="saurabh" id="breakStart" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >BreakEnd</label>' + '<input type="text" class="form-control" value="saurabh"  id="breakEnd" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >latitude</label>' + '<input type="text" class="form-control" value="saurabh" id="latitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >longitude</label>' + '<input type="text" class="form-control"  value="saurabh" id="longitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Dob</label>' + '<input type="text" class="form-control" value="saurabh"  id="dob" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >TrackingStatus</label>' + '<input type="text" class="form-control" value="saurabh"  id="trackingStatus" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control" value="saurabh"  id="image" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >AboutMom</label>' + '<input type="text" class="form-control" value="saurabh"  id="about_mom" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[2]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
    $('#sure').click(function() {
      var firstName = $('#firstName').val();
      var mobile = $('#mobile').val();
      var email = $('#email').val();
      var address = $('#address').val();
      var middleName = $('#middleName').val();
      var image_name = $('#image_name').val();
      var country = $('#country').val();
      var state = $('#state').val();
      var zipCode = $('#zipCode').val();
      var foodLicenseNo = $('#foodLicenseNo').val();
      var specialization = $('#specialization').val();
      var comment = $('#comment').val();
      var openTime = $('#openTime').val();
      var endTime = $('#endTime').val();
      var breakStart = $('#breakStart').val();
      var breakEnd = $('#breakEnd').val();
      var latitude = $('#latitude').val();
      var longitude = $('#longitude').val();
      var lastName = $('#lastName').val();
      var dob = $('#dob').val();
      var trackingStatus = $('#trackingStatus').val();
      var image = $('#image').val();
      var about_mom = $('#about_mom').val();
      var json_data = {
        'mobile': mobile,
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
        'email': email,
        'image_name': image_name,
        'address': address,
        'country': country,
        'state': state,
        'zipCode': zipCode,
        'foodLicenseNo': foodLicenseNo,
        'dob': dob,
        'specialization': specialization,
        'comment': comment,
        'openTime': openTime,
        'endTime': endTime,
        'breakStart': breakStart,
        'breakEnd': breakEnd,
        'latitude': latitude,
        'longitude': longitude,
        'trackingStatus': trackingStatus,
        'image': image,
        'about_mom': about_mom,
      }
      console.log(json_data);
      $.ajax({
        type: 'post',
        data: JSON.stringify(json_data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: ' https://mom-apicalls.appspot.com/api/update/vendor/profile/',
        success: function(result) {
          $('#dlg-details').modal('hide');
          window.location.reload();
        },
        error: function(result) {
          $('#dlg-details').modal('hide');
          $('#popup').css("display", "block");
          var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
          $('#popup').html(datavar);
          setTimeout(function() {
            $('#popup').css("display", "none");
          }, 3000);
          console.log(json_data)
          alert("hey")
        }
      });
    });
  });
}]);
app.controller('complteCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'complteData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, complteData, $localStorage, Data, $base64) {
  var StudentData = complteData;
  console.log(StudentData)
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['total_price'], StudentData[i]['customerRating'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "OrderId"
      }, {
        "title": "Ordertime"
      }, {
        "title": "UserName"
      }, {
        "title": "Mobile"
      }, {
        'title': "OrderValue"
      }, {
        'title': "UserRating"
      }, {
        'title': "ViewDetail"
      },
     
    ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'mobile': data[3],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/completeorderdetail';
  });
}]);


app.controller('websitevendorCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'momWebsiteData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, momWebsiteData, $localStorage, Data, $base64) {
  var StudentData = momWebsiteData;
  console.log(momWebsiteData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
  
    dataArray.push([StudentData[i]['name'], StudentData[i]['phone'], StudentData[i]['email'], StudentData[i]['message'], StudentData[i]['pincode'], '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background-color: #e9602a;border: none;padding: 3px 28px;text-align: center;text-decoration: none;display: inline-block;color:#FFF;margin: 4px 2px;cursor: pointer;-webkit-transition-duration: 0.4s; /* Safari */transition-duration: 0.4s" >Edit</button>', ' <label class="switch"><input type="checkbox" onclick="toggleBox(' + StudentData[i]['mobile'] + ');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser(' + StudentData[i]['mobile'] + ')" style="margin-left:20px;"></i>']);
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        "title": "Email"
      }, {
        'title': "Message"
      }, {
        "title": "PinCode"
      },
     ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
    console.log("hii")
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
    console.log("hii")
    
  }
  $('#dlg-details').on('show.bs.modal', function(e) {
    console.log("hii")
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomName</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="firstName"  value="' + $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label>MomMobile</label>' + '<input type="text" class="form-control"    style="padding-left:10px;" id="mobile" value="' + $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomEmail</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="email" value="' + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >MomAddress</label>' + '<input type="text" class="form-control"   id="address" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >MiddleName</label>' + '<input type="text" class="form-control" value="saurabh" id="middleName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >LastName</label>' + '<input type="text" class="form-control" value="saurabh" id="lastName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control"  value="saurabh" id="image_name" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Country</label>' + '<input type="text" class="form-control" value="saurabh"  id="country" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >State</label>' + '<input type="text" class="form-control" value="saurabh" id="state" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >ZipCode</label>' + '<input type="text" class="form-control" value="saurabh" id="zipCode" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >FoodLicenseNo</label>' + '<input type="text" class="form-control" value="saurabh" id="foodLicenseNo" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Specialization</label>' + '<input type="text" class="form-control" value="saurabh" id="specialization" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Comment</label>' + '<input type="text" class="form-control" value="saurabh" id="comment" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >openTime</label>' + '<input type="text" class="form-control" value="saurabh"  id="openTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >EndTime</label>' + '<input type="text" class="form-control" value="saurabh" id="endTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >BreakStart</label>' + '<input type="text" class="form-control" value="saurabh" id="breakStart" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >BreakEnd</label>' + '<input type="text" class="form-control" value="saurabh"  id="breakEnd" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >latitude</label>' + '<input type="text" class="form-control" value="saurabh" id="latitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >longitude</label>' + '<input type="text" class="form-control"  value="saurabh" id="longitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Dob</label>' + '<input type="text" class="form-control" value="saurabh"  id="dob" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >TrackingStatus</label>' + '<input type="text" class="form-control" value="saurabh"  id="trackingStatus" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control" value="saurabh"  id="image" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >AboutMom</label>' + '<input type="text" class="form-control" value="saurabh"  id="about_mom" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[2]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
    $('#sure').click(function() {
      var firstName = $('#firstName').val();
      var mobile = $('#mobile').val();
      var email = $('#email').val();
      var address = $('#address').val();
      var middleName = $('#middleName').val();
      var image_name = $('#image_name').val();
      var country = $('#country').val();
      var state = $('#state').val();
      var zipCode = $('#zipCode').val();
      var foodLicenseNo = $('#foodLicenseNo').val();
      var specialization = $('#specialization').val();
      var comment = $('#comment').val();
      var openTime = $('#openTime').val();
      var endTime = $('#endTime').val();
      var breakStart = $('#breakStart').val();
      var breakEnd = $('#breakEnd').val();
      var latitude = $('#latitude').val();
      var longitude = $('#longitude').val();
      var lastName = $('#lastName').val();
      var dob = $('#dob').val();
      var trackingStatus = $('#trackingStatus').val();
      var image = $('#image').val();
      var about_mom = $('#about_mom').val();
      var json_data = {
        'mobile': mobile,
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
        'email': email,
        'image_name': image_name,
        'address': address,
        'country': country,
        'state': state,
        'zipCode': zipCode,
        'foodLicenseNo': foodLicenseNo,
        'dob': dob,
        'specialization': specialization,
        'comment': comment,
        'openTime': openTime,
        'endTime': endTime,
        'breakStart': breakStart,
        'breakEnd': breakEnd,
        'latitude': latitude,
        'longitude': longitude,
        'trackingStatus': trackingStatus,
        'image': image,
        'about_mom': about_mom,
      }
      console.log(json_data);
      $.ajax({
        type: 'post',
        data: JSON.stringify(json_data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: ' https://mom-apicalls.appspot.com/api/update/vendor/profile/',
        success: function(result) {
          $('#dlg-details').modal('hide');
          window.location.reload();
        },
        error: function(result) {
          $('#dlg-details').modal('hide');
          $('#popup').css("display", "block");
          var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
          $('#popup').html(datavar);
          setTimeout(function() {
            $('#popup').css("display", "none");
          }, 3000);
          console.log(json_data)
          alert("hey")
        }
      });
    });
  });
}]);
// 

app.controller('contactCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'contactData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, contactData, $localStorage, Data, $base64) {
  
  var StudentData = contactData;
  console.log(contactData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
  
    dataArray.push([StudentData[i]['name'], StudentData[i]['phone'], StudentData[i]['email'], StudentData[i]['message'], StudentData[i]['pincode'], '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background-color: #e9602a;border: none;padding: 3px 28px;text-align: center;text-decoration: none;display: inline-block;color:#FFF;margin: 4px 2px;cursor: pointer;-webkit-transition-duration: 0.4s; /* Safari */transition-duration: 0.4s" >Edit</button>', ' <label class="switch"><input type="checkbox" onclick="toggleBox(' + StudentData[i]['mobile'] + ');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser(' + StudentData[i]['mobile'] + ')" style="margin-left:20px;"></i>']);
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        "title": "Email"
      }, {
        'title': "Message"
      }, {
        "title": "PinCode"
      },
     ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
    console.log("hii")
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
    console.log("hii")
    
  }
  $('#dlg-details').on('show.bs.modal', function(e) {
    console.log("hii")
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomName</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="firstName"  value="' + $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label>MomMobile</label>' + '<input type="text" class="form-control"    style="padding-left:10px;" id="mobile" value="' + $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">MomEmail</label>' + '<input type="text" class="form-control"   style="padding-left:10px;" id="email" value="' + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >MomAddress</label>' + '<input type="text" class="form-control"   id="address" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >MiddleName</label>' + '<input type="text" class="form-control" value="saurabh" id="middleName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >LastName</label>' + '<input type="text" class="form-control" value="saurabh" id="lastName" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control"  value="saurabh" id="image_name" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Country</label>' + '<input type="text" class="form-control" value="saurabh"  id="country" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >State</label>' + '<input type="text" class="form-control" value="saurabh" id="state" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >ZipCode</label>' + '<input type="text" class="form-control" value="saurabh" id="zipCode" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >FoodLicenseNo</label>' + '<input type="text" class="form-control" value="saurabh" id="foodLicenseNo" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Specialization</label>' + '<input type="text" class="form-control" value="saurabh" id="specialization" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Comment</label>' + '<input type="text" class="form-control" value="saurabh" id="comment" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >openTime</label>' + '<input type="text" class="form-control" value="saurabh"  id="openTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >EndTime</label>' + '<input type="text" class="form-control" value="saurabh" id="endTime" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >BreakStart</label>' + '<input type="text" class="form-control" value="saurabh" id="breakStart" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >BreakEnd</label>' + '<input type="text" class="form-control" value="saurabh"  id="breakEnd" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >latitude</label>' + '<input type="text" class="form-control" value="saurabh" id="latitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >longitude</label>' + '<input type="text" class="form-control"  value="saurabh" id="longitude" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Dob</label>' + '<input type="text" class="form-control" value="saurabh"  id="dob" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >TrackingStatus</label>' + '<input type="text" class="form-control" value="saurabh"  id="trackingStatus" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >Image</label>' + '<input type="text" class="form-control" value="saurabh"  id="image" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;" >' + '<label style="padding-left:10px;" >AboutMom</label>' + '<input type="text" class="form-control" value="saurabh"  id="about_mom" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[2]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
    $('#sure').click(function() {
      var firstName = $('#firstName').val();
      var mobile = $('#mobile').val();
      var email = $('#email').val();
      var address = $('#address').val();
      var middleName = $('#middleName').val();
      var image_name = $('#image_name').val();
      var country = $('#country').val();
      var state = $('#state').val();
      var zipCode = $('#zipCode').val();
      var foodLicenseNo = $('#foodLicenseNo').val();
      var specialization = $('#specialization').val();
      var comment = $('#comment').val();
      var openTime = $('#openTime').val();
      var endTime = $('#endTime').val();
      var breakStart = $('#breakStart').val();
      var breakEnd = $('#breakEnd').val();
      var latitude = $('#latitude').val();
      var longitude = $('#longitude').val();
      var lastName = $('#lastName').val();
      var dob = $('#dob').val();
      var trackingStatus = $('#trackingStatus').val();
      var image = $('#image').val();
      var about_mom = $('#about_mom').val();
      var json_data = {
        'mobile': mobile,
        'firstName': firstName,
        'middleName': middleName,
        'lastName': lastName,
        'email': email,
        'image_name': image_name,
        'address': address,
        'country': country,
        'state': state,
        'zipCode': zipCode,
        'foodLicenseNo': foodLicenseNo,
        'dob': dob,
        'specialization': specialization,
        'comment': comment,
        'openTime': openTime,
        'endTime': endTime,
        'breakStart': breakStart,
        'breakEnd': breakEnd,
        'latitude': latitude,
        'longitude': longitude,
        'trackingStatus': trackingStatus,
        'image': image,
        'about_mom': about_mom,
      }
      console.log(json_data);
      $.ajax({
        type: 'post',
        data: JSON.stringify(json_data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: ' https://mom-apicalls.appspot.com/api/update/vendor/profile/',
        success: function(result) {
          $('#dlg-details').modal('hide');
          window.location.reload();
        },
        error: function(result) {
          $('#dlg-details').modal('hide');
          $('#popup').css("display", "block");
          var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
          $('#popup').html(datavar);
          setTimeout(function() {
            $('#popup').css("display", "none");
          }, 3000);
          console.log(json_data)
          alert("hey")
        }
      });
    });
  });
}]);




app.controller('approvedCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'approveData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, approveData, $localStorage, Data, $base64) {
  var StudentData = approveData;
  console.log(StudentData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['id'], StudentData[i]['name'], StudentData[i]['email'], StudentData[i]['mobile'], '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Id"
      }, {
        "title": "Name"
      }, {
        "title": "Email"
      },
      
      {
        "title": "Mobile"
      }, {
        "title": "Detail"
      },
    ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'id': data[0],
      'name': data[1],
      'mobile': data[3],
      'email': data[2],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/partnerprofile';
  });




}]);

app.controller('partnerprofileCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  console.log($localStorage.report_json_data.mobile);
  console.log($localStorage.report_json_data.email);
  var mobile = $localStorage.report_json_data.mobile;
  var email = $localStorage.report_json_data.email;
  var name = $localStorage.report_json_data.name;
  $scope.Mob = mobile;
  $scope.Ema = email;
  $scope.Name = name;
  var json_data = {
    'mobile': mobile,
    'email': email,
    'name': name,
  }
  console.log(json_data)
  Data.reportViewGenerateData(json_data).then(function(response) {
    console.log(response);
    $scope.lists = response[0];
    // alert("hey") 
    console.log(hey);
  })
  Data.reportViewGenerateData1(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[0];
    // alert("hii") 
    console.log(hey);
  })    
  Data.totalData(json_data).then(function(response) {
    console.log(json_data)
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    console.log(response);
   
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['item_id'], StudentData[i]['food_item'], StudentData[i]['itemActualPrice'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['type'], '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/payment.png) !important;background-size: 34px !important;padding-top:29px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "columnDefs": [{
        "visible": false,
        "targets": 7
      }],
      "colReorder": true,
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "responsive": true,
      "columns": [{
        "title": "OrderId"
      }, {
        "title": "FoodItem"
      }, {
        'title': "Itemactualprice"
      }, {
        "title": "Location"
      }, {
        "title": "Mom Mobile"
      }, {
        "title": "Type"
      }, {
        "title": "PaymentDetails"
      }, ]
    })
  });
  $scope.dataloading = true;
  $scope.dataloadingcontent = "";
  $rootScope.isAccount = false;
  $scope.mapview = false;
  $scope.inputview = false;
  $scope.controlview = false;
  $scope.twiceview = false;
  $scope.restview = false;
  $rootScope.header = 'Reports';
  $rootScope.subheader = 'Customize Variables To Generate';
  $rootScope.filterBtn = false;
}]);



app.controller('addMenuCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'partnerData1', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, partnerData1, $localStorage, Data, $base64) {
  var StudentData = partnerData1;
  console.log(StudentData)
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "columnDefs": [{
      "visible": false,
      "targets": 5
    }],
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Id"
      }, {
        "title": "Email"
      }, {
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        'title': "List"
      },
     ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    console.log("hii");
    $localStorage.report_json_data = {
      'mobile': data[3],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/menu';
  });
}]);

app.controller('runningorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'partnerData2', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, partnerData2, $localStorage, Data, $base64) {
  var StudentData = partnerData2;
  console.log(StudentData)
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "columnDefs": [{
      "visible": false,
      "targets": 5
    }],
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Id"
      }, {
        "title": "Email"
      }, {
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        'title': "List"
      },
     
    ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'mobile': data[3],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/runningordercur';
  });
}]);


app.controller('menuCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $timeout, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/addLead');
  }
  console.log($localStorage.report_json_data.mobile);
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.orderList(json_data).then(function(response) {
   
    console.log(response);
    $scope.list = response;
    console.log($scope.list);
    $scope.list = Data.itemId;
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['orderId'], StudentData[i]['latitude'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['name'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
          "title": "OrderId"
        }, {
          "title": "Latitude"
        }, {
          "title": "Location"
        }, {
          "title": "MomMobile"
        }, {
          'title': "Name"
        }, {
          'title': "OrderDetail"
        },
      
      ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[3],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/orderdetail';
     
    });
  })
}]);
app.controller('runningordercurCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $timeout, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/runningorder');
  }
  console.log($localStorage.report_json_data.mobile);
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.runningList(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[3];
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['orderId'], StudentData[i]['latitude'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['name'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
          "title": "OrderId"
        }, {
          "title": "Latitude"
        }, {
          "title": "Location"
        }, {
          "title": "MomMobile"
        }, {
          'title': "Name"
        }, {
          'title': "OrderDetail"
        },

      ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[3],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/orderdetail';
      });
  })
}]);
app.controller('completeordercurCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $timeout, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/completeorder');
  }
  
  console.log($localStorage.report_json_data.mobile);
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.completeList(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[3];
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['orderId'], StudentData[i]['latitude'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['name'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
          "title": "OrderId"
        }, {
          "title": "Latitude"
        }, {
          "title": "Location"
        }, {
          "title": "MomMobile"
        }, {
          'title': "Name"
        }, {
          'title': "OrderDetail"
        },
        
      ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[3],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/orderdetail';
      });
  })
}]);
app.controller('userCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', '$timeout', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, $timeout, Data, $base64) {
  $scope.AddUser = function() {
    
    var json_data = {
      'name': $scope.name,
      'email': $scope.email,
      'username': $scope.username,
      'password': $scope.password,
    }
    console.log(json_data)
    Data.AddUser(json_data).then(function(response) {
      $scope.alertmsg = "Succefully Submitted!!";
      $timeout(function() {
        $scope.alertshow = true;
        $state.go($state.current, $state.params, {
          reload: true
        });
      }, 2000);
    }).catch(function(response) {
      $scope.alertmsg = "User Already Exist!!";
      $scope.alertshow = true;
    });
  };
}]);
app.controller('listvCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'ViewData', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, ViewData, Data, $base64) {
  var StudentData = ViewData;
 console.log(StudentData)
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "columnDefs": [{
      "visible": false,
      "targets": 5
    }],
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Id"
      }, {
        "title": "Email"
      }, {
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        'title': "List"
      },
     
    ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'mobile': data[3],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/menulist';
  });
}]);
app.controller('deliverylistvCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'deliveryData', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, deliveryData, Data, $base64) {
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  
  var StudentData = deliveryData;
  console.log(StudentData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    
    dataArray.push([StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['address'], StudentData[i]['driveringLicense'], '<button type="button" class="btn-details" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/edit.png) !important;margin-left:-22px!important;background-size: 34px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>',]);
    
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
   
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "columns": [{
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        "title": "Address"
      }, {
        'title': "DrivingLicence"
      }, {
        'title': "Edit"
      },
      
    ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
    
  }
  
  $('#dlg-details').on('show.bs.modal', function(e) {
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + 
    '<input type="text" class="form-control" id="name" disabled="true"  ng-model="name" value="' +
     $('<div/>').text(data[0]).html() + '" style="display:none">' + '<div class="col-md-6">' +
      '<label style="padding-left:10px;">Name</label>' + 
      '<input type="text" class="form-control" style="padding-left:10px;" id="name"  value="' +
       $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + 
       '<label>Mobile</label>' + 
       '<input type="text" class="form-control" style="padding-left:10px;" id="mobile" disabled value="'  +
        $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' +
         '<div class="col-md-6">' + '<label style="padding-left:10px;">Address</label>' +
          '<input type="text" class="form-control"style="padding-left:10px;" id="address" value="' 
          + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' +
           '<label style="padding-left:10px;" >Driving Licence</label>' + 
           '<input type="text" class="form-control" id="driveringLicense" style="padding-left:10px;" value="' +
            $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>'
             + '<div class="row" style="padding-top:20px;padding-bottom:20px;">' + 
             '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Aadhar No</label>' +
              '<input type="text" class="form-control" id="aadharNo" style="padding-left:10px;" value="'
               + $('<div/>').text(data[4]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[5]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
   
    $('#sure').click(function() {
    
      var name = $('#name').val();
      var address = $('#address').val();
      var mobile = $('#mobile').val();
       
        var driveringLicense = $('#driveringLicense').val();
       // alert(driveringLicense)
      
      $scope.companyName = '';
      $scope.vehicleNo = '';
       $scope.aadharNo = '';
      $scope.image = '';
      

      var json_data = {

        
        'image': $scope.image,
        'mobile':mobile,
        'name': name,
        'address': address,
        'driveringLicense': driveringLicense,
       
        'aadharNo': $scope.aadharNo,
        'vehicleNo': $scope.vehicleNo,
         'companyName': $scope.companyName
        
      }
     
    // alert("success")
 $.ajax({

            type:'post',
            data: JSON.stringify(json_data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url:' http://mom-apicalls.appspot.com/dashboard/delivery/edit/',
            success: function(result){
            
           $('#dlg-details').modal('hide');
              window.location.reload();
              // alert("sucess")
            },error:function(result){

              $('#dlg-details').modal('hide');
              $('#popup').css("display", "block");
              var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
              $('#popup').html(datavar);
              setTimeout(function(){
                $('#popup').css("display", "none");
              }, 3000);
             
             console.log(json_data)
             // alert("hey")

        }
      });
    });
  });
}]);
app.controller('listCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'listData', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, listData, Data, $base64) {
  var StudentData = listData;
  console.log(StudentData);
  // alert(JSON.stringify(StudentData))
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    if (StudentData[i]['status'] === 1) {
      console.log(StudentData[i]['status'])
      dataArray.push([StudentData[i]['offer_name'], StudentData[i]['offer_type'], StudentData[i]['discount'], StudentData[i]['maxdiscount'], StudentData[i]['promocode'], '<label class="switch"><input type="checkbox" checked onclick="toggleBox1(' + StudentData[i]['id'] + ');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser(' + StudentData[i]['id'] + ')" style="margin-left:20px;"></i>']);

    } else {
      dataArray.push([StudentData[i]['offer_name'], StudentData[i]['offer_type'], StudentData[i]['discount'], StudentData[i]['maxdiscount'], StudentData[i]['promocode'], '<label class="switch"><input  onclick="toggleBox(' + StudentData[i]['id'] + ');"><span class="slider round"></span></label><i class="fa fa-trash w3-xlarge" onclick="deleteuser(' + StudentData[i]['id'] + ')" style="margin-left:20px;"></i>']);
      

    }
  }
  
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "Offername"
      }, {
        "title": "Offertype"
      }, {
        "title": "Discount"
      }, {
        'title': "maxdiscount"
      },
      //  {
      //   'title': "Validto"
      // },
       {
        "title": "PromoCode"
      },
      
      {
        "title": "Status"
      },
    ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
    
  }
  
  $('#dlg-details').on('show.bs.modal', function(e) {
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + '<input type="text" class="form-control" id="id" disabled="true"  ng-model="id" value="' + $('<div/>').text(data[0]).html() + '" style="display:none">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">Offer Name</label>' + '<input type="text" class="form-control" style="padding-left:10px;" id="offer_name"  value="' + $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label>Offer Type</label>' + '<input type="text" class="form-control" style="padding-left:10px;" id="offer_type" value="' + $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">Discount</label>' + '<input type="text" class="form-control"style="padding-left:10px;" id="ValidityDays" value="' + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Maximum Discount</label>' + '<input type="text" class="form-control" id="maxdiscount" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>' + '<div class="row" style="padding-top:20px;padding-bottom:20px;">' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Valid Up To</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="valid_to" value="' + $('<div/>').text(data[4]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="mobile" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="status" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="image" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="pvalues" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="chefPart" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="momPart" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="minVal" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="maxVal" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[5]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
    $('#sure').click(function() {
      var id = $('#id').val();
      var offer_name = $('#offer_name').val();
      var category = $('#offer_type').val();
      var ageing = $('#discount').val();
      var ValidityDays = $('#maxdiscount').val();
      var insuranceAmount = $('#valid_to').val();
      var premium = $('#promoCode').val();
      var ssMargin = $('#mobile').val();
      var scheme = $('#status').val();
      var model = $('#pvalues').val();
      var model = $('#chefPart').val();
      var model = $('#momPart').val();
      var model = $('#minVal').val();
      var model = $('#maxVal').val();
      var json_data = {
        'id': id,
      }
      $.ajax({
        type: 'post',
        data: JSON.stringify(json_data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: 'https://mom-apicalls.appspot.com/api/update/offer/section/',
        success: function(result) {
          $('#dlg-details2').modal('hide');
          window.location.reload();
        },
        error: function(result) {
          $('#dlg-details2').modal('hide');
          $('#popup').css("display", "block");
          var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
          $('#popup').html(datavar);
          setTimeout(function() {
            $('#popup').css("display", "none");
          }, 3000);
          // alert("hey")
          console(json_data)
        }
      });
    });
  });
}]);
app.controller('momchefCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  console.log($localStorage.report_json_data.mobile);
  console.log($localStorage.report_json_data.email);
  var mobile = $localStorage.report_json_data.mobile;
  
  var json_data = {
    'mobile': mobile,
  }
  
  console.log(json_data)
  Data.momchefdata(json_data).then(function(response) {
    console.log(response);
    $scope.lists = response[0];
    
    console.log(hey);
  })
  Data.reportViewGenerateData1(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[0];
   
    console.log(hey);
  })
  
  var mobile = $localStorage.report_json_data.mobile;
  var json_data = {
    'mobile': mobile,
  }
  Data.momcheforder(json_data).then(function(response) {
    console.log(json_data)
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    console.log(response);
    /*code*/
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['orderId'], StudentData[i]['mobile'], StudentData[i]['orderStatus'], '<button type="button" class="mybtn" data-target="/#!/main/orderdetail" onclick="function(' + StudentData[i]['mobile'] + ')"; class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', '<button type="submit" class="mybtn" data-target="/#!/main/momchef" onclick="function(' + StudentData[i]['mobile'] + ')"; style="background: url(../images/payment.png) !important;background-size: 34px !important;padding-top:45px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "columnDefs": [{
        "visible": false,
        "targets": 5
      }],
      "colReorder": true,
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "responsive": true,
      "columns": [{
        "title": "OrderId"
      }, {
        "title": "Mobile"
      }, {
        'title': "Status"
      }, {
        'title': "OrderDetail"
      }, {
        "title": "PaymentDetails"
      }, ]
    })
    $('.mybtn').on('click', function(event) {
      event.preventDefault();
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[1],
      }
      
      var url = $(this).data('target');
      location.replace(url);
    });
  });
  $scope.dataloading = true;
  $scope.dataloadingcontent = "";
  $rootScope.isAccount = false;
  $scope.mapview = false;
  $scope.inputview = false;
  $scope.controlview = false;
  $scope.twiceview = false;
  $scope.restview = false;
  $rootScope.header = 'Reports';
  $rootScope.subheader = 'Customize Variables To Generate';
  $rootScope.filterBtn = false;
}]);
app.controller('menulistCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $timeout, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/runningorder');
  }
  
  console.log($localStorage.report_json_data.mobile);
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.menuList(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[3];
    
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['food_type'], StudentData[i]['itemGroup'], StudentData[i]['itemName'], StudentData[i]['itemDescription'], StudentData[i]['halfPrice'], StudentData[i]['itemPreparationTime'], ]);
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
        "title": "FoodType"
      }, {
        "title": "itemGroup"
      }, {
        "title": "ItemName"
      }, {
        'title': "ItemDescription"
      }, {
        'title': "FullPrice"
      }, {
        'title': "ItemPreparationTime"
      }, {
        "title": "Image",
        "render": function(data, type, full, meta) {
          return '<img class="zoom btn-details" style="height:50px"  src="https://firebasestorage.googleapis.com/v0/b/momvendor.appspot.com/o/documents%2F9164150850-item?alt=media&token=abdeaf04-c32f-4fae-984f-48b05a5baf35' + data + '"/>';
        },
        "orderable": true,
        "searchable": true
      }, ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'Id': data[0],
        'companyName': data[1],
        'Email': data[2],
        'Address': data[3],
        'createdAt': data[4],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/editcompany';
    });
  })
}]);
app.controller('orderdetailCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  console.log($localStorage.report_json_data.mobile);
  console.log($localStorage.report_json_data.email);
  var mobile = $localStorage.report_json_data.mobile;
  var email = $localStorage.report_json_data.email;
  var name = $localStorage.report_json_data.name;
  $scope.Mob = mobile;
  $scope.Ema = email;
  $scope.Name = name;
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.orderDetail(json_data).then(function(response) {
    console.log(response);
    $scope.itemId = response[0].productList[0].itemId;
    $scope.food_item = response[0].productList[0].food_item;
    $scope.quantity = response[0].productList[0].quantity;
    $scope.pType = response[0].productList[0].pType;
    $scope.image = response[0].productList[0].image;
    
  })
}]);

app.controller('uassignorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'notassignData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, notassignData, $localStorage, Data, $base64) {
 
  var StudentData = notassignData;
  console.log(StudentData);
  $scope.list = StudentData;
  var productlist = [];
  $.each($scope.list, function(idx2, val2) {
    var str = val2;
    productlist.push(str);
  });
  var data = productlist.join(", ");
  $scope.productlist = data;
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['orderId'], StudentData[i]['mobile'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['name'], '<button type="button" class="mybtn" class="tooltip" data-target="/#!/main/deliverylistassign" onclick="function(' + StudentData[i]['mobile'] + ')"; style="background: url(../images/search.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', '<button type="button" class="mybtn" class="tooltip" data-target="/#!/main/uassignorderdetail" onclick="function(' + StudentData[i]['mobile'] + ')"; style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>'], );
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
   
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "OrderId"
      }, {
        "title": "CustomerMobile"
      }, {
        "title": "Location"
      }, {
        "title": "MomMobile"
      }, {
        'title': "Name"
      }, {
        'title': "SearchDeliveryBoy"
      }, {
        'title': "OrderDetail"
      },
      
    ]
  });
  $('#example').on('click', 'button', function() {
    event.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'orderId': data[0],
      'mom_mobile': data[3],
    }
    
    var url = $(this).data('target');
    location.replace(url);
  });
}]);
app.controller('deliverylistassignCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'deliverylistassignData', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, deliverylistassignData, Data, $base64) {
  console.log($localStorage.report_json_data);
  var mom_mobile = $localStorage.report_json_data.mom_mobile;
  var orderId = $localStorage.report_json_data.orderId;
  var StudentData = deliverylistassignData;
  console.log(StudentData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['address'], StudentData[i]['driveringLicense'], StudentData[i]['aadharNo'], '<button type="button" class="mybtn" class="tooltip" data-target="/#!/main/assignorder" onclick="function(' + StudentData[i]['mobile'] + ')";  style="background: url(../images/assign.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ]);
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
   
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "columns": [{
        "title": "Name"
      }, {
        "title": "Mobile"
      }, {
        "title": "Address"
      }, {
        'title': "DrivingLicence"
      }, {
        'title': "AadharNo"
      }, {
        'title': "Assign"
      },
     
    ]
  });
  $('#example').on('click', 'button', function() {
    event.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    json_data = {
      'mobile': data[1],
      'orderId': orderId
    }
    Data.AssignDeliver(json_data).then(function(response) {
      window.location.href = '/#!/main/uassignorder';
    })
  });
}]);
app.controller('priceCtrl', ['$scope', '$rootScope', '$location', '$cookies', '$localStorage', 'priceData', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, $localStorage, priceData, Data, $base64) {
 
  var StudentData = priceData;
  console.log(StudentData);
  var length = StudentData.length;
  $scope.total = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['orderId'], StudentData[i]['totalPrice'], StudentData[i]['chefPrice'], StudentData[i]['momPrice'], StudentData[i]['packagingCharge'], StudentData[i]['discountAmount'], StudentData[i]['taxAmount'], StudentData[i]['subTotal'], StudentData[i]['deleveryCharge'], StudentData[i]['couponApplied'], StudentData[i]['chefCouponApplied'], StudentData[i]['momCouponAmount'],StudentData[i]['Status']
      
    ]);
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "responsive": true,
    "columns": [{
        "title": "OrderId"
      }, 

       {
        "title": "TotalPrice"
      }, 
      {
        "title": "ChefShare"
      }

      , {
        "title": "MomShare"
      },

      {
        'title': "PackagingCharge"
      }, 
       {
        "title": "DiscountAmount"
      },

      {
        "title": "TaxAmount"
      },

       {
        "title": "SubTotal"
      },
       {
        "title": "DeliveryCharge"
      },

      {
        'title': "CouponApplied"
      }, {
        "title": "ChefCouponApplied"
      }, {
        "title": "MomCouponAmount"
      },
      {
        "title":"Status"
      }
      
    ]
  });
  $('#example').on('click', '.btn-details', function() {
    showModalDialog(this);
  });

  function showModalDialog(elBtn) {
    $('#dlg-details').data('btn', elBtn);
   
  }
  
  $('#dlg-details').on('show.bs.modal', function(e) {
    var $dlg = $(this);
    var $tr = $($dlg.data('btn')).closest('tr');
    var $table = $($dlg.data('btn')).closest('table');
    var data = $table.DataTable().row($tr).data();
    var html = '<form>' + '<div class="row" style="margin-top:25px;padding-bottom:20px;">' + '<input type="text" class="form-control" id="id" disabled="true"  ng-model="id" value="' + $('<div/>').text(data[0]).html() + '" style="display:none">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">Offer Name</label>' + '<input type="text" class="form-control" style="padding-left:10px;" id="offer_name"  value="' + $('<div/>').text(data[0]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label>Offer Type</label>' + '<input type="text" class="form-control" style="padding-left:10px;" id="offer_type" value="' + $('<div/>').text(data[1]).html() + '">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-md-6">' + '<label style="padding-left:10px;">Discount</label>' + '<input type="text" class="form-control"style="padding-left:10px;" id="ValidityDays" value="' + $('<div/>').text(data[2]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Maximum Discount</label>' + '<input type="text" class="form-control" id="maxdiscount" style="padding-left:10px;" value="' + $('<div/>').text(data[3]).html() + '">' + '</div>' + '</div>' + '<div class="row" style="padding-top:20px;padding-bottom:20px;">' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Valid Up To</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="valid_to" value="' + $('<div/>').text(data[4]).html() + '">' + '</div>' + '<div class="col-md-6">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="promoCode" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="mobile" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="status" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="image" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="pvalues" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="chefPart" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="momPart" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="minVal" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '<div class="col-md-6" style="display:none;">' + '<label style="padding-left:10px;" >Promo Code</label>' + '<input type="text" class="form-control"style="padding-left:10px;"  id="maxVal" value="' + $('<div/>').text(data[5]).html() + '">' + '</div>' + '</form>';
    $('h5', $dlg).html(data[5]);
    $('.modal-body', $dlg).html(html);
  })
  $(document).ready(function() {
    $('#sure').click(function() {
      var id = $('#offer_name').val();
      var category = $('#offer_type').val();
      var ageing = $('#discount').val();
      var ValidityDays = $('#maxdiscount').val();
      var insuranceAmount = $('#valid_to').val();
      var premium = $('#promoCode').val();
      var ssMargin = $('#mobile').val();
      var scheme = $('#status').val();
      var model = $('#pvalues').val();
      var model = $('#chefPart').val();
      var model = $('#momPart').val();
      var model = $('#minVal').val();
      var model = $('#maxVal').val();
      var json_data = {
        'id': id,
        'category': category,
        'ageing': ageing,
        'ValidityDays': ValidityDays,
        'insuranceAmount': insuranceAmount,
        'premium': premium,
        'ssMargin': ssMargin,
        'scheme': scheme,
        'model': model
      }
      $.ajax({
        type: 'post',
        data: JSON.stringify(json_data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: 'http://mom-apicalls.appspot.com/api/update/offer/section/',
        success: function(result) {
          $('#dlg-details2').modal('hide');
          window.location.reload();
        },
        error: function(result) {
          $('#dlg-details2').modal('hide');
          $('#popup').css("display", "block");
          var datavar = '<p style="color:red; background-color:white; width:30%; padding:2%">Sorry something is wrong</p>';
          $('#popup').html(datavar);
          setTimeout(function() {
            $('#popup').css("display", "none");
          }, 3000);
        }
      });
    });
  });
}]);

app.controller('uassignorderdetailCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  console.log($localStorage.report_json_data.mobile);
  console.log($localStorage.report_json_data.email);
  var mobile = $localStorage.report_json_data.mobile;
  var email = $localStorage.report_json_data.email;
  var name = $localStorage.report_json_data.name;
  $scope.Mob = mobile;
  $scope.Ema = email;
  $scope.Name = name;
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.orderDetail(json_data).then(function(response) {
    console.log(response);
    $scope.itemId = response[0].productList[0].itemId;
    $scope.food_item = response[0].productList[0].food_item;
    $scope.quantity = response[0].productList[0].quantity;
    $scope.pType = response[0].productList[0].pType;
    $scope.image = response[0].productList[0].image;
    
  })
}]);

app.controller('orderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'neworderData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, neworderData, $localStorage, Data, $base64) {
  
  var StudentData = neworderData;
  console.log(neworderData)
  var length = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['firstName'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
  }
  $.fn.dataTable.ext.errMode = 'none';
  $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
    console.log('An error has been reported by DataTables: ', message);
  });
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "columns": [{
      "title": "OrderId"
    }, {
      "title": "OrderTime"
    }, {
      "title": "UserName"
    }, {
      "title": "MomMobile"
    }, {
      'title': "VendorName"
    }, {
      'title': "OrderValue"
    }, {
      'title': "ViewDetail"
    }, ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'mobile': data[3],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/neworderdetail';
  });
  $scope.orderInfo = function() {
    var name = document.getElementById('name').value;
    if (name === "CompletOrder") {
      Data.complteData().then(function(response) {
      console.log(response);
      $scope.list = response;
      console.log($scope.list);
      $scope.list = Data.itemId;
      var StudentData = response;
      var length = StudentData.length;
      $scope.total = StudentData.length;
      var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['total_price'], StudentData[i]['customerRating'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
         
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "OrderId"
            }, {
              "title": "Ordertime"
            }, {
              "title": "UserName"
            }, {
              "title": "Mobile"
            }, {
              'title': "OrderValue"
            }, {
              'title': "UserRating"
            }, {
              'title': "ViewDetail"
            },
            
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/orderdetail';
          
        });
      })
      
    } else if (name === "NewOrder") {
      Data.notassignData().then(function(response) {
        
        console.log(response);
        $scope.list = response;
        console.log($scope.list);
        $scope.list = Data.itemId;
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['vendor_name'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
          
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "OrderId"
            }, {
              "title": "OrderTime"
            }, {
              "title": "UserName"
            }, {
              "title": "MomMobile"
            }, {
              'title': "VendorName"
            }, {
              'title': "OrderValue"
            }, {
              'title': "ViewDetail"
            },
           
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/orderdetail';
          
        });
      })
    } else if (name === "CancelOrder") {
      Data.cancelData().then(function(response) {
        
        console.log(response);
        $scope.list = response;
        console.log($scope.list);
        
        $scope.list = Data.itemId;
        
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['total_price'], StudentData[i]['customerRating'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
          
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "OrderId"
            }, {
              "title": "Ordertime"
            }, {
              "title": "UserName"
            }, {
              "title": "Mobile"
            }, {
              'title': "OrderValue"
            }, {
              'title': "UserRating"
            }, {
              'title': "ViewDetail"
            },
            
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/orderdetail';
          
        });
      })
    } else if (name === "RunningOrder") {
      Data.assignData().then(function(response) {
        
        console.log(response);
        $scope.list = response;
        console.log($scope.list);
        
        $scope.list = Data.itemId;
        
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['orderId'], StudentData[i]['createdAt'], StudentData[i]['name'], StudentData[i]['mobile'], StudentData[i]['total_price'], StudentData[i]['customerRating'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
         
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "OrderId"
            }, {
              "title": "Ordertime"
            }, {
              "title": "UserName"
            }, {
              "title": "Mobile"
            }, {
              'title': "OrderValue"
            }, {
              'title': "UserRating"
            }, {
              'title': "ViewDetail"
            },
            
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/orderdetail';
          // alert(JSON.stringify($localStorage.report_json_data));
        });
      })
    }
  };
}]);
app.controller('completeorderdetailCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  console.log($localStorage.report_json_data.mobile);
  console.log($localStorage.report_json_data.email);
  var mobile = $localStorage.report_json_data.mobile;
  var email = $localStorage.report_json_data.email;
  var name = $localStorage.report_json_data.name;
  $scope.Mob = mobile;
  $scope.Ema = email;
  $scope.Name = name;
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.orderDetail(json_data).then(function(response) {
    console.log(response);
    $scope.itemId = response[0].productList[0].itemId;
    $scope.food_item = response[0].productList[0].food_item;
    $scope.quantity = response[0].productList[0].quantity;
    $scope.pType = response[0].productList[0].pType;
    $scope.image = response[0].productList[0].image;
    
  })
}]);
app.controller('vendorwiseorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'neworderData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, neworderData, $localStorage, Data, $base64) {
  Data.partnerData2().then(function(response) {
    console.log(response);
    $scope.list = response;
    console.log($scope.list);
    $scope.list = Data.itemId;
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
          "title": "Id"
        }, {
          "title": "Email"
        }, {
          "title": "Name"
        }, {
          "title": "Mobile"
        }, {
          'title': "List"
        },
       
      ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[3],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/runningordercur';
    });
  })
  $scope.orderInfo = function() {
    var name = document.getElementById('name').value;
    if (name === "CompletOrder") {
      Data.partnerData3().then(function(response) {
        console.log(response);
        $scope.list = response;
        console.log($scope.list);
        $scope.list = Data.itemId;
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "Id"
            }, {
              "title": "Email"
            }, {
              "title": "Name"
            }, {
              "title": "Mobile"
            }, {
              'title': "List"
            },
            
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/completeordercur';
        });
      })
      
    } else if (name === "NewOrder") {
      Data.partnerData3().then(function(response) {
      console.log(response);
      $scope.list = response;
      console.log($scope.list);
      $scope.list = Data.itemId;
      var StudentData = response;
      var length = StudentData.length;
      $scope.total = StudentData.length;
      var dataArray = [];
      for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "Id"
            }, {
              "title": "Email"
            }, {
              "title": "Name"
            }, {
              "title": "Mobile"
            }, {
              'title': "List"
            },
           
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/neworderdetail';
        });
      })
      
    } else if (name === "CancelOrder") {
      Data.partnerData2().then(function(response) {
       console.log(response);
       $scope.list = response;
        console.log($scope.list);
        $scope.list = Data.itemId;
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "Id"
            }, {
              "title": "Email"
            }, {
              "title": "Name"
            }, {
              "title": "Mobile"
            }, {
              'title': "List"
            },
           
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/cancelordercur';
        });
      })
    } else if (name === "RunningOrder") {
      Data.partnerData2().then(function(response) {
        console.log(response);
        $scope.list = response;
        console.log($scope.list);
        $scope.list = Data.itemId;
        var StudentData = response;
        var length = StudentData.length;
        $scope.total = StudentData.length;
        var dataArray = [];
        for (var i = 0; i < length; i++) {
          dataArray.push([StudentData[i]['id'], StudentData[i]['email'], StudentData[i]['firstName'], StudentData[i]['mobile'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/viewe.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
        }
        $.fn.dataTable.ext.errMode = 'none';
        $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
          console.log('An error has been reported by DataTables: ', message);
        });
        $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
        var table = $('#example').DataTable({
          "scrollX": true,
          "data": dataArray,
          "colReorder": true,
          "buttons": ['copy', 'excel', 'pdf', 'colvis'],
          "dom": 'Blfrtip',
         
          "lengthMenu": [
            [10, 15, 20, -1],
            [10, 15, 20, "All"]
          ],
          "columns": [{
              "title": "Id"
            }, {
              "title": "Email"
            }, {
              "title": "Name"
            }, {
              "title": "Mobile"
            }, {
              'title': "List"
            },
           
          ]
        });
        $('#example').on('click', 'button', function() {
          var data = table.row($(this).parents('tr')).data();
          $localStorage.report_json_data = {
            'mobile': data[3],
          }
          console.log($localStorage.report_json_data);
          window.location.href = '/#!/main/runningordercur';
        });
      })
    }
  };
}]);
app.controller('cancelordercurCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $timeout, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/cancelorder');
  }
 
  console.log($localStorage.report_json_data.mobile);
  var mobile = $localStorage.report_json_data.mobile
  var json_data = {
    'mobile': mobile,
  }
  console.log(json_data)
  Data.runningList(json_data).then(function(response) {
    console.log(response);
    $scope.list = response[3];
    var StudentData = response;
    var length = StudentData.length;
    $scope.total = StudentData.length;
    var dataArray = [];
    for (var i = 0; i < length; i++) {
      dataArray.push([StudentData[i]['orderId'], StudentData[i]['latitude'], StudentData[i]['location'], StudentData[i]['mom_mobile'], StudentData[i]['name'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    $.fn.dataTable.ext.errMode = 'none';
    $('#runningOrdersTable').on('error.dt', function(e, settings, techNote, message) {
      console.log('An error has been reported by DataTables: ', message);
    });
    $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
    var table = $('#example').DataTable({
      "scrollX": true,
      "data": dataArray,
      "colReorder": true,
      "buttons": ['copy', 'excel', 'pdf', 'colvis'],
      "dom": 'Blfrtip',
      "lengthMenu": [
        [10, 15, 20, -1],
        [10, 15, 20, "All"]
      ],
      "columns": [{
          "title": "OrderId"
        }, {
          "title": "Latitude"
        }, {
          "title": "Location"
        }, {
          "title": "MomMobile"
        }, {
          'title': "Name"
        }, {
          'title': "OrderDetail"
        },
       
      ]
    });
    $('#example').on('click', 'button', function() {
      var data = table.row($(this).parents('tr')).data();
      $localStorage.report_json_data = {
        'mobile': data[3],
      }
      console.log($localStorage.report_json_data);
      window.location.href = '/#!/main/orderdetail';
      
    });
  })
}]);


// Saurabh Controller

app.controller('totalorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'neworderData', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, neworderData, $localStorage, Data, $base64) {
 
  var StudentData = neworderData;
  console.log(neworderData)
  var length = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    if (StudentData[i]['orderStatus'] == 0) {
      
      dataArray.push([StudentData[i]['orderId'], 'New Order', StudentData[i]['createdAt'], StudentData[i]['mobile'],StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['firstName'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    if (StudentData[i]['orderStatus'] == 1) {
      dataArray.push([StudentData[i]['orderId'], 'Accepted', StudentData[i]['createdAt'], StudentData[i]['mobile'],StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['firstName'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    if (StudentData[i]['orderStatus'] == 2) {
      dataArray.push([StudentData[i]['orderId'], 'Assigned To Pilot', StudentData[i]['createdAt'],StudentData[i]['mobile'], StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['firstName'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    if (StudentData[i]['orderStatus'] == 6) {
      dataArray.push([StudentData[i]['orderId'], 'Delivered To Pilot', StudentData[i]['createdAt'], StudentData[i]['mobile'],StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['firstName'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
  }
  

    $.fn.dataTable.ext.errMode = 'none';

    $('#runningOrdersTable').on( 'error.dt', function ( e, settings, techNote, message ) {
    console.log( 'An error has been reported by DataTables: ', message );
    } ) ;
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
   
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "columns": [{
      "title": "OrderId"
    }, {
      "title": "OrderStatus"
    }, {
      "title": "OrderTime"
    },
     {
      "title": "UserMobile"
    }, {
      "title": "UserName"
    }, {
      "title": "MomMobile"
    }, {
      'title': "VendorName"
    }, {
      'title': "OrderValue"
    }, {
      'title': "ViewDetail"
    }, ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'orderId': data[0],
      'mobile':data[3],
      'username':data[4],
      'momvendor':data[5],
      'momname':data[6]
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/neworderdetail';
  });
}]);
app.controller('neworderdetailCtrl', ['$scope', '$rootScope', '$http', '$location', 'Data', '$localStorage', function($scope, $rootScope, $http, $location, Data, $localStorage) {
  $rootScope.gotoSummaryView = function() {
    $rootScope.isViewLoading = true;
    window.location.href('/partnerprofile');
  }
  var orderId = $localStorage.report_json_data.orderId;
  $scope.mobile = $localStorage.report_json_data.mobile;
  $scope.username =$localStorage.report_json_data.username;
  $scope.momvendor=$localStorage.report_json_data.momvendor;
  $scope.momname=$localStorage.report_json_data.momname;
  $scope.order=$localStorage.report_json_data.orderId;
  var json_data = {
    'orderId': orderId,
  }
  console.log(json_data)
  Data.orderDetail(json_data).then(function(response) {
    $scope.list = response;
  })
}]);

// complete order
app.controller('completeorderCtrl', ['$scope', '$rootScope', '$location', '$cookies', 'completeOrderlist', '$localStorage', 'Data', '$base64', function($scope, $rootScope, $location, $cookies, completeOrderlist, $localStorage, Data, $base64) {
  var StudentData = completeOrderlist;
  var length = StudentData.length;
  var dataArray = [];
  for (var i = 0; i < length; i++) {
    if (StudentData[i]['orderStatus'] == 4) {
     dataArray.push([StudentData[i]['orderId'], 'Cancelled', StudentData[i]['createdAt'],StudentData[i]['mobile'], StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['mom_name'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    else  {
      dataArray.push([StudentData[i]['orderId'], 'Completed', StudentData[i]['createdAt'],StudentData[i]['mobile'], StudentData[i]['name'], StudentData[i]['mom_mobile'], StudentData[i]['mom_name'], StudentData[i]['total_price'], '<button type="button" class="btn-details"  data-backdrop="static" data-keyboard="false" data-target="#dlg-details" style="background: url(../images/download.png) !important;background-size: 34px !important;padding-top:17px !important;background-repeat: no-repeat !important;background-position: center !important; margin-bottom: 7px !important;border: white !important;-webkit-text-fill-color: rgba(236, 228, 228, 0.09) !important; ">Complete</button>', ], );
    }
    
  }
  
    $.fn.dataTable.ext.errMode = 'none';

    $('#runningOrdersTable').on( 'error.dt', function ( e, settings, techNote, message ) {
    console.log( 'An error has been reported by DataTables: ', message );
    } ) ;
  $('#runningOrdersTable').html('<table cellspacing="0" border="0" id="example" class="display" cellspacing="0" width="100%"><\/table>');
  var table = $('#example').DataTable({
    "scrollX": true,
    "data": dataArray,
    "colReorder": true,
    "buttons": ['copy', 'excel', 'pdf', 'colvis'],
    "dom": 'Blfrtip',
    "lengthMenu": [
      [10, 15, 20, -1],
      [10, 15, 20, "All"]
    ],
    "columns": [{
      "title": "OrderId"
    }, {
      "title": "OrderStatus"
    }, {
      "title": "OrderTime"
    }, 
    {
      "title": "UserMobile"
    },{
      "title": "UserName"
    }, {
      "title": "MomMobile"
    }, {
      'title': "VendorName"
    }, {
      'title': "OrderValue"
    },
     {
      'title': "ViewDetail"
    },
    {
      'title': "DeliveryBoy"
    }, ]
  });
  $('#example').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    $localStorage.report_json_data = {
      'orderId': data[0],
    }
    console.log($localStorage.report_json_data);
    window.location.href = '/#!/main/neworderdetail';
  });
}]);
