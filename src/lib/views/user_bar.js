// js/views/user_bar.js

define([
	'backbone',
	'underscore',
	'text!../../lib/templates/user_bar.html'
], function(
	Backbone,
	_,
	userBarTemplate
){ var UserBarView = Backbone.View.extend({
	tagName:   'li',
	className: 'dropdown',
	
	initialize: function(options) {
		this.options = options;
	},

	render: function(){
	    var template = _.template(userBarTemplate);
	    $(this.el).html(template(this.options));
	    return this;
	}
});

return UserBarView;

});