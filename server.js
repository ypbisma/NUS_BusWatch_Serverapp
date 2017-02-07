//call the packages we need

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var file = "nuswatch.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	//set our port

//	ROUTES FOR OUR API
// ===============

var router = express.Router();

// test route to make sure everything is working

router.get('/bus', function(req, res) {
	

	db.serialize(function() {
		var busList = [];
		db.all("Select rowid AS id, nodeId, gpsTime, latitude, longitude, heading FROM LastBusInformation", function(err, rows) {
			for (var i = 0; i < rows.length; i++) {
				busList.push({id: rows[i].id, latitude: rows[i].latitude, longitude: rows[i].longitude, heading: rows[i].heading});
			}		
			
			res.json({bus_infos: busList});
		});
	});
});


router.get('/macaddress', function(req, res) {
	

	db.serialize(function() {
		var macLocationList = [];
		db.all("Select rowid AS id, macAddress, latitude, longitude, floor FROM LastMacLocation", function(err, rows) {
			for (var i = 0; i < rows.length; i++) {
				macLocationList.push({id: rows[i].id, macAddress: rows[i].macAddress, latitude: rows[i].latitude, longitude: rows[i].longitude, floor: rows[i].floor});
			}		
			
			res.json({bus_infos: macLocationList});
		});
	});
});



//Register Our Routes
//all of our routes will be prefixed with /api
app.use('/api', router);

//Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
