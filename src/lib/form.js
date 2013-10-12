// form.js

define([
	'backbone',
	'backboneforms'
], function(
	Backbone
){
	
	var Form = Backbone.Form.extend();

	Form.prototype.commit = function(options) {
		var errors = Backbone.Form.prototype.commit.call(this, options);
		if (errors == null) {
			window.app.util.removePrompt();
		} else {
			window.app.util.displayErrors(errors);
		}
		return errors;
	};

	return Form;

});