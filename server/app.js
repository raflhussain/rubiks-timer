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
    //.command('read', 'Read a note', { title: titleOptions })
    //.command('remove', 'Remove a time', { title: titleOptions })
    .help()
    .argv;
//var command = process.argv[2];
var command = argv._[0];
//console.log('Command: ', command);
//console.log('Process: ', process.argv);
//console.log('Yargs: ', argv);

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
//} else if (command === 'read') {
    //var note = notes.getNote(argv.title);
    //if (note) {
        //var result = 'Note found';
        //notes.logNote(result, note);
    //} else {
        //console.log('Note not found');
    //}
//} else if (command === 'remove') {
    //var noteRemoved = notes.removeNote(argv.title);
    //var message = noteRemoved ? 'Note removed' : 'Note not found';
    //console.log(message);
} else {
    console.log('Command not recognized');
}


//var user = os.userInfo();

// Option 1
/*fs.appendFile('greetings.txt', 'Helloo0o0 \n', function (err) {
    if (err) {
        console.log('Unable to write to file');
    }
}); */

// Option 2
//fs.appendFileSync('greetings.txt', `Helloo0o0 ${user.username}! You are ${notes.age}.\n`);


//console.log('Result: ', notes.add(9,-2));

//var first = _.isString('@rxflhussxin');
//var second = _.isString(true);
//console.log(first)
//console.log(second)


//var unfilteredArray = ['Rafl', 2, 6, 1, 'Elias', 2, 3, 'Elias', 4, 'foo', 'foo', 'bar'];
//var filteredArray = _.uniq(unfilteredArray);
//console.log(unfilteredArray);
//console.log(filteredArray);
