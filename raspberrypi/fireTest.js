// Provides access to the database and database variables
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");
var sysRef = myFirebaseRef.child("system-variables");

var delayTime = 5;

//provides the input that we're using
var Gpio = require('onoff').Gpio,
    sensor = new Gpio(17, 'in','both');

//function to watch for when button updates
sensor.watch(function(err, value) {
  var updateTime = Date.now();
  var previousTime = 0;

  sysRef.once('value',function(snapshot){
    previousTime = snapshot.exportVal().timechanged;
    //only let the value change every 30 seconds max for now
    if((updateTime-previousTime)/1000>delayTime){
      console.log((updateTime-previousTime));
      var previousState = snapshot.exportVal().occupied;
      //value is 0 for false and 1 for true
      if(previousState&&value==0){
        console.log("false");
        sysRef.update({"occupied":false});
      }else if (!previousState&&value==1) {
        console.log("true");
        sysRef.update({"occupied":true});
      }

      sysRef.update({"timechanged":updateTime});
      //updates the log with new entries
      var roomlogRef=myFirebaseRef.child("roomlog");
      roomlogRef.push({"value":value,"time":Firebase.ServerValue.TIMESTAMP});
    }
  });

});
