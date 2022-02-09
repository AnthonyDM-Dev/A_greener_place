// Importing libraries
var express = require('express');
var fs = require('fs');
var sass = require('sass');

// Importing routes & error handling
var routes = require('./routes/routes');
var errorControllers = require('./controllers/errorControllers');

// Initialize express
var app = express();
var ports = process.env.PORT || 3000;

// Server header settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Template engine used: .ejs
app.set('view engine', 'ejs');

// Sass generating
var scssFileName = './assets/styles.scss';
var result = sass.compile(scssFileName);
fs.writeFileSync('./assets/styles.css', result.css);

// Mapping static & assets files directory
app.use('/assets', express.static('assets'))
app.use('/static', express.static('static'))

// Moving routes to routes.js.
app.use('/', routes);

// Error controllers.
app.use(errorControllers.get404);
app.use(errorControllers.get500);

// Run the server
const listener = app.listen(ports, () => {
    console.log('Your app is listening on port ' + listener.address().port);
})