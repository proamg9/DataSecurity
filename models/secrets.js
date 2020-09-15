const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('secrets', secretSchema);
