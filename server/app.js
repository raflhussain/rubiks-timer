const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const times = require('./times.js');
const yargs = require('yargs');

var nameOptions = {
    describe: "Rubik's solver name",
    demand: true,
    alias: 'u'
}

var timeOptions = {
    describe: 'Solve time',
    demand: true,
    alias: 't'
}

const argv = yargs
    .command('add', 'Add a new time', {
        name: nameOptions,
        duration: timeOptions
    })
    .command('list', 'List all times')
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var time = times.addTime(argv.name, argv.duration);
    if (time) {
        var result = 'Time added';
        times.logTime(result, time);
    } else {
        console.log('Error! Time not added')
    }
} else if (command === 'list') {
    var allTimes = times.getAll();
    console.log(`Printing all ${allTimes.length} time(s)`);
    for (let [index, time] of allTimes.entries()) {
        console.log(`\n`);
        times.logTime(index+1, time);
    };
} else {
    console.log('Command not recognized');
}
