var mysql = require('./connection').pool;

module.exports.getFarmLocation = function (callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            if (conn) conn.release();

            callback(err, { code: 500, status: "Error in the connection to the database" })
            return;
        }
        conn.query("SELECT Latitude,Longitude,User_idUsers,Name,Username,idFarm FROM Farm,User,Culture,Farm_has_Culture WHERE idCulture = Culture_idCulture and Farm_idFarm = idFarm and User_idUsers = idUsers and User_idUsers = Farm_User_idUsers",

            function (err, result) {
                conn.release();
                console.log(result)
                callback(false, { code: 200, status: "ok", data: result })
            })
    })
}
