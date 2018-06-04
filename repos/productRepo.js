var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from may_anh';
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from may_anh where ma_may_anh = ${proId}`;
    return db.load(sql);
}

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

exports.add=(c)=>{
    var sql= `INSERT INTO 'may_anh' ('ma_may_anh', 'ten_may_anh', 'gia', 'duong_dan') VALUES (${c.id}, '${c.name}', ${c.price}, ${c.path})`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM 'may_anh' WHERE 'may_anh'.'ma_may_anh' = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE 'may_anh' SET 'ten_may_anh' = '${c.name}' 'gia' = ${c.price} 'duong_dan'=${c.path} 'ma_ncc'=${c.id_ncc} 'so_luong'=${c.number} WHERE 'may_anh'.'ma_may_anh' = ${c.id}`;
    return db.save(sql);
}