var mysql = require('./connection').pool;

module.exports.login = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("Select Username,Password from User where Username=? and Password=?", [obj.Username, obj.Password], function (err, rows) {
            console.log(rows);
            console.log(obj);
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "User or password incorrects" }, null);
            }
        })
    })
}

module.exports.register = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO User(Username, Email,Password) VALUES (?,?,?)', [obj.Username, obj.Email, obj.Password], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" },rows);
            }
            else {
                callback({ code: 401, status: "User or password incorrects" }, null);
            }
        })
    })
}

module.exports.getCultures = function (callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT Name FROM Culture", function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback(rows, { code: 200, status: "Ok" });
            }
            else {
                callback({ code: 401, status: "Cultures not found!" }, null);
            }
        })
    })
}

module.exports.getLast = function (callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT idFarm FROM Farm ORDER BY idFarm DESC LIMIT 1", function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback(rows);
            }
            else {
                callback({ code: 401, status: "Farm not found!" }, null);
            }
        })
    })
}