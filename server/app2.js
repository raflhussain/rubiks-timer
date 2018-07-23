const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/rubiks.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to rubikstimes database.');
});

//db.serialize(function() {
    //db.run(`CREATE TABLE [IF NOT EXISTS] rubiks.times (
        //id integer PRIMARY KEY,
        //username text NOT NULL UNIQUE,
        //time text NOT NULL
    //);`);

    //var qry = db.prepare('SELECT NOW();');
    //qry.finalize();
//});

db.close();
