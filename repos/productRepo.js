var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from may_anh';
    return db.load(sql);
}

// exports.loadAllByCat = (catId) => {
//     var sql = `select * from products where CatID = ${catId}`;
//     return db.load(sql);
// }

exports.loadAllByCat = (catId, offset) => {
    var sql = `select * from may_anh where ma_may_anh in (SELECT ma_may_anh from loai_may_anh WHERE ma_loai=${catId} )  limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from loai_may_anh where ma_loai = ${catId}`;
    return db.load(sql);
}