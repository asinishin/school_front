({
    baseUrl: ".",
    name: "main",
    paths: {
		xdate:           '../../lib/xdate',
		jquery:          '../../lib/jquery-1.10.2',
		jqueryuicore:    '../../lib/jquery.ui.core',
		jqueryuiwidget:  '../../lib/jquery.ui.widget',
		jqueryuimouse:   '../../lib/jquery.ui.mouse',
		jqueryuislider:  '../../lib/jquery.ui.slider',
		jquerycookie:    '../../lib/jquery.cookie',
		underscore:      '../../lib/underscore',
		backbone:        '../../lib/backbone',
		backboneforms:   '../../lib/backbone-forms',
		form:            '../../lib/form',
		text:            '../../lib/text',
		paginator:       '../../lib/backbone.paginator',
		async:           '../../lib/async',
		util:            '../../lib/util'
    },
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
    out: "../../../deploy/as/calendar.js"
})
