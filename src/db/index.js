//src/db/index.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pharmacy.db');


db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, username TEXT, password TEXT, role TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS medication_records (id INTEGER PRIMARY KEY, name TEXT, description TEXT, is_deleted INTEGER DEFAULT 0)");
    db.run("CREATE TABLE IF NOT EXISTS customer_records (id INTEGER PRIMARY KEY, name TEXT, email TEXT, is_deleted INTEGER DEFAULT 0)");
});


module.exports = db;