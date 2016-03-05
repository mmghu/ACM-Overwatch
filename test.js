// Provides access to the database
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");

// Accessing the value when the webpage loads
myFirebaseRef.once('value', function(dataSnapshot){
  // Creates data variable with a snapshot of the database
  var data = dataSnapshot.exportVal();

  // If the database entry "occupied" is set to true, alert
  if(data.occupied == "true"){
    alert("someone is in the room");
  }

});
