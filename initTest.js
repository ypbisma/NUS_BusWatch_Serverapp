var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

console.log(exists);

if(!exists){
	console.log("Creating DB file.");
	fs.openSync(file,"w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	if(!exists){
		db.run("CREATE TABLE warehouses (name TEXT, capacity int) ");
	}

db.each("SELECT rowid AS id, name, capacity FROM warehouses", function(err, row){
	console.log(row.id + ": " + row.name + " " + row.capacity);
});
});

db.close();
