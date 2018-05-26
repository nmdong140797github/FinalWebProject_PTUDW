var mysql = require('mysql');
//mysql info
//mysql://b1c3dea7a9599d:ecf18b83@us-cdbr-iron-east-04.cleardb.net/heroku_7aaf2925f12f4f6?reconnect=true
exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            //port: 8889,
            user: 'root',
            password: '',
            database: 'camera_database'
        });

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'us-cdbr-iron-east-04.cleardb.net',
            //port: 8889,
            user: 'b1c3dea7a9599d',
            password: 'ecf18b83',
            database: 'heroku_7aaf2925f12f4f6'
        });

        cn.connect();

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}