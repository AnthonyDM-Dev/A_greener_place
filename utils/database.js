var mysql      = require('mysql2');
var config = require('../config/config.json');

var pool = mysql.createPool({
  host     : config.dbHost,
  user     : config.dbUser,
  password : config.dbPassword,
  database : config.dbDatabase,
  multipleStatements: config.dbMultipleStatements,
});

module.exports = pool.promise();