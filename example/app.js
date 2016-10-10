/**
 * Module dependencies
 */

const path = require('path');
const express = require('express');
const engine = require('../index');

const config = require('./config');

const app = express();

// Use our render engine
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('public path', path.join(__dirname, 'public'));
app.set('public pattern', config.cdnPattern);

app.use(express.static(app.get('public path')));

// process.env.NODE_ENV = 'production';

app.get('/', (req, res) => {
  res.render('home', {
    id: 1
  });
});

app.listen(4000, () => {
  console.log('Server started.');
});
