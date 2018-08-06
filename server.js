const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const MongoClient = require('mongodb').MongoClient;

// Create express app and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Database configuration
var db;
MongoClient.connect(dbConfig.url, (err, client) => {
    if (err) {
        console.log(err);
        console.log('Error: Could not connect to rubiks database. Exiting now...');
        process.exit();
    }
    db = client.db('rubiks');
	times = db.collection('times');
    console.log('Successfully connected to the database.');

    // Listen for requests
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

// Main route
app.get('/', (req, res) => {
    res.json({'message': "Welcome to the Rubik's timer. Improve your solve time!"});
});

// Add new time
app.post('/addTime', (req, res) => {
	times.insertOne(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log('Added to database:');
		console.log(req.body);
		res.redirect('/');
	});
});

// Get complete list of times
app.get('/getTimes', (req, res) => {
    var cursor = times.find().toArray( (err, results) => {
        console.log(results);
        res.json(results);
    });
});

// Get user specific times
//app.get('/getTime:<username>', (req, res) => {
app.get('/getTime', (req, res) => {
    var cursor = times.find(req.body).toArray( (err, results) => {
        console.log(results);
        res.json(results);
    });
});

// Get user personal record
app.get('/getBestTime', (req, res) => {
    var cursor = times.find(req.body).toArray( (err, results) => {
		// find greatest value in array
        console.log(results);
        res.json(results);
    });
});

// Get record times
app.get('/getBestTime', (req, res) => {
    var cursor = times.find({}).toArray( (err, results) => {
		// find grratest values in array
        console.log(results);
        res.json(results);
    });
});

// Clear all times
app.get('/removeAll', (req, res) => {
    var cursor = times.remove({});
	console.log('Database cleared.');
	res.redirect('/');
});

// Remove single time 
app.get('/removeTime', (req, res) => {
    var cursor = times.remove(req.body);
	console.log('Time removed:');
	console.log(req.body);
	res.redirect('/');
});
