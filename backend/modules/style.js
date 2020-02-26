const mongoose = require('mongoose');

const StyleSchema = new mongoose.Schema({
    name: { type: String }
  });
  
const Style = mongoose.model('Style', StyleSchema);

module.exports = Style;