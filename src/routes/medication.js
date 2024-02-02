// src/routes/medication.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { checkPermissions } = require('../middleware/permissions');

// Medication records endpoint - Querying all records
router.get('/', checkPermissions('User'), (req, res) => {
    const query = 'SELECT * FROM medication_records WHERE is_deleted = 0';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
});

// Medication records endpoint - Inserting a new record
router.post('/', checkPermissions('Owner'), (req, res) => {
    const { name, description, quantity } = req.body;

    // Validate input (you may want to add more robust validation)
    if (!name || !description || !quantity) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Insert the new medication record into the database
    const query = 'INSERT INTO medication_records (name, description, quantity) VALUES (?, ?, ?)';
    db.run(query, [name, description, quantity], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Medication record created successfully.' });
    });
});

// Medication records endpoint - Updating a record
router.put('/:id', checkPermissions('Owner', 'Manager'), (req, res) => {
    const { name, description, quantity } = req.body;
    const id = req.params.id;

    // Validate input (you may want to add more robust validation)
    if (!name || !description || !quantity) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Update the medication record in the database
    const query = 'UPDATE medication_records SET name = ?, description = ?, quantity = ? WHERE id = ?';
    db.run(query, [name, description, quantity, id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Medication record updated successfully.' });
    });
});

// Medication records endpoint - Deleting a record
router.delete('/:id', checkPermissions('Owner'), (req, res) => {
    const id = req.params.id;

    // Delete the medication record from the database
    const query = 'DELETE FROM medication_records WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Medication record deleted successfully.' });
    });
});

// Medication records endpoint - Soft Deleting a record
router.put('/soft-delete/:id', checkPermissions('Owner', 'Manager'), (req, res) => {
    const id = req.params.id;

    // Soft delete the medication record in the database
    const query = 'UPDATE medication_records SET is_deleted = 1 WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Medication record soft deleted successfully.' });
    });
});

module.exports = router;
