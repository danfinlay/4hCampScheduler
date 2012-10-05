
		console.log("Generate pressed.");
		$('body').text("Generate pressed.");

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
							console.log("Rejecting schedule for tribes not having all workshops:\n"+JSON.stringify(testSchedule));
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
							console.log("Rejecting schedule for tribe having John Duty and Campfire on the same day :\n"+JSON.stringify(testSchedule));
						return false;
					}
				});
			});
			return true;
		}

		//For these purposes, Fun in the Forrest is Workshop Zero.
		function noTribeHasKPAndFunInTheForestOnTheSameDay(testSchedule){
			testSchedule.forEach(function(day){
				day.kp.forEach(function(kpTribe){
					day.workshops.forEach(function(workshopSession){
						if($.inArray(kpTribe, workshopSession[0])){
							console.log("Rejecting schedule for tribe having KP and Fun in the Forest on the Same Day:\n"+JSON.stringify(testSchedule));
							return false;
						}
					});
				});
			});
			return true;
		}

		var criteriaToMeet = [
		eachTribeTakesEachWorkshopOnce, 
		twoTribesDoNotMeetTwice, 
		noTribeHasJohnDutyAndCampfireOnTheSameDay, 
		noTribeHasKPAndFunInTheForestOnTheSameDay];

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
		var schedule=[{name:"",johnDuty:[], campFire:[],kp:[], workshops:[]},
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


			//Go through all KP permutations:
			singleChorePermutations.forEach(function(kpPermutation){
				console.log("Sifting through new KP Permutation.");
				var kpNumber = 0;
				//Add this permutation to the current schedule;
				var a = 0;
				schedule.forEach(function(day){
					day.name = days[a];
					//Sunday has no KP
					if (days[a] !== "sunday") {
						schedule[a].kp.push(kpPermutation[kpNumber]);
						kpNumber+=1;
						schedule[a].kp.push(kpPermutation[kpNumber]);
						kpNumber+=1;
					}
					a+=1;
				});
				//Next we'll go through all John Duty permutations:
				singleChorePermutations.forEach(function(jdPermutation){
					console.log("Enumerating new john duty permutation.");
					var jdNumber = 0;
					//Add this permutation to the current schedule;
					for (var b = 0; b < days.length; b++){
						//Sunday has no jd
						if (days[b] !== "sunday") {
							schedule[b].johnDuty.push(jdPermutation[jdNumber]);
							jdNumber+=1;
							schedule[b].johnDuty.push(jdPermutation[jdNumber]);
							jdNumber+=1;
						}
					}
					//Next we'll go through all Campfire permutations:
					singleChorePermutations.forEach(function(cfPermutation){

						console.log("Enumerating new campfire permutation.");
						var cfNumber = 0;
						//Add this permutation to the current schedule;
						for (var i = 0; i < days.length; i++){
							//Wednesday has no cf
							if (days[i] !== "wednesday") {
								schedule[i].campFire.push(cfPermutation[cfNumber]);
								cfNumber+=1;
								schedule[i].campFire.push(cfPermutation[cfNumber]);
								cfNumber+=1;
							}
						}

						//Last we'll go through all workshop permutations.
						singleChorePermutations.forEach(function(w1Permutation){
							singleChorePermutations.forEach(function(w2Permutation){
								singleChorePermutations.forEach(function(w3Permutation){
									singleChorePermutations.forEach(function(w4Permutation){
										singleChorePermutations.forEach(function(w5Permutation){
											var workshops = [w1Permutation,w2Permutation,w3Permutation,w4Permutation,w5Permutation];
											function addWorkshop(wPermutation){
												return {
													1:[wPermutation[0], wPermutation[1]],
													2:[wPermutation[2], wPermutation[3]],
													3:[wPermutation[4], wPermutation[5]],
													4:[wPermutation[6], wPermutation[7]],
													5:[wPermutation[8], wPermutation[9]]
												};
											}
											var workshopNumber = 0;
											schedule.forEach(function(day){
												day[workshops]=[];
												if (day.name === "monday" ||  day.name === "tuesday"||day.name === "monday"||day.name === "thursday") {
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
												}
												if (day.name === "wednesday") {
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
													day.workshops.push(addWorkshop(workshops[workshopNumber]));
													workshopNumber+=1;
												}
											});
											//All workshops have been added to the schedule.  Time to evaluate it, and add it to the list if it's good.
											totalScheduleCount += 1;
											if (checkCriteria(schedule)) {
												schedules.push(schedule);
												goodScheduleCount += 1;
												console.log("Good schedule found!: "+JSON.stringify(schedule)+" total is now: "+goodScheduleCount+" out of "+totalScheduleCount);
												$('body').append("<h1>Schedule "+goodScheduleCount+" </h1>"+JSON.stringify(schedule)+"<br><br>");
											}else{
												console.log("------Bad schedule "+goodScheduleCount+"/"+totalScheduleCount);
											}
										});
									});
								});
							});
						});
					});
				});

			});
			return schedules;	
		}

		var schedules = generateSchedules();
