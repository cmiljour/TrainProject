
var database = firebase.database();
// create array to hold each firebase entry's moment timestamp
var momentArray = [];

$("#submitAddTrain").on("click", function(){
	event.preventDefault();
	var trainName = $('#trainInput').val();
	var destination = $('#destinationInput').val();
	var trainTimeElement = $('#trainTimeInput').val();
	var frequency = $('#frequencyInput').val();
	var theMoment = new Date(trainTimeElement);
	

	var trainTimeToMoment = moment(trainTimeElement);
	var untilTrainArrives = trainTimeToMoment.diff(moment(), 'minutes');

	if (trainName === "" || destination === "" || trainTimeElement === "" || frequency === "" ){
		alert("All the fields haven't been filled out, please check again!");
		return;
	}

	else if (untilTrainArrives < 0) {
		alert("You can't enter a 'First Train Time' in the past!");
	}

	else {
		database.ref(/* location in db*/).push({
	    trainName: trainName,
	    destination: destination,
	    trainTime: trainTimeElement,
	    frequency: frequency
    	});
    }	
});

$("#deleteSchedules").on("click", function(){
	event.preventDefault();
	$("#trainTable").html("");
	//blank out firebase 
	database.ref().set({});
	//blank array holding moments
	momentArray = [];
	location.reload();

});

database.ref().on('child_removed', function(oldChildSnapshot) {
	location.reload();
});

database.ref().on("child_added", function (snapshot) {

	var trainTime = snapshot.val().trainTime;
	var trainTimeToMoment = moment(trainTime);
	var untilTrainArrives = trainTimeToMoment.diff(moment(), 'minutes');
	var row = $("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().trainTime + "</td><td>" + untilTrainArrives + "</td></tr>");
	$("#trainTable > tbody").append(row);
	//add moment to array to use later to setup setinterval minutes away
	momentArray.push(trainTime); 
});
// this function goes through the momentArray, comparing current time to time in index position, and updating html with results
function trainTimeToMoment () {
	for (var i = 0; i < momentArray.length; i++) {
		var momentArrayElement = moment(momentArray[i]);
		var untilTrainArrivesDiff = momentArrayElement.diff(moment(), 'minutes');
		var updateMinAway = $("#trainTable > tbody tr").eq(i).children().eq(4) // the 4th td in the i row! 
		$(updateMinAway).html(untilTrainArrivesDiff);
	}
}
//create timer to refresh minutes away 
var minutesAwayUpdate = window.setInterval(trainTimeToMoment, 1000 * 60);
