// src/app.js

const express = require('express');
const app = express();
const usersRouter = require('./src/routes/auth');
const medicationRecordsRouter = require('./src/routes/medication');
const customerRecordsRouter = require('./src/routes/customer');
const db = require('./src/db');

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', usersRouter);
app.use('/medication-records', medicationRecordsRouter);
app.use('/customer-records', customerRecordsRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the server is closed
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});
