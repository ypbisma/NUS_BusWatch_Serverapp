var fs = require("fs");
var file = "watchnus.db";
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
		db.run("CREATE TABLE BusNameList (nodeId TEXT, vehicleSerial TEXT) ");
		db.run("CREATE TABLE BusInformation (nodeId TEXT, gpsTime TEXT, latitude TEXT, longitude TEXT, heading TEXT)");
		db.run("CREATE TABLE MacAddress (macAddress TEXT)");
		db.run("CREATE TABLE MacLocation (macAddress TEXT, latitude TEXT, longitude TEXT, building TEXT, floor TEXT)");		
}

var stmt = db.prepare("INSERT INTO BusNameList VALUES (?,?)");

for(var i = 0; i<10; i++){
  	//rnd = Math.floor(Math.random() * 10000000);
  	stmt.run("nodeId no. " + (i+1), "vehicleSerial no. " + (i+1));
  }

  stmt.finalize();

 /* db.each("Select rowid AS id, item FROM BusNameList", function(err, row){
  	console.log(row.id + ": " + row.item);
  });*/

});

db.close();