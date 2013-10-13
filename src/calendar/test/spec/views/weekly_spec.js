// weekly_spec.js

describe('Calendar Week View ::', function() {

	beforeEach(function() {
		var flag = false,
			that = this;

		require([
		    'util',
			'views/weekly'
		], function(
		    util,
			WeeklyView
		) {
			window.app = {};
			window.app.util = util;

			that.createDailyView = function(part, collection) {
				var TestWeeklyView = WeeklyView.extend({
					initialize: function(options) {
						this.part = options.part;
						this.collection = {};
						this.collection.models = options.collection;
					}
				});
				
				for (var i = 0; i < collection.length; i++) {
					collection[i].toJSON = function() {
						return this;
					};
				};
				
				that.dailyView = new TestWeeklyView({
					daily: '2013-10-02',
					part: part,
					collection: collection
				});
			};
			
			that.collection = [
			    {
					rental_unit_id:   12,
					rental_unit_name: 'Office 1',
					reservations: [
						{ begin_at: '2013-10-02T09:30AM', end_at: '2013-10-02T12:00PM' },
						{ begin_at: '2013-10-02T06:30PM', end_at: '2013-10-02T10:00PM' }
					]
				},
				{
					rental_unit_id:   14,
					rental_unit_name: 'Office 2',
					reservations: [ ]
				},
				{
					rental_unit_id:   15,
					rental_unit_name: 'Office 3',
					reservations: [
						{ begin_at: '2013-10-02T09:00AM', end_at: '2013-10-02T05:00PM' },
						{ begin_at: '2013-10-02T08:30PM', end_at: '2013-10-03T12:00AM' }
					]
				},
				{
					rental_unit_id:   16,
					rental_unit_name: 'Office 4',
					reservations: [ ]
				},
				{
					rental_unit_id:   17,
					rental_unit_name: 'Workstation 1',
					reservations: [ ]
				},
				{
					rental_unit_id:   18,
					rental_unit_name: 'Workstation 2',
					reservations: [ ]
				},
				{
					rental_unit_id:   20,
					rental_unit_name: 'Workstation 3',
					reservations: [ ]
				},
				{
					rental_unit_id:   21,
					rental_unit_name: 'Workstation 4',
					reservations: [
						{ begin_at: '2013-10-02T09:00PM', end_at: '2013-10-02T11:45PM' }
					]
				},
				{
					rental_unit_id:   22,
					rental_unit_name: 'Conference 1',
					reservations: [
						{ begin_at: '2013-10-02T05:00PM', end_at: '2013-10-02T10:30PM' }
					]
				},
				{
					rental_unit_id:   23,
					rental_unit_name: 'Conference 2',
					reservations: [ ]
				}
			];
			
			flag = true;
		});

		waitsFor(function() {
			return flag;
		});
	});

	afterEach(function() {
	});

	describe('Render', function() {
		describe('of the week', function() {
			beforeEach(function() {
				this.createWeeklyView(1, this.collection);
				$('#sandbox').html(this.weeklyView.render().$el);		
			});
	
			it('should display: Date', function() {
				expect(this.weeklyView.$('#reservation-date').text())
					.toEqual('Oct 2, 2013');
			});		
	
			it('should display: Day Line', function() {
			});

			it('should display: All Rental Units', function() {
				for (var i = 0; i < this.collection.length; i++) {
					expect(this.weeklyView.$('table#calendar tr:nth-child(' + (i+2) +') td:first').text()).toEqual(this.collection[i].rental_unit_name);
				}
			});
		});		
	});
});