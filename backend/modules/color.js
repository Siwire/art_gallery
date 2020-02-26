const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    name: { type: String }
});

const Color = mongoose.model('Color', ColorSchema);

module.exports = Color;