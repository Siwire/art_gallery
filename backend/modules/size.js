const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
    name: { type: String }
  });
  
const Size = mongoose.model('Size', SizeSchema);

module.exports = Size;
