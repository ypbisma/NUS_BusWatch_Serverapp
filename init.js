var fs = require("fs");
var file = "nuswatch.db";
var exists = fs.existsSync(file);

console.log(exists);

if(!exists){
	console.log("Creating DB file.");
	fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	if(!exists){
		db.run("CREATE TABLE LastBusInformation (nodeId TEXT, vehicleSerial TEXT, gpsTime TEXT, latitude TEXT, longitude TEXT, heading TEXT) ");
		db.run("CREATE TABLE BusInformation (nodeId TEXT, vehicleSerial TEXT, gpsTime TEXT, latitude TEXT, longitude TEXT, heading TEXT)");
		db.run("CREATE TABLE LastMacLocation (macAddress TEXT, latitude TEXT, longitude TEXT, zone TEXT, building TEXT, floor TEXT)");
		db.run("CREATE TABLE MacLocationHistory (macAddress TEXT, latitude TEXT, longitude TEXT, zone TEXT, building TEXT, floor TEXT)");	
}


});


db.close();