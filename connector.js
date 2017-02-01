var file = "nuswatch.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

var connect = function() {
	return db;
}

module.exports.connect = connect;
