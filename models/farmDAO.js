var mysql = require('./connection').pool;

module.exports.getCurrentData = function (id, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT Farm_idFarm,Humidity,Temperature,Name,idCulture from Farm_has_Culture,Culture where Culture_idCulture = idCulture and Farm_User_idUsers=?", id, function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Farm not found!" }, null);
            }
        })
    })
}

module.exports.updateFarm = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("UPDATE Farm_has_Culture SET Temperature = ?, Humidity = ? WHERE Farm_idFarm = ?", [obj.Temperature,obj.Humidity,obj.id], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Error on update!" }, null);
            }
        })
    })
}

module.exports.getRestrictions = function (id, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("Select Max_Value,Min_Value,Type from Sensor_has_Culture,Sensor where idSensor=Sensor_idSensor and Culture_idCulture=?", id, function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Farm not found!" }, null);
            }
        })
    })
}


