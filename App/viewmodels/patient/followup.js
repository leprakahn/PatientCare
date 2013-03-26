/***************************************************************************************************
 * ViewModel:
 * Author(s):
 * Description: 
 **************************************************************************************************/
define(function(require) { 
	/*********************************************************************************************** 
	 * Includes*
	 **********************************************************************************************/
	var system = require('durandal/system');			// System logger
	var custom = require('durandal/customBindings');	// Custom bindings
	var Backend = require('modules/followup');			// Database access
	var patientBackend = require('modules/patient');			// Database access
	var Structures = require('modules/patientStructures'); 
	
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	 var backend = new Backend();
	 var pb  = new patientBackend();
	 var structures = new Structures();
	 var followup 		= ko.observable(new structures.Followup());
	 var followups      = ko.observableArray([]); 
	 var checkOut 		= ko.observable(new structures.Checkout()); 
	 var checkOuts      = ko.observableArray([]); 
	 var paymentMethod  = ko.observable(new structures.PaymentMethod()); 
	 var paymentMethods = ko.observableArray([]);
	 var phoneLog       = ko.observable(new structures.PhoneLog()); 
	 var phoneLogs      = ko.observableArray([]);    
	 var superBill      = ko.observable(new structures.Superbill());    
	 var prescription   = ko.observable(new structures.Prescription());
	 var doc            = ko.observable(new structures.Document());
	 var documents      = ko.observableArray([]);          
	 var patientId      = ko.observable(); 
	 var practiceId     = ko.observable(); 
	 var checkOutId     = ko.observable(); 
	 var myArray        = ko.observableArray([]); 
	 var primaryCo      = ko.observable(); 
	 var secondaryCo    = ko.observable("23");   
	 var otherCo        = ko.observable("21");  
	 var primaryInsurance = ko.observable("500");   
	 var secondaryInsurance = ko.observable("100");
	 var otherInsurance = ko.observable("200");
	 var selectedValues = ko.observableArray([]);
	 var modes          = ko.observableArray([]); 
	 var phoneLogState  = ko.observable(false); 
	 var phoneLogAdd    = ko.observable(); 
	 var phoneLogSave   = ko.observable(); 
	 var phoneLogCancel = ko.observable(); 
	/*********************************************************************************************** 
	 * KO Computed Functions
	 **********************************************************************************************/  
	 var copayment = ko.computed(function() {     
	 	
	 	var total = 0;   	
	     ko.utils.arrayForEach(selectedValues(), function (item) { 
            total += parseInt(item);
           
        });
	 	    
        return total;    
   });
      
    
	/*********************************************************************************************** 
	 * ViewModel
	 *  
	 * For including ko observables and computed functions, add an attribute of the same name.
	 * Ex: observable: observable
	 **********************************************************************************************/
	return {
		/******************************************************************************************* 
		 * Attributes
		 *******************************************************************************************/
		structures: structures,
		followup: followup,
		followups: followups, 
		checkOut: checkOut,
		checkOuts: checkOuts, 
		phoneLog: phoneLog,
		phoneLogs: phoneLogs, 
		superBill: superBill, 
		prescription: prescription,
		doc: doc,   
		documents: documents,   
		patientId: patientId,
		practiceId: practiceId, 
		checkOutId: checkOutId,
		myArray: myArray,
		primaryCo:primaryCo,
		secondaryCo:secondaryCo, 
		otherCo: otherCo,  
		primaryInsurance:primaryInsurance,
		secondaryInsurance:secondaryInsurance,    
		otherInsurance:otherInsurance,
		selectedValues: selectedValues,
		copayment: copayment, 
		paymentMethod: paymentMethod, 
		paymentMethods: paymentMethods,
		modes: modes,  
		phoneLogState: phoneLogState, 
		phoneLogAdd: phoneLogAdd, 
		phoneLogSave: phoneLogSave,
		phoneLogCancel: phoneLogCancel, 
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		 phoneLogAdd: function() {
				var self = this;
				
				phoneLogState(true);
				self.phoneLog(new self.structures.PhoneLog());   
				//system.log('messgae is' + phoneLog.message()); 
				system.log('hello');
		},
		phoneLogCancel: function() {
			phoneLogState(false);
		},
		// This allow manipulation of the DOM
		viewAttached: function() {           		
			$('#followupTab a').click(function(e) {
				e.preventDefault();
  				$(this).tab('show');
			});
						
			// Resize tree and content pane
			$('.tab-pane').height(parseInt($('.contentPane').height()) - 62);
			$(window).resize(function() {
				$('.tab-pane').height(parseInt($('.contentPane').height()) - 62);
			});	
		},
		// Loads when view is loaded
		activate: function(data) {
			var self = this; 
			
			//Patient ID
			self.patientId(data.patientId); 
			
			//Pactice ID
			self.practiceId('1'); 
			
			//checkOut ID 
			self.checkOutId(data.checkOutId); 
			
			
            
         // Add rows to the paymenyMethod table   
	    var Item = function(particulars, amount) {
			var self = this;  
			self.particulars = ko.observable(particulars); 
			self.amount = ko.observable(amount); 
			self.hasAddedRow = ko.observable(false);         
			self.addRow = function(){    
			  if(!self.hasAddedRow()){
				self.hasAddedRow(true); 
				modes.push(new Item('lala',0));   
			  } 
			};
    };   
    modes.push(new Item('first',0));
			
			
			 backend.getFollowup(self.patientId(),self.practiceId()).success(function(data) { 
			    system.log(data); 
				if(data.length > 0) {
				var f = $.map(data, function(item) {return new structures.Followup(item) });
					self.followups(f);
                    self.followup(f[0]); 					
					//followups(s); 
					 
					//system.log('inside followup loop length is' + data.length);
				}
				//system.log('followups length is' + self.followups.length); 
			});
	         
            backend.getCheckOut(self.patientId(),self.practiceId()).success(function(data) {
		   //system.log('inside checkout gt' + data.length); 
				if(data.length > 0) {
					self.checkOuts(new structures.Checkout(data[0]));
					//self.checkOut(s);					 
				} 
			});
			
			backend.getPaymentMethod(self.patientId(),self.checkOutId()).success(function(data) { 
				if(data.length > 0) {
					var s = new structures.PaymentMethod(data[0]);
					self.paymentMethod(s);					 
				} 
			});
			
				
			backend.getPhoneLog(self.patientId(),self.practiceId()).success(function(data) { 
				if(data.length > 0) {
					var s = new structures.PhoneLog(data[0]);
					self.phoneLog(s);					 
				} 
			});
			
			backend.getDocument(self.patientId(),self.practiceId()).success(function(data) { 
				if(data.length > 0) {
					var s = new structures.Document(data[0]);
					self.doc(s);					 
				} 
			});
		   
		  
        var test = ['Nathan Abraham', 'Ian Sinkler'];
        self.myArray(test);
        
         pb.getInsurance(self.patientId(),self.practiceId()).success(function(data) {
				if(data.length > 0) {
					for(var count = 0; count < data.length; count++) {
						var i = new pb.Insurance(data[count]);
						
						switch(i.insuredType()) {
	            			case 'primary':
	            				self.primaryCo(i.copayment());    
	            			    //system.log('inside primary' + i.copayment()); 
	            				break; 
	            			case 'secondary': 
	            				self.secondaryCo(i.copayment());   
	            				break;
	            			default:   
	            				self.otherCo(i.copayment()); 
	            				break;
	            		}
	            	}
				}
			}); 
		   
      
		},       
		   	
		setFields: function(data) {
			followup(data);
		},        
		   
		setCheckOutFields: function(data) { 
			checkOut(data);                
		},             
				    
		setPhoneLogFields: function(data) { 
			phoneLog(data); 
		}, 
		
		setDocumentFields: function(data) { 
			doc(data); 
		}, 
		
		setPaymentFields: function(data) { 
			paymentMethod(data); 
		}
		   
		
	};         
});