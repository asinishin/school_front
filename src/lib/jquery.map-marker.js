(function($) {
    'use strict';

    var MapMarker = {
	_init: function() {
	    if (this.options.searchList != null) return;
	    var opts = this.options;

	    opts.searchList = this.element;

	    // Sprite 176 X 714 [8 X 21] so each: 22 X 34
	    // Shadow 33 X 26
	    for (var i = 0; i < 20; i++) {
		opts.regIcons.push(
		    new google.maps.MarkerImage(
			'/assets/pin-sprite.png',
			new google.maps.Size(22, 34),
			new google.maps.Point(0, i * 34),
			new google.maps.Point(10, 34)
		    )
		); 
	    };

	    for (var i = 0; i < 20; i++) {
		opts.highIcons.push(
		    new google.maps.MarkerImage(
			'/assets/pin-sprite.png',
			new google.maps.Size(22, 34),
			new google.maps.Point(44, i * 34),
			new google.maps.Point(10, 34)
		    )
		); 
	    };

	    opts.mrkShadow = new google.maps.MarkerImage(
		'/assets/marker-shadow.png',
		new google.maps.Size(33, 26),
		new google.maps.Point(0, 0),
		new google.maps.Point(0, 26)
	    );

	    // "Tiny" marker icons
	    opts.gYellowIcon = new google.maps.MarkerImage(
		"http://labs.google.com/ridefinder/images/mm_20_white.png",
		new google.maps.Size(12, 20),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 20)
	    );
	      
	    opts.gRedIcon = new google.maps.MarkerImage(
		"http://labs.google.com/ridefinder/images/mm_20_red.png",
		new google.maps.Size(12, 20),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 20)
	    );
	      
	    opts.gSmallShadow = new google.maps.MarkerImage(
		"http://labs.google.com/ridefinder/images/mm_20_shadow.png",
		new google.maps.Size(22, 20),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 20)
	    );
	},

	onSearchComplete: function() {
	    var opts = this.options;

	    // Discard old results
	    for (var i = 0; i < opts.currentResults.length; i++) {
		opts.currentResults[i].marker().setMap(null);
	    }
	    opts.currentResults = [];

	    var items = $('ul#listings li.result');//?????
	    if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
		    var item = items[i];
		    opts.currentResults.push(new ResultRow(opts, item.id, $(item).attr("data-lat"), $(item).attr("data-lng"))); //??? not optimal
		}
	    }
	},

        // Seems obsolete, should throw it away
	unselectMarkers: function() {
	    var opts = this.options;
	    for (var i = 0; i < opts.currentResults.length; i++) {
		opts.currentResults[i].unselect();
	    }
	},

	options: {
            searchList:   null,
	    map:          null,
	    currentResults: [],
	    gYellowIcon:  null,
	    gRedIcon:     null,
	    gSmallShadow: null,
	    regIcons:     [],
	    highIcons:    [],
	    mrkShadow:    null
	}
    }; // var Marker

    var ResultRow = function(mapOpts, rowNodeId, lat, lng) {
	var me = this;
	me.mapOpts    = mapOpts;
	me.rowNodeId_ = '#' + rowNodeId;
	me.rowNo_     = parseInt(rowNodeId.split('_')[1]);
	me.rowNode_   = $(me.rowNodeId_)[0];
	me.location_  = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
	me.marker_    = me.marker();

	google.maps.event.addDomListener(me.rowNode_, 'mouseover', function() {
	    me.highlight(true);
	});

	google.maps.event.addDomListener(me.rowNode_, 'mouseout', function() {
	    if (!me.selected_) me.highlight(false);
	});

	google.maps.event.addDomListener(me.rowNode_, 'click', function() {
	    me.toggle();
	});
    };

    ResultRow.prototype.location = function() {
	var me = this;
	return me.location_;
    };

    ResultRow.prototype.marker = function() {
	var me = this;
	if (me.marker_) return me.marker_;
	var mapMaker = me.mapOpts;
	var marker = me.marker_ = new google.maps.Marker({
	    position: me.location_,
	    icon:     mapMaker.regIcons[me.rowNo_ - 1],
	    shadow:   mapMaker.mrkShadow,
	    map:      mapMaker.map,
	    zIndex:   100 - me.rowNo_
	});

	google.maps.event.addListener(marker, "click", function() {
	    me.toggle();
	});

	return marker;
    };

    ResultRow.prototype.toggle = function() {
	var me = this;
	if (me.selected_) {
	    me.unselect();
	} else {
	    me.select();
	}
    };

    ResultRow.prototype.select = function() {
	// suspisios?
	// $(this.rowNode_.parentNode).mapmarker('unselectMarkers');
	this.selected_ = true;
	this.highlight(true);
    };

    ResultRow.prototype.isSelected = function() {
	return this.selected_;
    };

    ResultRow.prototype.unselect = function() {
	this.selected_ = false;
	this.highlight(false);
    };

    ResultRow.prototype.highlight = function(highlight) {
	var me = this;
	me.marker().setOptions({icon: highlight ? me.mapOpts.highIcons[me.rowNo_ - 1] : me.mapOpts.regIcons[me.rowNo_ - 1]});
	if (highlight) {
	    $(me.rowNodeId_).addClass("marked");
	} else {
	    $(me.rowNodeId_).removeClass("marked");
	}
    };

    $.widget("ui.mapmarker", MapMarker);
    
})(jQuery);
