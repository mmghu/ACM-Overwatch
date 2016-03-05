// Provides access to the database
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");

// Accessing the value when the webpage loads
myFirebaseRef.once('value', function(dataSnapshot){
  // Creates data variable with a snapshot of the database
  var data = dataSnapshot.exportVal();

  // Check status and update the website
  if(data.occupied){
    $("#result").html("someone is in the room");
  }
  else{
    $("#result").html("noone is in the room");
  }

});

// Instantly update the website incase status changes after initial page load
myFirebaseRef.on("child_changed", function(snapshot) {
  // Store instantaneus status in newOccupied
  var newOccupied = snapshot.exportVal();

  // Update status again
  if(newOccupied ){
    $("#result").html("someone is in the room");
  }
  else{
    $("#result").html("noone is in the room");
  }
});
