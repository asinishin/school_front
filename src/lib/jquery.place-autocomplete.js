(function($) {
    'use strict';

    var Autocomplete = {
	getAutocomplete: function () { return this.options.autocomplete; },
	setAutocomplete: function (autocomplete) {
	    this.options.autocomplete = autocomplete;
	},

	_init: function() {
	    if (this.options.autocomplete != null) return;
	    var placeOpts = {
	        //types: ['(cities)'],
	        types: ['geocode']
	        //componentRestrictions: {country: this.element.data("country")}
	    };

	    var input = this.element[0];

	    // store the original event binding function
	    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

	    var addEventListenerWrapper = function(type, listener) {
		// Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
		// and then trigger the original listener.
		if (type == "keydown") {
		    var orig_listener = listener;
		    listener = function(event) {
			var suggestion_selected = $(".pac-item.pac-selected").length > 0;
			if (event.which == 13 && !suggestion_selected) {
			    var simulated_downarrow = $.Event("keydown", {
				keyCode: 40,
				which: 40
			    });
			    orig_listener.apply(input, [simulated_downarrow]);
			}
			orig_listener.apply(input, [event]);
		    };
		}
		_addEventListener.apply(input, [type, listener]);
	    }

	    input.addEventListener = addEventListenerWrapper;
	    input.attachEvent = addEventListenerWrapper;

	    this.options.autocomplete = new google.maps.places.Autocomplete(input, placeOpts);
	    //this.options.autocomplete = new google.maps.places.Autocomplete(this.element[0], placeOpts);

	    if (this.options.map != null) {
	        this._bind_map();
	    } else {
	        this._bind_search_box();
	    }
	},

	_bind_search_box: function() {
            var autocomplete = this.options.autocomplete;
	    var me = this;

	    google.maps.event.addListener(autocomplete, 'place_changed', function() {
		var place = autocomplete.getPlace();
		me._trigger('_done', 0, place.geometry.location);
	    });
	},

	_bind_map: function() {
	    var map          = this.options.map;
            var autocomplete = this.options.autocomplete;

	    autocomplete.bindTo('bounds', map);

	    var marker = new google.maps.Marker({ map: map, zIndex: 100 });
	    var me = this;

	    google.maps.event.addListener(autocomplete, 'place_changed', function() {
		var place = autocomplete.getPlace();

		//SearchMap.savePosition(place.geometry.location);

                /*
		if (place.geometry.viewport) {
		    map.fitBounds(place.geometry.viewport);
		} else {
		    map.setCenter(place.geometry.location);
		    map.setZoom(17); // Why 17? Because it looks good.
		} */

		map.setCenter(place.geometry.location);
		map.setZoom(10);

		var image = new google.maps.MarkerImage(
			      '/assets/center.png',
			      new google.maps.Size(15, 36),
			      new google.maps.Point(0, 0),
			      new google.maps.Point(5, 36));
		var shadow = new google.maps.MarkerImage(
			      '/assets/center-shadow.png',
			      new google.maps.Size(35, 27),
			      new google.maps.Point(0, 0),
			      new google.maps.Point(0, 27));

		marker.setIcon(image);
		marker.setShadow(shadow);

		marker.setPosition(place.geometry.location);

		//var pos = {
		//    center: map.getCenter(), 
		//    bounds: map.getBounds()
		//};
		//me._trigger('_done', 0, pos);

		me._trigger('_done');
	    });
	},

	options: {
            autocomplete: null,
	    map:          null
	}
    };

    $.widget("ui.gautocomplete", Autocomplete);

})(jQuery);
