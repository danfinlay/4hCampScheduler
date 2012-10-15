var evaluator = require('./4hCampEvaluator');

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
module.exports.permute = permute;


var totalScheduleCount = 0;
var tribes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var workshops = [1,2,3,4,5];
var days = ["sunday", "monday","tuesday","wednesday","thursday","friday"];
var chores = ["KP", "johnDuty", "campfire"];

var schedule=[
	{name:"sunday",johnDuty:[], campFire:[],kp:[], workshops:[]},
	{name:"monday",johnDuty:[], campFire:[],kp:[], workshops:[]},
	{name:"tuesday",johnDuty:[], campFire:[],kp:[], workshops:[]},
	{name:"wednesday",johnDuty:[], campFire:[],kp:[], workshops:[]},
	{name:"thursday",johnDuty:[], campFire:[],kp:[], workshops:[]},
	{name:"friday",johnDuty:[], campFire:[],kp:[], workshops:[]}
];

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

function staggerSchedule(aWorkshop){
	bWorkshop = [];
	for(var i = 0; i < aWorkshop.length; i++){
		if (i+4 < aWorkshop.length) {
			bWorkshop.push(aWorkshop[i+4]);
		}else{
			bWorkshop.push(aWorkshop[i-6]);
		}
	}
	return bWorkshop;
}

var singleChorePermutations = permute(tribes);

function findWorkingWorkshopsFor(aSchedule){
}

function generate(desiredScheduleCount){
	var goodScheduleCount = 0;
	var goodSchedules = [];
	console.log("Generating schedules for template: "+JSON.stringify(schedule));
	console.log("Single chore permutations created: "+singleChorePermutations.length);

	console.log("Randomly Generating KP Schedule.");
	for (var kpPermNumber = Math.floor(Math.random()*singleChorePermutations.length); 
		goodScheduleCount<desiredScheduleCount;
		kpPermNumber=Math.floor(Math.random()*singleChorePermutations.length)){
		var i = 0;
		var x = 0;

		schedule.forEach(function(day){
			day.kp = [];
			var workshopSchedule = staggerSchedule(singleChorePermutations[kpPermNumber]);
			//No KP on Sunday
			if(day.name!=="sunday"){
				day.kp.push(singleChorePermutations[kpPermNumber][i]);
				day.kp.push(singleChorePermutations[kpPermNumber][i+1]);
				i+=2;
			}

			if (day.name === "monday" || day.name === "tuesday" || day.name === "thursday") {
				day.workshops = [{1:[],2:[],3:[],4:[],5:[]}];
				day.workshops[0][1].push(workshopSchedule[x]);
				day.workshops[0][1].push(workshopSchedule[x+1]);
				x+=2;
			}else if (day.name === "wednesday") {
				day.workshops = [{1:[],2:[],3:[],4:[],5:[]},{1:[],2:[],3:[],4:[],5:[]}];
				day.workshops[0][1].push(workshopSchedule[x]);
				day.workshops[0][1].push(workshopSchedule[x+1]);
				day.workshops[1][1].push(workshopSchedule[x+2]);
				day.workshops[1][1].push(workshopSchedule[x+3]);
				x+=4;
			}
		});
		console.log("Workshops and KP added.");
		//Add workshops to avoid KP:


		//Next find compatible John Duty:
		for(var jdPermNumber = 0; 
			jdPermNumber < singleChorePermutations.length && goodScheduleCount < desiredScheduleCount; 
			jdPermNumber++){
			i = 0;
			schedule.forEach(function(day){
				day.johnDuty=[];
				if(day.name!== "sunday"){	
					day.johnDuty.push(singleChorePermutations[jdPermNumber][i]);
					day.johnDuty.push(singleChorePermutations[jdPermNumber][i+1]);
					i+=2;
				}
			});
			if(evaluator.noTribeHasKPAndJohnDutyOnTheSameDay(schedule)){
				//Applying Campfire Tribes
				for(var cfPermNumber = 500000; 
					cfPermNumber < singleChorePermutations.length && goodScheduleCount < desiredScheduleCount; 
					cfPermNumber++){
					i = 0;
					schedule.forEach(function(day){
						day.campFire = [];
						if(day.name!=="wednesday"){
							day.campFire.push(singleChorePermutations[cfPermNumber][i]);
							day.campFire.push(singleChorePermutations[cfPermNumber][i+1]);
							i+=2;
						}
					});
					if(evaluator.noTribeHasJohnDutyAndCampfireOnTheSameDay(schedule)&&
						evaluator.noTribeHasKPAndCampfireOnTheSameDay(schedule)){
						console.log("\nSchedule %s", goodScheduleCount+1);
						console.log(JSON.stringify(schedule, null, "\t"));
						goodSchedules.push(schedule);
						goodScheduleCount += 1;
						break;
						break;
						break;
						break;
						break;
						break;
						break;
					}
					
				}
			}
		}
	}
	return goodSchedules;
}
module.exports.generate = generate;