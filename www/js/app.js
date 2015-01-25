// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })
    
        .state('forgotpassword', {
          url: "/forgotpassword",
          templateUrl: "forgotpassword.html",
          controller: 'PasswordCtrl'
        })
    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'WelcomeCtrl'
        })
    
        .state('accBalance', {
          url: "/accBalance",
          templateUrl: "accBalance.html",
          controller: 'AccBalanceCtrl'
        })
		
		 .state('accStatement', {
          url: "/accStatement",
          templateUrl: "accStatement.html",
          controller: 'AccStatementCtrl'
        })
    
		 .state('fundTranster', {
			  url: "/fundTranster",
			  templateUrl: "fundTranster.html",
			  controller: 'FundTransterCtrl'
			})
			
		 .state('fundTransterRequest', {
			  url: "/fundTransterRequest",
			  templateUrl: "fundTransterRequest.html",
			  controller: 'fundTransterRequestCtrl'
			})
			
			 .state('talkTimeRecharge', {
			  url: "/talkTimeRecharge",
			  templateUrl: "talkTimeRecharge.html",
			  controller: 'talkTimeRechargetCtrl'
			})
			
			.state('stopChequeLeaf', {
			  url: "/stopChequeLeaf",
			  templateUrl: "stopChequeLeaf.html",
			  controller: 'stopChequeLeafCtrl'
			})
    
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http, $rootScope, $ionicLoading, $timeout) {
	    
    //$rootScope.getServerIp='http://10.11.201.19/';
    $rootScope.getServerIp='http://202.40.190.14:8084/'
    
    //window.addEventListener("load", initApp);
	
//    function initApp() {
//		document.getElementById("btnLogin").addEventListener("click", login);
//	}
    
	$scope.login = function (user) {
       				
		if(user.uname==""){
		alert("Please Enter Your User ID");
		}else if(user.pass==""){
			alert("Please Enter Your Password");
		}else{
		$ionicLoading.show();
					$http({
					  method: 'GET',
					 
					  url: $rootScope.getServerIp+'BankAndroidConnectivity/LoginMobiBank',
					  params: {uname:user.uname, pass:user.pass, appVersion:'MOBIBANKV1.1'},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success..."+data.loginNodes[0].errorCode);
						$ionicLoading.hide();
						if(data.loginNodes[0].errorCode != 0) {
							alert(data.loginNodes[0].errorMessage);
						} else {
							$scope.loginNodes = data.loginNodes; // response data
							//$scope.responseArr = [];
							  $rootScope.responseArr = [];
							angular.forEach(data.loginNodes, function(loginNode, index) {
								
								$rootScope.cusCode = loginNode.cusCode;
								 $rootScope.mailID = loginNode.mailID;
								 $rootScope.sessionID = loginNode.sessionID;
								 $rootScope.errorMessage = loginNode.errorMessage;
								 //alert(loginNode.mailID);
								 
								 //$rootScope.responseArr.push(loginNode); 
								$state.go('welcome');
								//alert($scope.responseArr.cusCode);
			//                  angular.forEach(loginNode.responseArr, function(loginNodeVal, index){
			//                      
			//                  });
							});                
						}            
					}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
						alert("Server is Busy. Please Wait..");
					}); 

		}
		

//		
    }
	
	 $timeout(function() {
     $ionicLoading.hide();
   }, 20000);
})

.controller('WelcomeCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup) {

	 $scope.btnLogOut = function() {		
		var confirmPopup = $ionicPopup.confirm({
			 title: 'Log out now?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {			   
			  $state.go('signin');
			 } else {
			   //console.log('You are not sure');
			 }
		   });
	 }

})

.controller('PasswordCtrl', function($scope, $state) {

//Parse.initialize("",
//                "");
//    window.addEventListener("load",initApp);
//	function initApp(){
//		document.getElementById("reset").addEventListener("click", reset);
//	}
//	function reset(){
//        email = document.getElementById('email').value;
//        Parse.User.requestPasswordReset(email, {
//          success: function() {
//            confirm('Foi enviado um email para: '+email+'/n Verifique seu email e redifina a senha!');
//          },
//          error: function(error) {
//            confirm('Aconteceu algum erro, entre em contato com o desenvolvedor!');
//          }
//        });
//    }
})

.controller('DashBoardCtrl', function($scope, $state) {
    alert("In DashBoardCtrl: ");
    //$scope.loginNode1 = $scope.loginNode;
})

.controller('AccBalanceCtrl', function($scope, $state, $http, $rootScope, $ionicLoading) {
	$ionicLoading.show();

        cusCode = $rootScope.cusCode;
		
		//mailID = $rootScope.mailID;
		//alert(mailID);
        //alert("cusCode: "+cusCode);
        $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountBalnaceSV',
          params: {cusCode:cusCode},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {
            //alert("success..."+data.accountBalanceNodes.length);  
				 $ionicLoading.hide();
            $scope.accountBalanceNodes = data.accountBalanceNodes; // response data
            $rootScope.accountBalanceNodes = data.accountBalanceNodes; // response data
            $rootScope.responseArr = [];
            angular.forEach(data.accountBalanceNodes, function(accountBalanceNode, index) {
				$scope.accountTitle=accountBalanceNode.accountTitle;
                $rootScope.responseArr.push(accountBalanceNode);                
                $state.go('accBalance');
				
            });   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
			 $ionicLoading.hide();
          alert("Server is Busy. Please Wait..");
			
        });            
})



.controller('AccStatementCtrl', function($scope, $state, $http, $rootScope,$ionicLoading) {
		$ionicLoading.show();
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
				
		 $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberListSV',
          params: {mailID:mailID,sessiongID:sessionID},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {                  
            $scope.accountTagCode = data.accountTagCode; // response data
            $rootScope.accountTagCode = data.accountTagCode; // response data
            $rootScope.responseArr = [];
            angular.forEach(data.accountTagCode, function(accountTagCode, index) {
                if(data.accountTagCode[0].sErrorCode == 0) {
					//alert('sucess');

									 $http({
									  method: 'GET',									  
									  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListSV',
									  params: {mailID:mailID,sessiongID:sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {                  
										$scope.accountListDescription = data.accountListDescription; // response data
										$rootScope.accountListDescription = data.accountListDescription; // response data
										$rootScope.responseArr = [];
										angular.forEach(data.accountListDescription, function(accountListDescription, index) {
												//alert(data.accountListDescription[0].sAccountNumber);
												 $ionicLoading.hide();
												 $rootScope.responseArr.push(accountListDescription); 
												 
												
										});   
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
									 $ionicLoading.hide();
										alert("error...");
										
									});  						
					//second prorame
							
				}else{
				$ionicLoading.hide();
				alert(data.accountTagCode[0].sSrrorMessage);
			
				}
            });   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
		  $ionicLoading.hide();
          alert("Unable to perform your request. Please Check your Device Internet Connection");			
        });   
		
		
	
    
   
                //$scope.myData = {};
                $scope.doClick = function() {
						
					 //$scope.serach.toDate = "2015.12.12"
					 var sourceAc = document.getElementById("mySelect");
					var accountno =  sourceAc.options[sourceAc.selectedIndex].value;
					//alert(selectedValue);
					fromDate=document.getElementById('fromDate').value;
					toDate=document.getElementById('toDate').value;
					//sourceAc=document.getElementById("mySelect");
					
						if(sourceAc.selectedIndex==0){
						alert("Please Select Source Account");
						}else if(fromDate==""){
						alert("Please Enter Your From Date");
						}else if(toDate==""){
						alert("Please Enter Your To Date");
						}else {
						$ionicLoading.show();
						$http({
					  method: 'GET',
					  
					  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountStatementTagCode',
					  params: {accountno:accountno,fromDate:fromDate,toDate:toDate,mailID:mailID,sessiongID:sessionID,companyCode:'001'},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
					
									//alert("success..."+data.loginNodes[0].errorCode);
							if(data.accountStatementTagCodeNodes[0].errorCode== 0) {
								//alert(data.accountStatementTagCodeNodes[0].errorMesage);
								//second request Begin
										 $http({
										  method: 'GET',									  
										  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountBalanceStatement',
										  params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
										  headers : { 'Content-Type': 'application/json' }
										}).success(function(data, status, headers, config) { 
											 $ionicLoading.hide();
											 //alert('sucess');
											$scope.accountStatementNodes = data.accountStatementNodes; // response data
											$rootScope.accountStatementNodes = data.accountStatementNodes; // response data
											$rootScope.responseArr = [];
											angular.forEach(data.accountStatementNodes, function(accountStatementNodes, index) {
												 $ionicLoading.hide();
												$rootScope.responseArr.push(accountStatementNodes);
												//aler(accountStatementNodes);
												//$state.go('accBalance');
												
											});   
										}).error(function(data, status, headers, config) {
											 $ionicLoading.hide();
											alert("Server is Busy. Please Wait..");
											
										});  	
								
								//Second request End
								
								
								
							} else {
								$ionicLoading.hide();
								alert(data.accountStatementTagCodeNodes[0].errorMesage);        
							} 
										
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
						
					});            
					// end 0
						}
					
						
					//For 0
						
					
                }
				
				
        

	
        
})

//***************Fund Transfer***************************************************************************************************************************************************************////////////
.controller('FundTransterCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter) {
		//alert("Fund Transfer");
		$ionicLoading.show();
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
        
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				
				   if(data.accountTagCode[0].sErrorCode == 0) {
				   
				   //Second Request Begin
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
							 $ionicLoading.hide();				 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountListDescription);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					alert(data.accountTagCode[0].sSrrorMessage);
					
				}
			
			}).error(function(data, status, headers, config) {
            $ionicLoading.hide();
          alert("Server is Busy. Please Wait..");
        }); 
		
		
	//************* Begin For Populate field Selecting by Source Account//****************
		
		document.getElementById("sourcecAcChangeListener").onchange = function() {
		   //setActiveStyleSheet(this.value);
		  // return false
		   $ionicLoading.show();
		  // alert(this.value);
		  var accountNo=this.value;

			$http({
				  method: 'GET',
				 
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:accountNo},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
																				 $http({
											  method: 'GET',											  
											  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsErrorCodeTagSV2',
											 // params: {cusCode:cusCode},
											  //type:'JSON',
											   params: {mailID:mailID,sessionID:sessionID,companyCode:'001',accountNo:accountNo,productCode:'FTR'},
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert(ata.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode); 
													 if(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode == 0) {
														//alert("success...");
														//*************** for Begin Destination Account List***********************
														$http({
															 method: 'GET',									  
															url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsAccountListSV',
															params: {mailID:mailID,sessionID:sessionID},
																			  //type:'JSON',
															headers : { 'Content-Type': 'application/json' }
															}).success(function(data, status, headers, config) {                  
																				 //alert('sucess');
																 $ionicLoading.hide();
															$scope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.responseArr = [];
															angular.forEach(data.destrinationaAccountListNodes, function(destrinationaAccountListNodes, index) {
																$ionicLoading.hide();
																$rootScope.responseArr.push(destrinationaAccountListNodes);
																					//aler(accountListDescription);
																					//$state.go('accBalance');
																	
																	});   
																}).error(function(data, status, headers, config) {
																	 $ionicLoading.hide();
																	alert("Server is Busy. Please Wait..");
																});  
														//*************** for End Destination Account List***********************
													}else{
													$ionicLoading.hide();
													alert(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage);
													
												}
																					
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
													alert("Server is Busy. Please Wait..");
											});  
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
			});            
		}
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		// ****************Begin For Populate field Selecting by Destination Account***************
				document.getElementById("destinationAcChangeListener").onchange = function() {
				  var destrinationAccountNo=this.value;
					//alert(destinationAccount);
					$ionicLoading.show();
					   $http({
				  method: 'GET',
			
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestrinationaAccountDestailsSelectByDestrinationAccount',
				 params: {mailID:mailID,sessionID:sessionID,destrinationAccountNo:destrinationAccountNo},
				  //type:'JSON',
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert("success...");
					$ionicLoading.hide();
						$scope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
						//$rootScope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
											//$rootScope.responseArr = [];
						angular.forEach(data.destrinationAccountDetailsSelectByDestrinationAccount, function(destrinationAccountDetailsSelectByDestrinationAccount, index) {
						 $ionicLoading.hide();
						$scope.destinationAccountTitle=destrinationAccountDetailsSelectByDestrinationAccount.accountTitle;
						$scope.destinationCurrency=destrinationAccountDetailsSelectByDestrinationAccount.accountDescription;
							
												
					});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
				});            
				}
		
		// ****************End For Populate field Selecting by Destination Account***************

		
			// ****************Begin Fund Transfer Submit Execution***************
				 $scope.doSubmit = function() {
				 
					var sourcecAcChangeListener = document.getElementById("sourcecAcChangeListener");
					var sourceAccountNo = sourcecAcChangeListener.options[sourcecAcChangeListener.selectedIndex].value;
					var amount=document.getElementById("txtFundTransferAmount").value;
					var txtFundTransferPinCode=document.getElementById("txtFundTransferPinCode").value;					
					var destinationAcChangeListener = document.getElementById("destinationAcChangeListener");
					var destrinationAcountNo = destinationAcChangeListener.options[destinationAcChangeListener.selectedIndex].value;
					var remarks=document.getElementById("txtFundTransferRemarks").value;
					//alert(destinationAccountNo);
					if(sourcecAcChangeListener.selectedIndex==0){
						//sourcecAcChangeListener.focus()
						alert("Select Source Account");
					}else if(amount==""){
						alert("Please Enter Amount");
					}else if(destinationAcChangeListener.selectedIndex==0){
							alert("Select Destination Account");
					}else if(txtFundTransferPinCode==""){
						alert("Please Enter Pin Code");
					}else{
					$ionicLoading.show();
						//*********Fund Transfer submit Begin***********
					//**********Begin First Execution *********
						$http({
							  method: 'GET',							 
							  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferExecuteTagCodeSV',
							   params: {mailID:mailID,sessionID:sessionID,password:txtFundTransferPinCode,companyCode:'001',sourceAccountNo:sourceAccountNo,amount:amount,destrinationAcountNo:destrinationAcountNo,remarks:remarks},
							 // params: {cusCode:cusCode},
							  //type:'JSON',
							  headers : { 'Content-Type': 'application/json' }
							}).success(function(data, status, headers, config) {
								//alert("success...");
									$ionicLoading.hide();
									 if(data.fundTransferExecuteTagCodeNodes[0].errorCode == 0) {
									 $ionicLoading.hide();
									 alert(data.fundTransferExecuteTagCodeNodes[0].errorMesage);
									 }else {
									  $ionicLoading.hide();
									 alert(data.fundTransferExecuteTagCodeNodes[0].errorMesage);
									 }
									
								//alert($rootScope.responseArr.toString);
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});            
										
					//**********End First Execution *********
										}
									 }
			// ****************End Fund Transfer End Submit Execution***************
	
	
})

.controller('fundTransterRequestCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter) {
//alert("Fund Transfer");
		$ionicLoading.show();
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				
				   if(data.accountTagCode[0].sErrorCode == 0) {
				   
				   //Second Request Begin
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
											 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountListDescription);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {								
								$ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					alert(data.accountTagCode[0].sSrrorMessage);
					
				}
			
			}).error(function(data, status, headers, config) {
             $ionicLoading.hide();
			alert("Server is Busy. Please Wait..");
        }); 
		
		
		//************* Begin For Populate field Selecting by Source Account//****************
		
		document.getElementById("sourcecAcChangeListener").onchange = function() {
		   //setActiveStyleSheet(this.value);
		  // return false
		   $ionicLoading.show();
		  // alert(this.value);
		  var accountNo=this.value;

			$http({
				  method: 'GET',
				 
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:accountNo},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
										$http({
											  method: 'GET',											  
											  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsErrorCodeTagSV2',
											 // params: {cusCode:cusCode},
											  //type:'JSON',
											   params: {mailID:mailID,sessionID:sessionID,companyCode:'001',accountNo:accountNo,productCode:'FTR'},
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert(ata.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode); 
													 if(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode == 0) {
														//alert("success...");
														//*************** for Begin Destination Account List***********************
														$http({
															 method: 'GET',									  
															url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsAccountListSV',
															params: {mailID:mailID,sessionID:sessionID},
																			  //type:'JSON',
															headers : { 'Content-Type': 'application/json' }
															}).success(function(data, status, headers, config) {                  
																				 //alert('sucess');
															$scope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.responseArr = [];
															angular.forEach(data.destrinationaAccountListNodes, function(destrinationaAccountListNodes, index) {
																$ionicLoading.hide();
																$rootScope.responseArr.push(destrinationaAccountListNodes);
																					//aler(accountListDescription);
																					//$state.go('accBalance');
																	
																	});   
																}).error(function(data, status, headers, config) {
																	 $ionicLoading.hide();
																	alert("Server is Busy. Please Wait..");
																});  
														//*************** for End Destination Account List***********************
													}else{
													alert(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage);
													$ionicLoading.hide();
												}
																					
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
												alert("Server is Busy. Please Wait..");
											});  
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
			});            
		}
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		// ****************Begin For Populate field Selecting by Destination Account***************
				document.getElementById("destinationAcChangeListener").onchange = function() {
				  var destrinationAccountNo=this.value;
					//alert(destinationAccount);
					$ionicLoading.show();
				 $http({
				  method: 'GET',
				  
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestrinationaAccountDestailsSelectByDestrinationAccount',
				 params: {mailID:mailID,sessionID:sessionID,destrinationAccountNo:destrinationAccountNo},
				  //type:'JSON',
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert("success...");
						$scope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
						//$rootScope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
											//$rootScope.responseArr = [];
						angular.forEach(data.destrinationAccountDetailsSelectByDestrinationAccount, function(destrinationAccountDetailsSelectByDestrinationAccount, index) {
						 $ionicLoading.hide();
						$scope.destinationAccountTitle=destrinationAccountDetailsSelectByDestrinationAccount.accountTitle;
						$scope.destinationCurrency=destrinationAccountDetailsSelectByDestrinationAccount.accountDescription;
							
												
					});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
				});            
				}
		
		// ****************End For Populate field Selecting by Destination Account***************
		
			
			// ****************Begin Submit Execution***************
				 $scope.doSubmit = function() {
				 //alert("dockil");
				
					var requestDate=document.getElementById("txtRequestDate").value;
					var sourcecAcChangeListener = document.getElementById("sourcecAcChangeListener");
					
					var sourceAccountNo = sourcecAcChangeListener.options[sourcecAcChangeListener.selectedIndex].value;
					var amount=document.getElementById("txtFundTransferAmount").value;
					//alert(amount);
					var txtFundTransferPinCode=document.getElementById("txtFundTransferPinCode").value;					
					var destinationAcChangeListener = document.getElementById("destinationAcChangeListener");
					var destrinationAcountNo = destinationAcChangeListener.options[destinationAcChangeListener.selectedIndex].value;
					var remarks=document.getElementById("txtFundTransferRemarks").value;
					//alert(destinationAccountNo);
					if(requestDate==""){
						
						alert("Enter Enter Request Date");
						
					}else if(sourcecAcChangeListener.selectedIndex==0){
						//sourcecAcChangeListener.focus()
						//$ionicLoading.hide();
						alert("Select Source Account");						
					}else if(amount==""){
						//$ionicLoading.hide();
						alert("Please Enter Amount");
					}else if(destinationAcChangeListener.selectedIndex==0){
							//$ionicLoading.hide();
							alert("Select Destination Account");							
					}else if(txtFundTransferPinCode==""){
						$ionicLoading.hide();
						alert("Please Enter Pin Code");						
					}else{
					 $ionicLoading.show();
						//*********Fund Transfer submit Begin***********
					//**********Begin First Execution *********
						$http({
							  method: 'GET',							 
							  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferRequestExecuteTagCodeSV',
							   params: {mailID:mailID,sessionID:sessionID,password:txtFundTransferPinCode,companyCode:'001',requestDate:requestDate,sourceAccountNo:sourceAccountNo,amount:amount,destrinationAcountNo:destrinationAcountNo,remarks:remarks},
							 // params: {cusCode:cusCode},
							  //type:'JSON',
							  headers : { 'Content-Type': 'application/json' }
							}).success(function(data, status, headers, config) {
								//alert("success...");  
									 $ionicLoading.hide();
									if(data.fundTransferExecuteTagCodeNodes[0].errorCode == 0) {
									$ionicLoading.hide();
										alert(data.fundTransferExecuteTagCodeNodes[0].errorMesage);
									}else{
									$ionicLoading.hide();
										alert(data.fundTransferExecuteTagCodeNodes[0].errorMesage);
									}
										
								//alert($rootScope.responseArr.toString);
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});            
										
					//**********End First Execution *********
										}
									 }
			// ****************Fund Transfer End Submit Execution***************
	
		
		
})


.controller('talkTimeRechargetCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter) {
	//alert($filter("date")(Date.now(), 'yyyy-MM-dd'));
	
			//alert("Fund Transfer");
			$ionicLoading.show();
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',         
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				//Second Request Begin
				   if(data.accountTagCode[0].sErrorCode == 0) {
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
											 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountStatementNodes);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					alert(data.accountTagCode[0].sSrrorMessage);
					
				}
			
			}).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			alert("Server is Busy. Please Wait..");
        }); 
		
		
		//*****************for Operator Begin***************
		   $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileOperatorsSV',
         // params: {cusCode:cusCode},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {
            //alert("success...");            
				$scope.mobileOperatorsNamesAndCodesNodes = data.mobileOperatorsNamesAndCodesNodes; // response data
						$rootScope.mobileOperatorsNamesAndCodesNodes = data.mobileOperatorsNamesAndCodesNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.mobileOperatorsNamesAndCodesNodes, function(mobileOperatorsNamesAndCodesNodes, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(mobileOperatorsNamesAndCodesNodes);
												//aler(accountListDescription);
												//$state.go('accBalance');
												
								
								});   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			alert("Server is Busy. Please Wait..");
        });            
		
		//*****************for Operator End***************
		 $scope.doSubmit = function() {
				$ionicLoading.show();
		 }
		 
		 	//************* Begin For Populate field Selecting by Source Account//****************
		
		document.getElementById("sourcecAcChangeListener").onchange = function() {
		   //setActiveStyleSheet(this.value);
		  // return false
		  $ionicLoading.show();
		  // alert(this.value);
		  var accountNo=this.value;

			$http({
				  method: 'GET',
				  
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:accountNo},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
																				 $http({
											  method: 'GET',											  
											  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsErrorCodeTagSV2',
											 // params: {cusCode:cusCode},
											  //type:'JSON',
											   params: {mailID:mailID,sessionID:sessionID,companyCode:'001',accountNo:accountNo,productCode:'FTR'},
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert(ata.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode); 
													 if(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode == 0) {
														//alert("success...");
														//*************** for Begin Destination Account List***********************
														$http({
															 method: 'GET',									  
															url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsAccountListSV',
															params: {mailID:mailID,sessionID:sessionID},
																			  //type:'JSON',
															headers : { 'Content-Type': 'application/json' }
															}).success(function(data, status, headers, config) {                  
																				 //alert('sucess');
															$scope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.responseArr = [];
															angular.forEach(data.destrinationaAccountListNodes, function(destrinationaAccountListNodes, index) {
																$ionicLoading.hide();
																$rootScope.responseArr.push(destrinationaAccountListNodes);
																					//aler(accountListDescription);
																					//$state.go('accBalance');
																	
																	});   
																}).error(function(data, status, headers, config) {
																	$ionicLoading.hide();
																	alert("Server is Busy. Please Wait..");
																});  
														//*************** for End Destination Account List***********************
													}else{
													alert(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage);
													$ionicLoading.hide();
												}
																					
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
													alert("Server is Busy. Please Wait..");
											});  
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
			});            
		}
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		//************Begin Get Mobile Operator Code***************
		
			  document.getElementById("operatorChangeListener").onchange = function() {
			  var operatorChangeListener = document.getElementById("operatorChangeListener");					
				var operatorName = operatorChangeListener.options[operatorChangeListener.selectedIndex].value;
				
						$http({
						  method: 'GET',
						 
						  url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileOperatorCodeSelectByMobileOperatorNameSV',
						  params: {operatorName:operatorName},
						  //type:'JSON',
						  headers : { 'Content-Type': 'application/json' }
						   }).success(function(data, status, headers, config) {
							
							$scope.mobileOperatorCode= data.mobileOperatorsCodesNodes[0].mobileOperatorCode
								
							
							
							}).error(function(data, status, headers, config) {
						   //$ionicLoading.hide();
							alert("Server is Busy. Please Wait..");
						}); 
			  }
			  
			  //************End Get Mobile Operator Code***************
		
			//************* End For Populate field Selecting by Source Account  *************************
		   
					// ****************Begin TalkTime Submit Execution***************
				 $scope.doSubmit = function() {
				  //$ionicLoading.show();
						//var requestDate=document.getElementById("txtRequestDate").value;
					var sourcecAcChangeListener = document.getElementById("sourcecAcChangeListener");					
					var sourceAccountNo = sourcecAcChangeListener.options[sourcecAcChangeListener.selectedIndex].value;
					
					var operatorChangeListener = document.getElementById("operatorChangeListener");					
					var operator = operatorChangeListener.options[operatorChangeListener.selectedIndex].value;
					
					var txtMobileNumber = document.getElementById("txtMobileNumber").value;	
					var txtTalkTimeAmount = document.getElementById("txtTalkTimeAmount").value;	
					var txtTalktimePinCode = document.getElementById("txtTalktimePinCode").value;	
					
						
					
					if(sourcecAcChangeListener.selectedIndex==0){
						alert("Select Source Account");
					}else if(operatorChangeListener.selectedIndex==0){
						//alert(sourceAccountNo);
						alert("Select Mobile Operator");
					}else if($scope.radioValue==null){
					alert("Please Select Mobile Type");					
					}else if(txtMobileNumber==""){
					alert("Please Enter Mobile Number");	
					}else if(txtTalkTimeAmount==""){
					alert("Please Enter Amount");	
					}else if(txtTalktimePinCode==""){
						alert("Please Enter Pin Code");	
					}else {
						$ionicLoading.show();
											
						
						$http({
						  method: 'GET',
						 
						  url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileRechargeExecuteSV',
						  params: {mailID:mailID,sessionID:sessionID,pinCode:txtTalktimePinCode,companyCode:'001',sourceAccount:sourceAccountNo,amount:txtTalkTimeAmount,mobileOperatorCode:$scope.mobileOperatorCode,selectedMobileType:$scope.radioValue,mobileNumber:txtMobileNumber},
						  //type:'JSON',
						  headers : { 'Content-Type': 'application/json' }
						   }).success(function(data, status, headers, config) {
							//alert("success");
								//Second Request Begin
								$ionicLoading.hide();
								   if(data.submitExecuteNodes[0].sumitExecuteErrorCode == 0) {
									
								//Second Request End
									$ionicLoading.hide();
									alert(data.submitExecuteNodes[0].sumitExecuteErrorMessage);
												
								}else{
									$ionicLoading.hide();
									alert(data.submitExecuteNodes[0].sumitExecuteErrorMessage);
									
								}
							
							}).error(function(data, status, headers, config) {
						   $ionicLoading.hide();
							alert("Server is Busy. Please Wait..");
						}); 
						
						
					}
				 }
				 
				 // ****************End TalkTime Submit Execution***************
				 
				  $scope.radioSubmit = function(i) {
						 $scope.radioValue=i;						
				  
				  }
				  
			
	
		
})

//**************** Stop Cheque Leaf ***************************************************************************************
.controller('stopChequeLeafCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter) {

	//alert($filter("date")(Date.now(), 'yyyy-MM-dd'));
	
			//alert("Fund Transfer");
		$ionicLoading.show();
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
          //url: 'http://202.40.190.14:8084/BankAndroidConnectivity/LoginMobiBank',
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				//Second Request Begin
				   if(data.accountTagCode[0].sErrorCode == 0) {
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
											 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountStatementNodes);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								$ionicLoading.hide();
								alert("Server is Busy. Please Wait..");
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					alert(data.accountTagCode[0].sSrrorMessage);
					
				}
			
			}).error(function(data, status, headers, config) {
           $ionicLoading.hide();
			alert("Server is Busy. Please Wait..");
        }); 
		
		
		//************* Begin For Populate field Selecting by Source Account//****************
		
		document.getElementById("sourcecAcChangeListener").onchange = function() {
		   //setActiveStyleSheet(this.value);
		  // return false
		  $ionicLoading.show();
		  // alert(this.value);
			$http({
				  method: 'GET',
				  //url: 'http://202.40.190.14:8084/BankAndroidConnectivity/LoginMobiBank',
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:this.value},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle); 
					
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
								$ionicLoading.hide();
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
						
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					alert("Server is Busy. Please Wait..");
			});            
		}
		
	
				 
})


			
.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      checkConnection();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	$ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
 }, 100) 
 
//	if(window.Connection) {
//        if(navigator.connection.type == Connection.NONE) {
//            $ionicPopup.confirm({
//                title: "Internet Disconnected",
//                content: "The internet is disconnected on your device."
//            })
//
//        }
//    }
    
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }

    
      
  });
//    document.addEventListener("deviceready", onDeviceReady, false);
//
//    function onDeviceReady() {
//
//        //Initialize anything you need to. aka: Google analytics.
//
//        //Set other evens you need to listen to.
////        document.addEventListener("online", onOnline, false);
////        document.addEventListener("offline", onOffline, false);
//         documrnt.addEventListener("load", initAccBalance, false);
//    
//	function initAccBalance() {
//		document.getElementById("btnLogin").addEventListener("click", accountBalance);
//	}
//        //document.getElementById("accBalanceLnk").addEventListener("click", accountBalance, false);
//     }
})
