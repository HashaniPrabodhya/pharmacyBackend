// src/routes/customer.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { checkPermissions } = require('../middleware/permissions');

// Customer records endpoint - Querying all records
router.get('/', checkPermissions('User'), (req, res) => {
    const query = 'SELECT * FROM customer_records WHERE is_deleted = 0';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
});

// Customer records endpoint - Inserting a new record
router.post('/', checkPermissions('Owner'), (req, res) => {
    const { name, email } = req.body;

    // Validate input (you may want to add more robust validation)
    if (!name || !email) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Insert the new customer record into the database
    const query = 'INSERT INTO customer_records (name, email) VALUES (?, ?)';
    db.run(query, [name, email], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Customer record created successfully.' });
    });
});

// Customer records endpoint - Updating a record
router.put('/:id', checkPermissions('Owner', 'Manager'), (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;

    // Validate input (you may want to add more robust validation)
    if (!name || !email) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Update the customer record in the database
    const query = 'UPDATE customer_records SET name = ?, email = ? WHERE id = ?';
    db.run(query, [name, email, id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Customer record updated successfully.' });
    });
});

// Customer records endpoint - Deleting a record
router.delete('/:id', checkPermissions('Owner'), (req, res) => {
    const id = req.params.id;

    // Delete the customer record from the database
    const query = 'DELETE FROM customer_records WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Customer record deleted successfully.' });
    });
});

// Customer records endpoint - Soft Deleting a record
router.put('/soft-delete/:id', checkPermissions('Owner', 'Manager'), (req, res) => {
    const id = req.params.id;

    // Soft delete the customer record in the database
    const query = 'UPDATE customer_records SET is_deleted = 1 WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Customer record soft deleted successfully.' });
    });
});

module.exports = router;
