// js/views/weekly.js

define([
	'backbone',
	'underscore',
	'text!templates/weekly.html'
], function(
	Backbone,
	_,
	weeklyTemplate
){  var WeeklyView = Backbone.View.extend({

	events: {
	},

	initialize: function(options) {
	},
	
	load: function() {
		return this;
	},
			
	render: function() {
		var template = _.template(weeklyTemplate);
		this.$el.html(template());

	    return this;
	},
	
});

return WeeklyView;

});