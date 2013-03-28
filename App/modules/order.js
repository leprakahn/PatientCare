/**************************************************************************************************
 * Module name: Patient
 * Author(s): Sean malone
 * Description: This module is used to query the database.
 *************************************************************************************************/
define(function(require) {
	/*********************************************************************************************** 
	 * Includes*
	 **********************************************************************************************/
	var system = require('durandal/system');			// System logger
	
	/**********************************************************************************************
	 * Constructor
	 *********************************************************************************************/
	var order = function() {};
	
	/**********************************************************************************************
	 * Get Methods
	 * 
	 * These methods retrieve information from the database via SELECT queries
	 *********************************************************************************************/
	// Get Patient ID
	// Get All Patients
	order.prototype.getPatientId = function() {
		return this.query({
			mode: 'select', 
			table: 'order', 
			fields: 'id',
			order: 'ORDER BY id DESC',
			limit: 'LIMIT 1'
		});
	}
	
	// Get All Patients
	order.prototype.getPatients = function() {
		return this.query({
			mode: 'select', 
			table: 'order', 
			fields: '*'
		});
	}
	
	// Get Personal Information for a Single Patient
	order.prototype.getPatient = function(id, practiceId) {
		return this.query({
			mode: 'select', 
			table: 'order', 
			fields: '*', 
			where: "WHERE id='" + id + "' AND practice_id='" + practiceId + "'"
		});
	}
	
	// Get Diagnostic Centers
	order.prototype.getCenters = function(id) {
		return this.query({
			mode: 'select',
			table: 'diagnostic_center',
			fields: '*',
			where: "WHERE practice_id='" + id + "'"
		});
	}
	
	order.prototype.getOrderTypes = function(id, type) {
		return this.query({
			mode: 'select',
			table: 'order_category',
			fields: '*',
			where: "WHERE practice_id='" + id + "' AND type='" + type + "'"
		});
	}
	
	/**********************************************************************************************
	 * Save Methods
	 * 
	 * These methods add information to the database via INSERT and UPDATE queries
	 *********************************************************************************************/
	// Add Personal Information for a Single Patient
	order.prototype.savePatient = function(id, data) {
		var self = this;
		var fields = ['practice_id', 'id', 'first_name', 'middle_name', 'last_name', 'alias', 
			'date_of_birth', 'id_number', 'id_type', 'physician_id', 'address', 'city', 'state',
			'zip', 'province', 'country', 'phone', 'phone_ext', 'mobile', 'gender', 'marital_status',
			'family_history_type','family_history_comment', 'routine_exam_comment', 'insurance_type',
			'record_status', 'contact_name', 'contact_phone', 'contact_mobile', 'contact_relationship',
			'insurance_name', 'email'];
		
		var values = $.map(data, function(k,v) {
			if(v != 'lastFirstName' && v!= 'insuredType')
				if(k() == null || k() == undefined) {
					return [''];
				}
				else
					return [k()];
		});

		var newId = '';
		if(id == 'new') {
			return self.query({
				mode: 'select',
				table: 'order',
				fields: 'id',
				order: 'ORDER BY id DESC',
				limit: 'LIMIT 1'
			}).success(function(data) {
				$.each(data, function(key, item) {
					newId = parseInt(item.id) + 1;
				});
				
				values[1] = newId;
				
				self.query({
					mode: 'insert', 
					table: 'order',
					fields: fields, 
					values: values
				});
			});
		}
		else {
			return self.query({
				mode: 'update', 
				table: 'order',
				fields: fields, 
				values: values, 
				where: "WHERE id='" + id + "' AND practice_id='" + practiceId + "'"
			});
		}
	}
	
	order.prototype.saveServiceRecord = function(id, data) {
		var self = this;
		
		var fields = ['id', 'practice_id', 'order_id', 'physician_id', 'date', 'reason', 'history',
			'systems_comment', 'no_known_allergies', 'allergies_verified', 'physical_examination_comment',
			'plan_and_instructions'];
		
		var values = $.map(data, function(k,v) {
			if(k() == null || k() == undefined) {
				return [''];
			}
			else
				return [k()];
		});
		
		return self.query({
			mode: 'update',
			table: 'service_record',
			fields: fields,
			values: values,
			where: "Where id='" + id + "'"
		});
	}
	
	// Add Insurance for a Single Patient
	order.prototype.addInsurance = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'insurance', 
			values: values, 
			where: "WHERE order_id='" + id + "'"
		});
	}
	
	// Add Guarantor for a Single Patient
	order.prototype.addGuarantor = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'guarantor', 
			values: values, 
			where: "WHERE order_id='" + id + "'"
		});
	}
	
	// Add Employer for a Single Patient
	order.prototype.addEmployer = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'employer', 
			values: values, 
			where: "WHERE order_id='" + id + "'"
		});
	}
	
	// Add Spouse for a Single Patient
	order.prototype.addSpouse = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'spouse', 
			values: values, 
			where: "WHERE order_id='" + id + "'"
		});
	}
	
	// Add Reference for a Single Patient
	order.prototype.addReference = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'reference', 
			values: values, 
			where: "WHERE order_id='" + id + "'"
		});
	}
	
	// Add Service Record for a Single Patient
	order.prototype.addServiceRecord = function(id, data) {
		var values = $.map(data, function(k,v) {
			return [k];
		});
		
		return this.query({
			mode: 'insert', 
			table: 'service_record', 
			values: values, 
			where: "WHERE id='" + id + "'"
		});
	}
	
	/**********************************************************************************************
	 * Delete Methods
	 * 
	 * These methods remove information from the database via DELETE queries
	 *********************************************************************************************/
	// Delete Personal Information for a Single Patient
	order.prototype.deletePatient = function(id) {
		return this.query({
			mode: 'delete', 
			table: 'order', 
			where: "WHERE id='" + id + "'"
		});
	}
	
	// Delete Service Record for a Single Patient
	order.prototype.deleteServiceRecord = function(id) {
		return this.query({
			mode: 'delete', 
			table: 'service_record', 
			where: "WHERE id='" + id + "'"
		});
	}
	
	/**********************************************************************************************
	 * Query
	 * 
	 * This method is used by all other methods to execute the ajax call.
	 *********************************************************************************************/ 
	order.prototype.query = function(data) {
		return $.getJSON('php/query.php',data);
	}
	
	/**************************************************************************************************
	 * Return class so it is usable.
	 *************************************************************************************************/
	return order;
});