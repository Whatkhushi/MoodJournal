const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    date: { type: String, required: true },
    mood: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Entry', EntrySchema);
