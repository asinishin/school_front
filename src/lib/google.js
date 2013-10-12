define([ 'async!https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places!callback' ], function() {
	return {
		addMapToCanvas: function(mapCanvas, options) {
			return new google.maps.Map(mapCanvas, options);	
		}
	}
});
