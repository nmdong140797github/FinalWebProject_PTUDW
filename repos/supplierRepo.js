var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll=()=>{
    var sql=`select * from nha_cung_cap`;
    return db.load(sql);
}