

var database = firebase.database();


$("#submitAddTrain").on("click", function(){
	event.preventDefault();
	var trainName = $('#trainInput').val();
	var destination = $('#destinationInput').val();
	var trainTimeElement = $('#trainTimeInput').val();
	var frequency = $('#frequencyInput').val();

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
		database.ref(/* location in db*/).set({
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
		var untilTrainArrives = trainTimeToMoment.diff(moment(), 'minutes');
	
		var row = $("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().trainTime + "</td><td>" + untilTrainArrives + "</td></tr>");
		$("#trainTable > tbody").append(row);
	 }
});
