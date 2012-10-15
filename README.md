#4H Camp Schedule Generator#

##A Node.js module for generating schedules for Alameda County's 4H Camp.##

Requires Node.js installed, instructions can be found [here](http://nodejs.org/).

###The program generates schedules and then evaluates them based on these criteria:###

1. No tribe has KP and Campfire on the same day.

2. No tribe has John Duty and Campfire on the same day.

3. No tribe has KP and John Duty on the same day.

4. No tribe has KP and Fun In The Forest on the same day. (Fun In The Forest is represented as Workshop #1).

The basic usage of this library is demonstrated in main.js:

	var generator = require('./4hCampGenerator');
	var schedules = generator.generate(10);

After this example, "schedules" would contain an array of ten "schedule" objects (as per the parameter).  A schedule is a javascript object that could be represented in JSON like this:

	[
		{
			"name": "sunday",
			"johnDuty": [],
			"campFire": [
				1,
				4
			],
			"kp": [],
			"workshops": []
		},
		{
			"name": "monday",
			"johnDuty": [
				0,
				1
			],
			"campFire": [
				5,
				2
			],
			"kp": [
				8,
				7
			],
			"workshops": [
				{
					"1": [
						5,
						2
					],
					"2": [],
					"3": [],
					"4": [],
					"5": []
				}
			]
		},
		{
			"name": "tuesday",
			"johnDuty": [
				2,
				3
			],
			"campFire": [
				6,
				9
			],
			"kp": [
				0,
				4
			],
			"workshops": [
				{
					"1": [
						1,
						3
					],
					"2": [],
					"3": [],
					"4": [],
					"5": []
				}
			]
		},
		{
			"name": "wednesday",
			"johnDuty": [
				4,
				6
			],
			"campFire": [],
			"kp": [
				5,
				2
			],
			"workshops": [
				{
					"1": [
						6,
						9
					],
					"2": [],
					"3": [],
					"4": [],
					"5": []
				},
				{
					"1": [
						8,
						7
					],
					"2": [],
					"3": [],
					"4": [],
					"5": []
				}
			]
		},
		{
			"name": "thursday",
			"johnDuty": [
				9,
				7
			],
			"campFire": [
				0,
				8
			],
			"kp": [
				1,
				3
			],
			"workshops": [
				{
					"1": [
						0,
						4
					],
					"2": [],
					"3": [],
					"4": [],
					"5": []
				}
			]
		},
		{
			"name": "friday",
			"johnDuty": [
				8,
				5
			],
			"campFire": [
				3,
				7
			],
			"kp": [
				6,
				9
			],
			"workshops": []
		}
	]

The average day features 1 KP (kitchen party), 1 johnDuty, 1 campFire, and 5 workshops, each of which is a list of two tribes.  There are 10 tribes, numbered 0 through 9, and to finish this schedule one would need to complete the workshop schedule.

My original version tried to ensure that each tribe would not take a workshop with another tribe twice, but if this was a possible request, it was going to take 82 years for my computer to find it, so we resorted to this method instead.

Exceptions include no KP, John Duty, or Workshops on Sunday, no Camp Fire on Wednesday, two Workshops on Wednesday, and no workshops on Friday.