// js/views/menu_bar.js

define([
	'backbone',
	'underscore',
	'text!../../lib/templates/menu_bar.html'
], function(
	Backbone,
	_,
	menuBarTemplate
){ var MenuBarView = Backbone.View.extend({
	tagName:   'ul',
	
	initialize: function(options) {
		this.options = options;
	},

	render: function(){
	    var template = _.template(menuBarTemplate);
	    $(this.el).html(template(this.options));
	    return this;
	}
});

return MenuBarView;

});