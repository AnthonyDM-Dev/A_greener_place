// Importing libraries
var express = require('express');

// Moving routes to routes.js.
app.use('/', function(req, res) {
    res.end('ciao peppe');
});

// Run the server
const listener = app.listen(ports, () => {
    console.log('Your app is listening on port ' + listener.address().port);
})