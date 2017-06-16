

var database = firebase.database();

$("#submitAddTrain").on("click", function(){
	event.preventDefault();
	var trainName = $('#trainInput').val();
	var destination = $('#destinationInput').val();
	var trainTimeElement = $('#trainTimeInput').val();
	var frequency = $('#frequencyInput').val();

	database.ref(/* location in db*/).set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTimeElement,
    frequency: frequency
    });	
});

$("#deleteSchedules").on("click", function(){
	event.preventDefault();
	$("#trainTable").html("");
	database.ref().set({});
	location.reload();

});

database.ref().on("value", function (snapshot) {

	if (snapshot.val() == null){
		return;
	}

	else {
		
		var trainTime = snapshot.val().trainTime;
		var trainTimeToMoment = moment(trainTime);
		var ms = moment().diff(trainTimeToMoment);
		// var trainTime3 = trainTime2.format('HH:MM');
		// var trainTimeFormatted = trainTime.format('HH:MM');
		console.log(ms);

	// var currentHours = new Date().getHours();
	// var currentMinutes = new Date().getMinutes();
	// var hourMinCombined = (currentHours * 60) + currentMinutes;
		var enteredTrainTime = snapshot.val().trainTime;
		// var ms = moment(now,"HH:mm").diff(moment(enteredTrainTime,"HH:mm"));
		
	// var enteredTrainTimeSplit = enteredTrainTime.split(':');
	// var enteredTrainTimeToMin = (+enteredTrainTimeSplit[0]) * 60 + (+enteredTrainTimeSplit[1]);

	var row = $("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().trainTime + "</td><td>" + enteredTrainTime + "</td></tr>");
	$("#trainTable > tbody").append(row);
	 }

});

