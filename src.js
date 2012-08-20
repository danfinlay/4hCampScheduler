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
		var days = ["monday","tuesday","wednesday","thursday","friday"];
		var chores = ["breakfastKP", "lunchKP", "dinnerKP", "johnDuty"];

		var criteria1 = function(schedule){
			return true;
		}
		var criteria2 = function(schedule){
			return false;
		}
		var criteriaToMeet = [criteria1, criteria2];

		function checkCriteria(schedule){
			for (var i=0; i < criteriaToMeet.length; i++){
				if (criteriaToMeet[i](schedule)===false){
					return false;
				}
				return true;
			}
		}

		function generateSchedule(tribes){
			var schedule = {};
			for (day in days){
				schedule[day]={};
			}
			for (day in schedule){
				for (chore in chores){
					//I have no idea how you'll systematically
					//generate this many variables.  I look
					//Forward to seeing it done nicely :)
				}
			}
			//Generate schedule, run it through checkCriteria.
			//If checkCriteria returns true, then that schedule
			//meets all criteria functions.			
		}


		var schedule = generateSchedule(tribes);
	});
}