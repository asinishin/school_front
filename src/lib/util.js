// site/js/util.js

define([
	'jquery',
	'jquerycookie',
	'xdate',
	'../../lib/views/menu_bar',
	'../../lib/views/user_bar',
	'../../lib/views/login_bar'
], function(
	$,
	jqeryCookie,
	XDate,
	MenuBarView,
	UserBarView,
	LoginBarView
) {
	
	var util = {};
	
	util.removePrompt = function() {
		$('#flash').empty();
		$('#flash').removeClass('alert alert-error');
		$('.help-inline').remove();
		$('.error').removeClass('error');
	};
	
	util.displayErrors = function(errors) {
		util.removePrompt();
		var flash = "The following errors prevented data from being saved:<ul>";
		var keys = Object.keys(errors);
		for (var i = 0;i < keys.length;i++) {
			$(".control-group:has(div[data-editors='" + keys[i] + "'])")
				.addClass('error')
				.find(".controls")
				.append("<span class='help-inline' data-error='description'>" + errors[keys[i]].message + "</span>");
			flash = flash + "<li>" + keys[i] + " is " + errors[keys[i]].message + "</li>";
		}
		flash = flash + "</ul>";
		$('#flash').html(flash);
		$('#flash').addClass('alert alert-error');
	};

	util.successPrompt = function(message) {
		$('#flash').html("<p>" + message + "</p>");
		$('#flash').addClass('alert flash-success')
			.delay(1600)
			.fadeOut(400, function() {
				$(this).empty()
					.removeClass('alert flash-success')
					.show();
		});
	};
	
	util.errorPrompt = function(message) {
		$('#flash').html("<p>" + message + "</p>");		
		$('#flash').addClass('alert alert-error');
	};
	
	util.spaceTypeId = function() {
		var domain = window.location.hostname;
		if (domain.indexOf('parking') === -1) {
			return 1;  // Storage
		} else {
			return 2;  // Parking
		}
	};
	
	var addLeadZero = function(str) {
		if (str.length === 1) {
			return '0' + str;
		} else {
			return str;
		}
	};
	
	util.validateDate = function(value, formValues) {
		var err = {
			type:    'Date',
			message: 'invalid date format'
		};

		// I expect MM/dd/YYYY
		var ps = value.split('/');
		
		if (ps.length !== 3) return err;
		
		var str = addLeadZero(ps[1]) + '/' + addLeadZero(ps[0]) + '/' + ps[2];
		
		var patt = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/gm;
		
		if (!patt.test(str)) return err;
	};
	
	util.exDate = function(str) {
		ps = str.split('T');
		return ps[0].slice(5, 7) + '/' + ps[0].slice(8, 10) + '/' + ps[0].slice(0, 4);
	};
	
	util.exTime = function(str) {
		ps = str.split('T');
		return ps[1].slice(0, 5) + ' ' + ps[1].slice(-2);
	};
	
	util.jsonDate = function(str) {
		return new XDate(str.replace(/\s/g, "")).toString('u');
	};
	
	util.redirectToLogin = function() {
		var url = location.pathname + location.hash;
		$.cookie('return_to', url);
		window.location.assign("/login?prompt=1");
	};

	util.checkLoggedIn = function() {
		return $.cookie('auth_token') != null;
	};
	
	util.redirectToListing = function(listing) {
		var n = (new Date()).getTime();
		window.location.assign("/manage_listing.html?p=" + n + "#overview/l" + listing.id );
	};
	
	util.checkStatus = function(response) {
		if (response.status == 403) { // Is login required?
			util.redirectToLogin();
		} else if (response.status == 404) { // Not found
		    util.errorPrompt("Error: API request not found!");
		} else if (response.status == 422) { // Unprocessable Entity
		    util.errorPrompt("Error: " + response.responseText);
		} else if (response.status == 500) {
			util.errorPrompt("Internal Server Error! We are sorry something went wrong with our server. Please contact us and we will fix it shortly.");
		} else {
			
		}
	};
	
	util.spaceUrlHash = function(lat, lng) {
		return "spaces/a" + escape(lat) + "/o" + escape(lng);
	};

	util.gotoSpaces = function(coordinates) { // TODO, simplify by location.assign. Look above.
		var a = document.createElement('a');
		a.href = location.href;
		a.pathname = 'get_space.html';
		a.hash = util.spaceUrlHash(coordinates.lat, coordinates.lng);
		location.href = a.href;		
	};

	util.gotoSpacesAnotherDomain = function(coordinates) { 
		var domain = window.location.hostname;
		if (domain.indexOf('parkingsquirrel') === -1) {
			domain = 'www.parkingsquirrel.com';
		} else {
			domain = 'www.storeitsquirrel.com';
		}
		var a = document.createElement('a');
		a.href = location.href;
		a.hostname = domain;
		a.pathname = 'get_space.html';
		a.hash = util.spaceUrlHash(coordinates.lat, coordinates.lng);
		location.href = a.href;		
	};
	
	util.hidePhoneDigits = function(phone) {
		return phone.substring(0, 7) + 'XXXXXXXXXXXXXXXXXXXX'.substring(7, phone.length);
	};
	
	util.getDefaultLocation = function() {
		// Toronto at the moment
		return {
			lat: "43.653226",
			lng: "-79.383184"
		};
	};
	
	util.buildNavigator = function() {
		if ($.cookie('auth_token') === undefined) {
			var loginBarView = new LoginBarView();
			$('.secondary-nav').html(loginBarView.render().$el.html());
		} else {
			var profile = $.cookie('profile').split(',');
			var menuBarView = new MenuBarView({ role: profile[0] });
			$('.nav:first').html(menuBarView.render().$el.html());
			var userBarView = new UserBarView({ name: profile[1] });
			$('.secondary-nav').html(userBarView.render().el);
		}
	};
	
	var parser = function(str) {
		var parts = str.replace(/\s/g, "").split('T');
		var time = parts[1].split(':');
		var hours = parseInt(time[0], 10);
		if (time[1].slice(-2) === 'AM' && hours === 12) {
			hours = 0;
		} if (time[1].slice(-2) === 'PM' && hours < 12) {
			hours = hours + 12;
		};
		return new XDate(XDate.UTC(
			parseInt(parts[0].slice(0, 4), 10),
			parseInt(parts[0].slice(5, 7), 10) - 1,
			parseInt(parts[0].slice(8, 10), 10),
			hours + 7,
			parseInt(time[1].slice(0, -2, 10)),
			0,
			0
		));
	};
	
	XDate.parsers.push(parser);
	
	return util;
});
