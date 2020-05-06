var mysql = require('./connection').pool;

module.exports.getFarmLocation = function (callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            if (conn) conn.release();

            callback(err, { code: 500, status: "Error in the connection to the database" })
            return;
        }
        conn.query("Select Longitude,Latitude,idFarm,User_idUsers from Farm",

            function (err, result) {
                conn.release();
                console.log(result)
                callback(false, { code: 200, status: "ok", data: result })
            })
    })
}
