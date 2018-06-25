var mysql = require('mysql')
  , async = require('async');

var PRODUCTION_DB = 'heroku_7aaf2925f12f4f6'
  , TEST_DB = 'heroku_7aaf2925f12f4f6'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b1c3dea7a9599d',
    password: 'ecf18b83',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}

exports.load = sql => {
    return new Promise((resolve, reject) => {
        state.pool.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
            console.log('end connection database');
        });
    });
}

exports.save = sql => {
    console.log(sql);
    return new Promise((resolve, reject) => {
        state.pool.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                console.log('\ngood', value);
                resolve(value);
            }

            // cn.end();
        });
    });
}