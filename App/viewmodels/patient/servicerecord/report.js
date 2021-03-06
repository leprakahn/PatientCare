/***************************************************************************************************
 * ViewModel: Report
 * Author(s): Imran Esmail 
 * Description: Handles the business logic for Report Tab of patient's Service Record.
 **************************************************************************************************/
define(function(require) { 
	/*********************************************************************************************** 
	 * Includes*
	 **********************************************************************************************/
	var system = require('durandal/system');			// System logger
	var custom = require('durandal/customBindings');	// Custom bindings
	var Backend = require('modules/report');			// Database access
	var Forms = require('modules/form');					// Common form elements
	var Structures = require('modules/patientStructures'); 
	var app = require('durandal/app');
	var modal	   = require('modals/modals');				// Modals
	var UserStructures	= require('modules/structures');		// User structures
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	var form 			= new Forms();
	var backend 		= new Backend();
	var structures   	= new Structures();
	var userStructures  = new UserStructures();
	var role			= ko.observable(new userStructures.Role());
	var doc             = ko.observable(new structures.Document());
	var documents       = ko.observableArray([]);
	var patientId       = ko.observable();
	var practiceId      = ko.observable();
	var date            = ko.observable();
	var documentType    = ko.observable("Document Type");
	var documentState   = ko.observable(true); 
	var documentAdd     = ko.observable(); 
	var documentSave    = ko.observable(); 
	var documentCancel  = ko.observable(); 
	var isNewDocument   = ko.observable(false); 
	var tempDocument    = ko.observable(new structures.Document());
	var file 			= ko.observable(); 
	 
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
		role: role,
		doc: doc,   
		documents: documents,  
		form: form,
		backend: backend,
		structures: structures,
		patientId: patientId,
		practiceId: practiceId,
		date: date,
		documentType: documentType,
		documentState: documentState, 
		documentAdd: documentAdd, 
		documentSave: documentSave, 
		documentCancel: documentCancel,
		isNewDocument: isNewDocument,
		tempDocument: tempDocument,
		file:file,
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		// This allow manipulation of the DOM
		viewAttached: function() {
			$('#serviceTab a').click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			});
			$('.reportTableHolder').height(parseInt($('.tab-pane').height()) - 264);
			// Resize tree and content pane
			$('.tab-pane').height(parseInt($('.contentPane').height()) - 62);
			$(window).resize(function() {
				$('.tab-pane').height(parseInt($('.contentPane').height()) - 62);
			});
			
			doc().isUnknown.subscribe(function(newValue) {
				if (newValue) {
					doc().dateOfService("");
				}
			});
		},
		// Loads when view is loaded
		activate: function(data) {
			backend.getRole(global.userId, global.practiceId).success(function(data) {
					self.role(new userStructures.Role(data[0]));
				});
			var self = this; 
			 self.date(data.date);
			 self.patientId(data.patientId); 
			 self.practiceId(global.practiceId); 
			 // Get Document for a single patient 
			 backend.getDocument(self.patientId(),self.practiceId(),self.date()).success(function(data) {
			 	self.documents([]);
				self.doc(new structures.Document());
				if(data.length > 0) {
					 var d = $.map(data, function(item) { 
					  item.date = form.uiDate(item.date);
					  item.date_of_service = form.uiDate(item.date_of_service);
					 return new structures.Document(item) }); 
					 self.documents(d);
					 self.doc(d[0]);
				}
			}); 	
		},
		// Save Report 
		saveDocument: function(data) { 
			if(doc().errors().length > 0) {
				if(doc().errors().length > 1) {
					$('.report .allAlert').fadeIn().delay(3000).fadeOut();
				}
				else if(doc().errors()[0] == 'type') {
					$('.report .typeAlert').fadeIn().delay(3000).fadeOut();
				}
			}
			else {
				if(doc().id() == null) {
					doc().location(file());  
				}
				 isNewDocument(false);
				  backend.saveDocument(doc(),documents,practiceId,patientId,date()); 
				 $('.fileupload').fineUploader('uploadStoredFiles'); 
				  $('.report .documentAlert').fadeIn().delay(3000).fadeOut();
				  documentState(true);
				  doc(new structures.Document());
				
			}					
		},
		// Search Report By Type 
		searchByType: function(data) { 
			backend.getDocumentByType(patientId(), practiceId(), documentType()).success(function(data) { 
				if(data.length > 0) {  
					 var d = $.map(data, function(item) {
					 item.date = form.uiDate(item.date)
					 item.date_of_service = form.uiDate(item.date_of_service)
					 return new structures.Document(item) });
						documents(d);
						doc(d[0]); 
				}
				else {
						documents(new structures.Document());
						doc(new structures.Document());     
				}
			}); 
			
	    },
		//Display Selected file 
		displayFile: function(data) { 
			doc(data); 
			modal.showFile(doc().location(),'Selected File'); 
		},
		//Initialize document
		setDocumentFields: function(data) {
			isNewDocument(false); 
			doc(data); 
		},
		// Cancel Document
		documentCancel: function() {
			isNewDocument(false); 
			documentState(true);
			doc(tempDocument()); 
		},
		//Add document
		documentAdd: function() { 
			   documentState(false);
			   isNewDocument(true); 
			   tempDocument(doc());
			  doc(new structures.Document());
		}
	};
});//End ViewModel