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
		db.run("CREATE TABLE LastMacLocation (macAddress TEXT, latitude TEXT, longitude TEXT, floor TEXT)");
		db.run("CREATE TABLE MacLocation (macAddress TEXT, latitude TEXT, longitude TEXT, floor TEXT)");		
}

 db.each("Select rowid AS id, nodeId, vehicleSerial, gpsTime, latitude, longitude, heading FROM LastBusInformation", function(err, row){
  	console.log(row.id + ": " + row.nodeId + " " + row.vehicleSerial + " " + row.gpsTime + " " + row.latitude + " " + row.longitude + " " + row.heading);
  });

 // db.each("Select rowid AS id, nodeId, vehicleSerial, gpsTime, latitude, longitude, heading FROM BusInformation", function(err, row){
 //  	console.log(row.id + ": " + row.nodeId + " " + row.vehicleSerial + " " + row.gpsTime + " " + row.latitude + " " + row.longitude + " " + row.heading);
 //  });

 db.each("Select rowid AS id, macAddress, latitude, longitude, floor FROM LastMacLocation", function(err, row){
  	console.log(row.id + ": " + row.macAddress + " " + row.latitude + " " + row.longitude + " " + row.floor);
  });

});


db.close();