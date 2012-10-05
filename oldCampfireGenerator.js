		//Next we'll go through all Campfire permutations:
		for(var cfPermNumber = 0; cfPermNumber < singleChorePermutations.length; cfPermNumber=Math.floor(Math.random()*singleChorePermutations.length)){
			console.log("Adding Campfire...");
			cfWorks = false;
			while(!cfWorks){
				//Clean the slate:
				schedule.forEach(function(day){
					day.campFire=[];
				});
				var cfPermutation = singleChorePermutations[cfPermNumber];
				//console.log("Enumerating new campfire permutation.");
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
				if (noTribeHasJohnDutyAndCampfireOnTheSameDay(schedule)) {
					cfWorks=true;
					console.log("Found a working campfire arrangement!  Took "+cfPermNumber+" tries.");
				}else{
					cfPermNumber+=1;
					if(cfPermNumber % 10000 === 0){
						console.log("Tried " +cfPermNumber+" Campfire Permutations.");
						if(cfPermNumber+1===singleChorePermutations.length){
							break;
						}
					}
				} 
			}