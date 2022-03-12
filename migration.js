var mysql = require('mysql2');
var migration = require('mysql-migrations');

var config = require('./config/config.json');

var pool = mysql.createPool({
  host     : config.dbHost,
  user     : config.dbUser,
  password : config.dbPassword,
  database : config.dbDatabase,
  multipleStatements: config.dbMultipleStatements,
});

migration.init(pool, __dirname + '/migrations', function() {
    console.log("finished running migrations");
});