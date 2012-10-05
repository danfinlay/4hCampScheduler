
//This app has a major dependency for its logging JSON,
//A library by the great Douglas Crockford!
//https://github.com/douglascrockford/JSON-js

console.log("Generation Began.");

var tribes = ["Tribe A","Tribe B",
	"Tribe C", "Tribe D", "Tribe E",
	"Tribe F", "Tribe G", "Tribe H",
	"Tribe I", "Tribe J"];
var workshops = [1,2,3,4,5];
var days = ["sunday", "monday","tuesday","wednesday","thursday","friday"];
var chores = ["KP", "johnDuty", "campfire"];

var twoTribesDoNotMeetTwice = function(testSchedule){
	tribes.forEach(function(tribe){
		tribes.forEach(function(tribe2){
			if(tribe!==tribe2){
				var activitiesInCommon = 0;
				testSchedule.forEach(function(day){
					//Check for campfire in common,
					if($.inArray(tribe, day.campFire) && $.inArray(tribe2, day.campFire)){
						activitiesInCommon+=1;
					}
					//Check for workshops in common.
					day.workshops.forEach(function(workshop){
						if($.inArray(tribe, workshop) && $.inArray(tribe2, workshop)){
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

var eachTribeTakesEachWorkshopOnce= function(testSchedule){
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
					//console.log("Rejecting schedule for tribes not having all workshops:\n"+JSON.stringify(testSchedule));
				return false;
			}
		});
	});
	return true;
}

function noTribeHasJohnDutyAndCampfireOnTheSameDay(testSchedule){
	testSchedule.forEach(function(day){
		day.johnDuty.forEach(function(johnTribe){
			if($.inArray(johnTribe, day.campFire)){
					//console.log("Rejecting schedule for tribe having John Duty and Campfire on the same day :\n"+JSON.stringify(testSchedule));
				return false;
			}
		});
	});
	return true;
}

var printCount = 0;

//For these purposes, Fun in the Forrest is Workshop Zero.
function noTribeHasKPAndFunInTheForestOnTheSameDay(testSchedule){
	testSchedule.forEach(function(day){
		day.kp.forEach(function(kpTribe){
			day.workshops.forEach(function(workshopSession){
				if($.inArray(kpTribe, workshopSession[0])){
					if (printCount === 0) {
						console.log("Rejecting schedule for tribe having KP and Fun in the Forest on the Same Day:\n"+JSON.stringify(testSchedule));
						printCount = 1;
					}
					return false;
				}
			});
		});
	});
	return true;
}

function noTribeHasKPAndJohnDutyOnTheSameDay(testSchedule){
	tribes.forEach(function(tribe){
		var kpDay = "";
		testSchedule.forEach(function(day){
			if($.inArray(tribe, day.kp) && $.inArray(tribe, day.johnDuty)){
				return false;
			}
		});
	});
	return true;
}

var criteriaToMeet = [
//eachTribeTakesEachWorkshopOnce, //Commented out for the "lazy" and less-brute workshop generation method I'm currently using.

noTribeHasJohnDutyAndCampfireOnTheSameDay,
noTribeHasKPAndJohnDutyOnTheSameDay,
noTribeHasKPAndFunInTheForestOnTheSameDay,
twoTribesDoNotMeetTwice];

function checkCriteria(testSchedule){
	criteriaToMeet.forEach(function(criteria){
		if (criteria(testSchedule)===false){
			return false;
		}
		return true;
	});
}

var sampleDaySchedule = [
	{name:"wednesday",
	kp:["Tribe A", "Tribe F"],
	johnDuty:["Tribe B", "Tribe C"],
	campFire:["Tribe D", "Tribe E"],
	workshops:[{
		1:["Tribe J", "Tribe I"],
		2:["Tribe C", "Tribe A"],
		3:["Tribe B", "Tribe F"],
		4:["Tribe D", "Tribe J"],
		5:["Tribe E", "Tribe G"]
	},
	{
		1:["Tribe J", "Tribe I"],
		2:["Tribe C", "Tribe A"],
		3:["Tribe B", "Tribe F"],
		4:["Tribe D", "Tribe J"],
		5:["Tribe E", "Tribe G"]
	}]
}];

var permArr = [], usedChars = [], chorePermutations = [], workshopPermutations=[];
function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};
var schedule=[
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]}];

function generateSchedules(){
	var goodScheduleCount = 0;
	var totalScheduleCount = 0;
	console.log("Generating schedules from template: "+JSON.stringify(schedule));
	var schedules = [];

	//First generate all chore permutations:
	var singleChorePermutations = permute(tribes);
	console.log("Single chore permutations created: "+singleChorePermutations.length);

	function addWorkshop(wPermutation){
		var answer = {
			1:[wPermutation[0], wPermutation[1]],
			2:[wPermutation[2], wPermutation[3]],
			3:[wPermutation[4], wPermutation[5]],
			4:[wPermutation[6], wPermutation[7]],
			5:[wPermutation[8], wPermutation[9]]
		};
		return answer;
	}

	function nextWorkshop(aWorkshop){
		var bWorkshop = {
			1:[aWorkshop[1][1], aWorkshop[2][1]],
			2:[aWorkshop[1][0], aWorkshop[3][1]],
			3:[aWorkshop[2][0], aWorkshop[4][1]],
			4:[aWorkshop[3][0], aWorkshop[5][1]],
			5:[aWorkshop[4][0], aWorkshop[5][0]]
		};
		return bWorkshop;
	}

	//An alternate method of generating functional workshop schedules:
	singleChorePermutations.forEach(function(workshopPermutation){
		//Clean the slate:
		schedule.forEach(function(day){
			day[workshops]=[];
		});
		var currentWorkshop = addWorkshop(workshopPermutation);
		
		schedule.forEach(function(day){
			day.workshops=[];
			if (day.name === "monday" ||  day.name === "tuesday"||day.name === "monday"||day.name === "thursday") {
				day.workshops.push(currentWorkshop);
				currentWorkshop = nextWorkshop(currentWorkshop);
			}
			if (day.name === "wednesday") {
				day.workshops.push(currentWorkshop);
				currentWorkshop = nextWorkshop(currentWorkshop);
				day.workshops.push(currentWorkshop);
				currentWorkshop = nextWorkshop(currentWorkshop);
			}
		});
		//Add campfire.  No campfire on Wednesday.
		for (var cfAdder = 0; cfAdder < 6; cfAdder++){
			var day = schedule[cfAdder];
			if (day.name !== "wednesday"){
				day.campfire.push(currentWorkshop[cfAdder]);
			}
		}

		console.log("Trying out a fresh workshop schedule.");

		//Go through all KP permutations:
		for (var kpPermNumber = 0; kpPermNumber<singleChorePermutations.length;kpPermNumber++){
			console.log("Seeking acceptable KP Permutation...");
			var kpWorks = false;
			while(!kpWorks){
				//Clean the slate:
				schedule.forEach(function(day){
					day.kp=[];
				});
				var kpPermutation = singleChorePermutations[kpPermNumber];
				var kpNumber = 0;
				for (var a=0; a<schedule.length; a++){
					var day = schedule[a];
					day.name = days[a];
					//Sunday has no KP
					if (days[a] !== "sunday") {
						schedule[a].kp.push(kpPermutation[kpNumber]);
						kpNumber+=1;
						schedule[a].kp.push(kpPermutation[kpNumber]);
						kpNumber+=1;
					}
				}
				if (noTribeHasKPAndFunInTheForestOnTheSameDay) {
					kpWorks = true;
					console.log("Found a working KP arrangement!  Took "+kpPermNumber+" tries.");
				}else{
					kPermNumber+=1;
					if (kpPermNumber % 10000 === 0){
						console.log("Tried "+kpPermNumber+" KP Permutations");
					}	
					if(kpPermNumber+1===singleChorePermutations.length){
						break;
					}
				}
			}
			//Add this permutation to the current schedule;
			
			//Next we'll go through all John Duty permutations:
			for(var jdPermNumber = 0; jdPermNumber<singleChorePermutations.length; jdPermNumber++){
				console.log("Enumerating new john duty permutation.");
				//Add this permutation to the current schedule, try it until it works, then move on.
			
				jdWorks=false;
				while(!jdWorks){
					//Clean the slate:
					schedule.forEach(function(day){
						day.johnDuty=[];
					});
					console.log("Applying and testing JD...");
					var jdPermutation = singleChorePermutations[jdPermNumber];
					var jdNumber = 0;
					for (var b = 0; b < days.length; b++){
						//Sunday has no jd
						if (days[b] !== "sunday") {
							schedule[b].johnDuty.push(jdPermutation[jdNumber]);
							jdNumber+=1;
							schedule[b].johnDuty.push(jdPermutation[jdNumber]);
							jdNumber+=1;
						}
					}
					if (noTribeHasKPAndJohnDutyOnTheSameDay(schedule) && noTribeHasJohnDutyAndCampfireOnTheSameDay(schedule)) {
						jdWorks = true;
						console.log("Found a working John Duty arrangement!  Took "+jdPermNumber+" tries.");
					}else{
						console.log("JD failed on try "+jdPermNumber);
						jdPermNumber+=1;
						if(jdPermNumber+1===singleChorePermutations.length){
							break;
						}
						if(jdPermNumber % 100000 === 0){
							console.log("Tried "+jdPermNumber+" JD Permutations");
						}
					}
				}

				//All workshops have been added to the schedule.  Time to evaluate it, and add it to the list if it's good.
				totalScheduleCount += 1;
				if (checkCriteria(schedule)) {
					schedules.push(schedule);
					goodScheduleCount += 1;
					console.log("Good schedule found!: "+JSON.stringify(schedule)+" total is now: "+goodScheduleCount+" out of "+totalScheduleCount);
					$('body').append("<h1>Schedule "+goodScheduleCount+" </h1>"+JSON.stringify(schedule)+"<br><br>");
				}else{
					if(totalScheduleCount % 1000000 === 0){
						console.log("------Bad schedule "+goodScheduleCount+"/"+totalScheduleCount);
					}
				}	
			}
		}
	});
	return schedules;	
}
var schedules = generateSchedules();
