const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./lib/db');
const app = express();


app.use(express.json());
db.connect();
// CORS Middleware

app.use(cors());

// Logger Middleware
app.use(morgan('dev'));

require('./routes')(app);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome........',
}));


module.exports = app;
