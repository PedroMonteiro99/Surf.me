var mysql = require('./connection').pool;

module.exports.getIdUser = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT idUsers from User where Username=?", [obj.Username], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "User doesn't exist" }, null);
            }
        })
    })
}