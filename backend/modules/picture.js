const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    title: { type: String },
    route: { type: String },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size' },
    style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style' },
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
  });

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;