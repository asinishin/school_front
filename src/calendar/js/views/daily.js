// js/views/daily.js

define([
	'backbone',
	'underscore',
	'text!templates/daily.html'
], function(
	Backbone,
	_,
	dailyTemplate
){  var DailyView = Backbone.View.extend({

	events: {
	},

	initialize: function(options) {
	},
	
	load: function() {
		return this;
	},
			
	render: function() {
		var template = _.template(dailyTemplate);
		this.$el.html(template());

	    return this;
	},
	
});

return DailyView;

});