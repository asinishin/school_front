// site/test/spec_runner.js

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
		},
		'jqueryuislider': {
			deps: ['jqueryuicore', 'jqueryuiwidget', 'jqueryuimouse']
		},
		'jasmine': {
			exports: 'jasmine'
		},
		'jasminehtml': {
			deps: ['jasmine'],
			exports: 'jasminehtml'
		}
    },
    waitSeconds: 200 // Longer timeout for scripts loading
});

require([
	'underscore',
	'jquery',
	'jasmine',
	'jasminehtml',
	'../test/spec/views/daily_spec'
], function(
	_,
	$,
	jasmine
) {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	
	var htmlReporter = new jasmine.HtmlReporter();
	
	jasmineEnv.addReporter(htmlReporter);
	
	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	
//	var specs = [];	
//	specs.push('spacesSpec');
	
	$(function() {
		jasmineEnv.execute();
	});
	
});