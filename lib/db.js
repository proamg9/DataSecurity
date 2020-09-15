const mongoose = require('mongoose');

const config = require('../config/config.json');
const dotenv = require('dotenv');

dotenv.config();

/**
 * MongoDB connection
 */
function connect() {
  mongoose.connect(process.env.MONGOLAB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

function close() {
  mongoose.connection.close();
}

module.exports = { connect, close };
