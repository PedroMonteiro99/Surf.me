var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit:10,
  host: "remotemysql.com",
  user: "hCxihhvl6W",
  password: "kyVByMkUrv",
  database: 'hCxihhvl6W'
});

module.exports.pool = pool;