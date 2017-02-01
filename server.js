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
				busList.push({id: rows[i].id, latitude: rows[i].latitude, longi: rows[i].longitude});
			}		
			
			res.json({bus_infos: busList});
		});
	});
});

router.get('/new', function(req, res) {
	res.json({test: "NEWWW!!!"});
});

//Register Our Routes
//all of our routes will be prefixed with /api
app.use('/api', router);

//Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
