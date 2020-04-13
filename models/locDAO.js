var mysql = require('./connection').pool;

module.exports.getFarmLocation = function (callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT * from Farm", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}