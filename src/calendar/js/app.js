// site/js/app.js

define([
	'backbone',
	'util',
	'views/daily',
	'views/weekly'
], function(
	Backbone,
	util,
	DailyView,
	WeeklyView
){  // "use strict";
 
    window.app = window.app || {};

    var Router = Backbone.Router.extend({
		routes: {
			"daily/d:date/p:part": "daily",
			"weekly":              "weekly"
		},
	
		initialize: function() {
			// Handle back button throughout the application
			$(document).on('click', '.back', function(event) {
				window.history.back();
				return false;
			});
		},
		
		daily: function(date, part) {
			this.changePage(new DailyView({
				date: date,
				part: part
			}));
		},
	
		weekly: function() {
			this.changePage(new WeeklyView({
			}));
		},
	
		changePage: function(page) {
			page.render();
			//$('#main_content').empty();
			$('#main').replaceWith($(page.el));
			window.app.util.removePrompt();
			window.scrollTo(0, 0);
		}

    });

    var drawSpinner = function(el) {
		var spinner_width = 16;
		var spinner_height = 11;
		var el_width = el.outerWidth(false);
		var el_height = el.outerHeight(false);
		var el_m_top = el.css('marginTop');
		var el_m_left = el.css('marginLeft');
	
		var spinner = $(document.createElement('div'));
		spinner.attr('id', 'spinner');
		spinner.css('position', 'fixed');
		spinner.css('width', el_width);
		spinner.css('height', el_height);
		spinner.css('top', 0);
		spinner.css('left', 0);
		spinner.css('margin-top', el_m_top);
		spinner.css('margin-left', el_m_left);
		spinner.css('background', 'url(/as/img/spinner.gif) no-repeat '+(el_width-spinner_width)/2+'px '+(el_height-spinner_height)/2+'px');
		spinner.css('background-color', 'rgba(255, 255, 255, 0.8)');
		spinner.css('z-index', 9999);
		spinner.insertAfter(el);
    };

    window.app.start = function() {
		var el = $('body');
		
		// Binding spinner to AJAX
		$.ajaxSetup({beforeSend: function(xhr, settings) {
			window.setTimeout(function() {
				drawSpinner(el);
			}, 0);
		}});
	
		$.ajaxSetup({complete: function(xhr, status) {
			window.setTimeout(function() {
				$('#spinner').remove();
			}, 0);
		}});
		
		window.app.spinnerOn = function() {
			window.setTimeout(function() {
				drawSpinner(el);
			}, 0);			
		};
		
		window.app.util = util;
		window.app.util.buildNavigator();
				
		window.app.router = new Router();
		Backbone.history.start();
    };

    return null;
});