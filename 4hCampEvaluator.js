

var tribes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var twoTribesDoNotMeetTwice = function(testSchedule){
	tribes.forEach(function(tribe){
		tribes.forEach(function(tribe2){
			if(tribe!==tribe2){
				var activitiesInCommon = 0;
				testSchedule.forEach(function(day){
					//Check for workshops in common.
					day.workshops.forEach(function(workshop){
						if(inArray(tribe, workshop) && inArray(tribe2, workshop)){
							activitiesInCommon+=1;
						}
					});	
				});
				if (activitiesInCommon > 1) {
					return false;
				}
			}
		});
	});
	return true;
}

function inArray(a, arr){
	arr.forEach(function(b){
		if(b===a){
			return true;
		}
	});
	return false;
}

var eachTribeTakesEachWorkshopOnce = function(testSchedule){
	//Initializing a checklist for all the workshops.
	var tribeChecklist = {};
	tribes.forEach(function(tribe){
		tribeChecklist[tribe]=false;
	});
	var workshopChecklist = {};
	workshops.forEach(function(workshop){
		workshopChecklist[workshop]=tribeChecklist;
	});
	//Check tribes off checklist
	testSchedule.forEach(function(day){
		day.workshops.forEach(function(session){
			workshops.forEach(function(workshop){
				workshopChecklist[workshop][session[workshop][0]]=true;
				workshopChecklist[workshop][session[workshop][1]]=true;
			});
		});
	});
	//Check if any workshops are un-taken:
	tribes.forEach(function(tribe){
		workshops.forEach(function(workshop){
			if(!workshopChecklist[workshop][tribe]){
				if (totalScheduleCount % 10000 === 0) {
					//console.log("Rejecting schedule for tribes not having all workshops:\n"+JSON.stringify(testSchedule));
				}
				return false;
			}
		});
	});
	return true;
}

function noTribeHasJohnDutyAndCampfireOnTheSameDay(testSchedule){

	//console.log("Checking new schedule..");
	var overlap = false;
	for (var c = 0; c < testSchedule.length; c++){
		var day = testSchedule[c];
		//console.log("\tTesting "+day.name);
		for(var j = 0; j < day.johnDuty.length; j++){
			var johnTribe = day.johnDuty[j];
			for (var i = 0; i < day.campFire.length; i++){
				var campFireTribe = day.campFire[i];
				//console.log("Comparing %s to %s", campFireTribe, johnTribe);
				if (campFireTribe === johnTribe) {
					//console.log("They are the same, marking overlap.");
					overlap = true;
					break;
				};

				//console.log("Checking if %s is in %s", johnTribe, JSON.stringify(day.campFire));
				if (overlap){
					//console.log("This is a bad schedule.");
					return false;
					break;
					break;
					break;
				}
			}
		}
		
		
	}
	return true;
}
module.exports.noTribeHasJohnDutyAndCampfireOnTheSameDay = noTribeHasJohnDutyAndCampfireOnTheSameDay;

var printCount = 0;

//For these purposes, Fun in the Forrest is Workshop Zero.
function noTribeHasKPAndFunInTheForestOnTheSameDay(testSchedule){
	testSchedule.forEach(function(day){
		day.kp.forEach(function(kpTribe){
			if(inArray(kpTribe, day.workshops[1])){
				if (printCount === 0) {
					//console.log("Rejecting schedule for tribe having KP and Fun in the Forest on the Same Day:\n"+JSON.stringify(testSchedule));
					printCount = 1;
				}
				return false;
			}
		});
	});
	return true;
}
module.exports.noTribeHasKPAndFunInTheForestOnTheSameDay = noTribeHasKPAndFunInTheForestOnTheSameDay;

function noTribeHasKPAndJohnDutyOnTheSameDay(testSchedule){
	for (var d = 0; d < testSchedule.length; d++){
		var day = testSchedule[d];
		for (var kp = 0; kp < day.kp.length; kp++){
			var kpTribe = day.kp[kp];
			for (var jd = 0; jd < day.johnDuty.length; jd++){
				var jdTribe = day.johnDuty[jd];
				if (jdTribe === kpTribe){
					return false;
				}
			}
		}
	}
	return true;
}
module.exports.noTribeHasKPAndJohnDutyOnTheSameDay = noTribeHasKPAndJohnDutyOnTheSameDay;

function noTribeHasKPAndCampfireOnTheSameDay(testSchedule){
	testSchedule.forEach(function(day){
		day.kp.forEach(function(kpTribe){
			if(inArray(kpTribe, day.campFire)){
				return false;
			}
		});
	});
	return true;
}
module.exports.noTribeHasKPAndCampfireOnTheSameDay = noTribeHasKPAndCampfireOnTheSameDay;

var criteriaToMeet = [
	noTribeHasKPAndCampfireOnTheSameDay,
	noTribeHasJohnDutyAndCampfireOnTheSameDay,
	noTribeHasKPAndJohnDutyOnTheSameDay,
	noTribeHasKPAndFunInTheForestOnTheSameDay,
	//twoTribesDoNotMeetTwice
	];

	

module.exports.evaluate = function checkCriteria(testSchedule){
		criteriaToMeet.forEach(function(criteria){
			if (criteria(testSchedule)===false){
				return false;
			}
			return true;
		});
	}

