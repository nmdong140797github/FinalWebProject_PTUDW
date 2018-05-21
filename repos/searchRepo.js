var db = require('../fn/db');
var config = require('../config/config');

exports.FindResult = (tim_kiem, offset) => {
    var sql = `select * from may_anh where INSTR(ten_may_anh, '${tim_kiem}')>0 limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByProduct = productName => {
	var sql = `select count(*) as total from may_anh where INSTR(ten_may_anh, '${productName}')>0`;
    return db.load(sql);
}