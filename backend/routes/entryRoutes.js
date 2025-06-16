const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// POST - Add new entry
router.post('/add', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        res.status(201).json({ message: 'Entry added successfully', data: newEntry });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET - Fetch all entries
router.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
