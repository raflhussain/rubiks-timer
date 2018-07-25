const express = require('express');
const bodyParser = require('body-parser');

// Create express app and define port
const app = express();
const PORT = process.env.PORT || 3000;

// Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Database configuration
const dbConfig = require('./config/database.config.js');
const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(dbConfig.url, (err, client) => {
    if (err) {
        console.log(err);
        console.log('Error: Could not connect to rubiks database. Exiting now...');
        process.exit();
    }
    db = client.db('rubiks');
    console.log('Successfully connected to the database.');

    // Listen for requests
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

const times = [ { username: 'rxflhussxin', time: '01:03' },
              { username: 'eamal27', time: '00:49' } ];

const test = { username: 'test', time: '00:00' };

// Main route
app.get('/', (req, res) => {
    res.json({'message': "Welcome to the Rubik's timer. Improve your solve time!"});
});

app.post('/times', (req, res) => {
    db.collection('times').save(test, (err, result) => {
        if (err) return console.log(err);

        console.log('Time added to database.');
        res.redirect('/');
    });
});

app.get('/times', (req, res) => {
    var cursor = db.collection('times').find().toArray( (err, results) => {
        console.log(results);
        res.json(results);
    });
    //res.redirect('/');
});
