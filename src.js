function readyFunction(){
	$('#generate').click(function(event){
		event.preventDefault();
		console.log("Generate pressed.");
		$('body').text("Generate pressed.");

		var tribes = ["Tribe A","Tribe B",
			"Tribe C", "Tribe D", "Tribe E",
			"Tribe F", "Tribe G", "Tribe H",
			"Tribe I", "Tribe J"];
		var workshops = [1,2,3,4,5];
		var days = ["sunday", "monday","tuesday","wednesday","thursday","friday"];
		var chores = ["KP", "johnDuty", "campfire"];

		var criteria1 = function(schedule){
			return true;
		}
		var criteria2 = function(schedule){
			return false;
		}
		var criteriaToMeet = [criteria1, criteria2];

		function checkCriteria(schedule){
			criteriaToMeet.forEach(criteria){
				if (criteria(schedule)===false){
					return false;
				}
				return true;
			}
		}

		var sampleDaySchedule = [
			{name:"monday",
			kp:["Tribe A", "Tribe F"],
			johnDuty:["Tribe B", "Tribe C"],
			campFire:["Tribe D", "Tribe E"],
			workshops:{
				1:["Tribe J", "Tribe I"],
				2:["Tribe C", "Tribe A"],
				3:["Tribe B", "Tribe F"],
				4:["Tribe D", "Tribe J"],
				5:["Tribe E", "Tribe G"]
			}
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
		var schedule=[{},{},{},{},{},{}];

		function generateSchedules(){
			var schedules = [];

			//First generate all chore permutations:
			var singleChorePermutations = permute(tribes);


			//Go through all KP permutations:
			singleChorePermutations.forEach(kpPermutation){
				var kpNumber = 0;
				//Add this permutation to the current schedule;
				for (var i = 0; i < days.length; i++){
					schedule[i][name]=days[i];
					//Sunday has no KP
					if (days[i] !== "sunday") {
						schedule[i][kp].push(kpPermutation[kpNumber]);
						kpNumber+=1;
						schedule[i][kp].push(kpPermutation[kpNumber]);
						kpNumber+=1;
					}
				}
				//Next we'll go through all John Duty permutations:
				singleChorePermutations.forEach(jdPermutation){
					var jdNumber = 0;
					//Add this permutation to the current schedule;
					for (var i = 0; i < days.length; i++){
						//Sunday has no jd
						if (days[i] !== "sunday") {
							schedule[i][jd].push(jdPermutation[jdNumber]);
							jdNumber+=1;
							schedule[i][jd].push(jdPermutation[jdNumber]);
							jdNumber+=1;
						}
					}
					//Next we'll go through all Campfire permutations:
					singleChorePermutations.forEach(cfPermutation){
						var cfNumber = 0;
						//Add this permutation to the current schedule;
						for (var i = 0; i < days.length; i++){
							//Wednesday has no cf
							if (days[i] !== "wednesday") {
								schedule[i][cf].push(cfPermutation[cfNumber]);
								cfNumber+=1;
								schedule[i][cf].push(cfPermutation[cfNumber]);
								cfNumber+=1;
							}
						}

						//Last we'll go through all workshop permutations.

					}
				}

			}
			return schedules;	
		}
		var schedules = generateSchedules();
	});
}