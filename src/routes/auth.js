// src/routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { checkPermissions, secretKey } = require('../middleware/permissions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registration endpoint
router.post('/register', async (req, res) => {
    const { name, username, password, role } = req.body;

    // Validate input 
    if (!name || !username || !password || !role) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // // Check if the username already exists
    // const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    // if (existingUser) {
    //     return res.status(400).json({ error: 'Username already exists. Choose a different username.' });
    // }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = 'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)';
    db.run(query, [name, username, hashedPassword, role], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User created successfully.' });
    });
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate input (you may want to add more robust validation)
    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide username and password.' });
    }

    // Check if the user with the given username exists
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // // Compare hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //     return res.status(401).json({ error: 'Invalid username or password.' });
    // }

    // // Generate a JWT token
    // const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    // res.json({ token });

    // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Check if the password is not valid
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });

});




module.exports = router;
