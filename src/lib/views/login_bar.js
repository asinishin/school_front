// js/views/login_bar.js

define([
	'backbone',
	'underscore',
	'text!../../lib/templates/login_bar.html'
], function(
	Backbone,
	_,
	loginBarTemplate
){
	
	var LoginBarView = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		var template = _.template(loginBarTemplate);
		$(this.el).html(template());
		return this;
	}
});

return LoginBarView;

});