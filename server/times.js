console.log('Starting times.js');

const fs = require('fs');

var fetchTimes = () => {
    try {
        var timesString = fs.readFileSync('times-data.json');
        return JSON.parse(timesString);
    } catch (e) {
        return [];
    }
};

var saveTimes = (times) => {
    fs.writeFileSync('times-data.json', JSON.stringify(times));
};

var addTime = (name, duration) => {
    var times = fetchTimes();
    var time = {
        name,
        duration
    };

    times.push(time);
    saveTimes(times);
    return time;

    //var duplicateTimes = times.filter((time) => time.name === name);

    //if (duplicateTimes.length === 0) {
        //times.push(time);
        //saveTimes(times);
        //return time;
    //}
};

var getAll = () => {
    return fetchTimes();
};

//var getTime = (name) => {
	//times = fetchTimes();
    //var filteredTimes = times.filter((time) => time.name === name);

    //for (let time of times) {
        //if (time.name === name) {
			//return time;
		//}
	//}
//};

//var removeTime = (name) => {
	//times = fetchTimes();
    //var updatedTimes = times.filter((time) => time.name !== name);
    //saveTimes(updatedTimes);

    //return times.length !== updatedTimes.length;
//};

var logTime = (result, time) => {
    console.log(`${result}`);
    console.log(`------------`);
    console.log(`Solver: ${time.name}`);
    console.log(`Total solve time: ${time.duration}`);
};

module.exports = {
    addTime,
    getAll,
    //getTime,
    //removeTime,
    logTime
}

//module.exports.age = () => {
    //console.log('addTime');
//return 'New time';
//};

//module.exports.add = (a, b) => {
    //return a + b;
//}
