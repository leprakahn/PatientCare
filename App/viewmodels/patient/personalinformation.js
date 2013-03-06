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
	//var Backend = require('modules/moduleTemplate');	// Module
	
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	// var observable = ko.observable('');
	// var observableArray = ko.observableArray([]);
	var optionNumber = ko.observable(); 

	/*********************************************************************************************** 
	 * KO Computed Functions
	 **********************************************************************************************/
	 // var computedFunction = ko.computed(function() {});
	 var selectedOption = ko.computed(function(){ 
	 	if(optionNumber() == '3'){ 
	 		return true;    
	 	}
	 	else 
	 	{ 
	 		return false; 
	 	} 
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
		 optionNumber: optionNumber,
		
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		// This allow manipulation of the DOM
		viewAttached: function() {
			$('#personalTab a').click(function(e) {
				e.preventDefault();      
  				$(this).tab('show');
			});  
			
			// Resize tree and content pane
			$('.outerPane').height(parseInt($('.contentPane').height()) - 62);
			$(window).resize(function() {
				$('.outerPane').height(parseInt($('.contentPane').height()) - 62);
			});
			
			
		},
		// Loads when view is loaded
		activate: function(data) {
			// Code here
			
			// If you add any asynchronous code, make sure you return it. If you need to add multiple
			// asynchronous code, return the functions chained together. If you don't return them,
			// then Durandal will not wait for them to finish before loading the rest of the page.
			// There might be issues when updating observables.
			// Ex:
			// return .get().getJSON().post();
		},
		selectedOption: selectedOption,
	};
});