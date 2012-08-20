function readyFunction(){
	$('#generate').click(function(event){
		event.preventDefault();
		console.log("Generate pressed.");
		$('body').text("Generate pressed.");

		var tribes = [1,2,3,4,5,6,7,8,9,10];


		var criteria1 = function(schedule){
			return true;
		}
		var criteria2 = function(schedule){
			return false;
		}
		var criteriaToMeet = [criteria1, criteria2];

		function checkCriteria(schedule){
			for (var i=0; i < criteriaToMeet.length; i++){
				if (criteriaToMeet[i]()==false){
					return false;
				}
				return true;
			}
		}

		function generateSchedule(tribes){

			//Generate schedule, run it through checkCriteria.
			//If checkCriteria returns true, then that schedule
			//meets all criteria functions.			
		}


		var schedule = generateSchedule(tribes);
	});
}