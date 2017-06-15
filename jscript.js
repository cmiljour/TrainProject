

var database = firebase.database();
var minutesAway = 10;

// function minutesUntilArrival (){
// 	currentTime = new Date();
	
// }

$("#submitAddTrain").on("click", function(){
	event.preventDefault();
	var trainName = $('#trainInput').val();
	var destination = $('#destinationInput').val();
	var trainTime = $('#trainTimeInput').val();
	var frequency = $('#frequencyInput').val();

	database.ref(/* location in db*/).set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
    });	
});

database.ref().on("value", function (snapshot) {
	var currentHours = new Date().getHours();
	var currentMinutes = new Date().getMinutes();
	var hourMinCombined = (currentHours * 60) + currentMinutes;
	var enteredTrainTime = snapshot.val().trainTime;
	var enteredTrainTimeSplit = enteredTrainTime.split(':');
	var enteredTrainTimeToMin = (+enteredTrainTimeSplit[0]) * 60 + (+enteredTrainTimeSplit[1]);

	var row = $("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().trainTime + "</td><td>" + (Math.abs(enteredTrainTimeToMin - hourMinCombined)) + "</td></tr>");
	$("#trainTable > tbody").append(row);
    console.log(snapshot.val());
    console.log(enteredTrainTimeToMin);
    
});

