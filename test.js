// Provides access to the database
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");
var updateTime = Date.now();

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
  updateTime = data.timechanged;
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
      updateTime = newDataVal;

      break;
  }

});

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function startTime() {
  var d = new Date(updateTime);
  var epoch = new Date();
  var timeDiff = Math.abs(d.getTime() -epoch.getTime())/1000; // in seconds
  var timeSince = timeDiff/(3600);//in hours
  var timeType = "hours";
  if(timeDiff<60){
    timeSince = Math.round(timeDiff);
    timeType = "seconds";
  } else if(timeDiff < 3600){
    timeSince = Math.round(timeDiff/60);
    timeType = "minutes";
  }else if(timeDiff < 3600*24){
    timeSince = Math.round(timeDiff/3600);
    timeType = "hours";
  }else{
    timeSince = Math.round(timeDiff/(3600*24));
    timeType = "days";
  }
  $("#result2").html("The time was last updated " + timeSince+" "+timeType+" ago.");
  var t = setTimeout(startTime, 500);
}
startTime();
