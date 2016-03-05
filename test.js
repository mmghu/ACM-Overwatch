// Provides access to the database
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");

// Accessing the value when the webpage loads
myFirebaseRef.child("system-variables").once('value', function(dataSnapshot){
  // Creates data variable with a snapshot of the database
  var data = dataSnapshot.exportVal();

  // Check status and update the website
  if(data.occupied){
    $("#result").html("someone is in the room");
  }
  else{
    $("#result").html("noone is in the room");
  }
  $("#result2").html("The time was last updated at " + data.timechanged);

});

// Instantly update the website incase status changes after initial page load
myFirebaseRef.child("system-variables").on("child_changed", function(snapshot) {
  // Store instantaneus status in newOccupied
  var newDataVal = snapshot.exportVal();
  var snapshotName = snapshot.key();

  switch(snapshotName){
    // Update status again
    case "occupied":
      if(newDataVal){
        $("#result").html("someone is in the room");
      }
      else{
        $("#result").html("noone is in the room");
      }
      break;
    case "timechanged":
      $("#result2").html("The time was updated to " + newDataVal);
      break;
  }

});
