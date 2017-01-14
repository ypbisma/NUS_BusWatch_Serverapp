/*var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/v1/bus', function(req, res) {
	res.send("Test!!!")
})

app.post('/', function(req, res){
	res.send('Got a POST request')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
*/

var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

console.log(exists);

if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

//console.log(db);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE MyTable (item TEXT)");
  }

  var stmt = db.prepare("INSERT INTO MyTable VALUES(?)");

  // a TEXT, b TEXT, ..., z TEXT
  // INSERT INTO MyTable (a, b) VALUES (?, ?)

  //Insert random data
  var rnd;
  for(var i = 0; i<10; i++){
  	//rnd = Math.floor(Math.random() * 10000000);
  	stmt.run("The i " + (i+1) + ". Multiples of 2 is " + 2*(i+1));
  }

	stmt.finalize();

	// SELECT rowid FROM MyTable WHERE bus_number = '123A'

	db.each("SELECT rowid AS id, item FROM MyTable", function(err, row){
		console.log(row.id + ": " + row.item);
	});
});



db.close();