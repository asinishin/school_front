// js/views/daily.js

define([
	'backbone',
	'underscore',
	'text!templates/daily1.html',
	'text!templates/daily2.html',
	'text!templates/daily3.html'
], function(
	Backbone,
	_,
	dailyTemplate1,
	dailyTemplate2,
	dailyTemplate3
){  var DailyView = Backbone.View.extend({

    id: "main",
	events: {
		'click #leftBtn':   'goLeft',
		'click #rightBtn':  'goRight'
	},

	initialize: function(options) {
		this.date = options.date;
		this.part = options.part;
		this.rentalUnits = options.rentalUnits;
	},
	
	render: function() {
		var template;
		if (this.part === '1') {
			template = _.template(dailyTemplate1);
		} else if (this.part === '2') {
			template = _.template(dailyTemplate2);
		} else {
			template = _.template(dailyTemplate3);
		}
		this.$el.html(template({ date: this.date, collection: this.rentalUnits.models }));

	    return this;
	},
	
	goLeft: function(event) {
		event.preventDefault();
		var p = parseInt(this.part);
		if (p > 1) {
			this.goTo(p - 1);
		}
	},
	
	goRight: function(event) {
		event.preventDefault();
		var p = parseInt(this.part);
		if (p < 3) {
			this.goTo(p + 1);
		}
	},
	
	goTo: function(part) {
		var h = location.hash;
		h = h.substring(1, h.length - 1) + part;
		window.app.router.navigate(h, {trigger: true});
	}
	
});

return DailyView;

});