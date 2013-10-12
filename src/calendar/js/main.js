// site/js/main.js

require.config({
	shim: {
		'xdate': {
			exports: 'XDate'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'paginator': {
			deps: ['backbone'],
			exports: 'Backbone.Paginator'
		},
		'jqueryuicore': {
			deps: ['jquery']
		},
		'jqueryuiwidget': {
			deps: ['jquery']
		},
		'jqueryuimouse': {
			deps: ['jqueryuiwidget']
		}
    },
    waitSeconds: 600 // Longer timeout for scripts loading
});

require([
	'require',
	'underscore',
	'backbone',
	'jquery',
	'xdate',
	'util',
	'app'
    ], function(require, _, Backbone, $) {
    // Framework and App loaded from a single file

    // Initialization of Web front-end
    $(function() {
		window.app.start();
    });

});