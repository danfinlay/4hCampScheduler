var generator = require('./4hCampGenerator');

var schedules = [];
generator.generate(10, function(goodSchedule){
	console.log("Good schedule found!:\n"+JSON.stringify(goodSchedule));
	schedules.push(goodSchedule);
});