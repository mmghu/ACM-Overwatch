// Provides access to the database and database variables
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://acmoverwatch.firebaseio.com/");
var sysRef = myFirebaseRef.child("system-variables");

//provides the input that we're using
var Gpio = require('onoff').Gpio,
    sensor = new Gpio(17, 'in','both');

//function to watch for when button updates
sensor.watch(function(err, value) {
  var updateTime =Date.now();//gets the time of the request
  //value is 0 for false and 1 for true
  if(value==1){
    console.log("true");
    sysRef.update({"occupied":true});//updating data from sysRef
  }else {
    console.log("false");
    sysRef.update({"occupied":false});
  }

  //updates the time of the request to the most recent in the database
  sysRef.update({"timechanged":updateTime});
});
