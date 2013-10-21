// js/views/daily.js

define([
	'backbone',
	'underscore',
	'text!templates/daily2.html'
], function(
	Backbone,
	_,
	dailyTemplate
){  var DailyView = Backbone.View.extend({

	events: {
	},

	initialize: function(options) {
		this.date = options.date;
	},
	
	load: function() {
		return this;
	},
			
	render: function() {
		var template = _.template(dailyTemplate);
		this.$el.html(template({ date: this.date }));

	    return this;
	},
	
});

return DailyView;

});