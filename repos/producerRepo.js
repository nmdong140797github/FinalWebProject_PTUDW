var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from nha_cung_cap';
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from nha_cung_cap where ma_ncc = ${proId}`;
    return db.load(sql);
}

exports.add=(c)=>{
    var sql= `INSERT INTO 'nha_cung_cap' ( 'ten_ncc', 'dia_chi', 'sdt') VALUES ('${c.ProducerName}', '${c.ProducerAddress}', ${c.ProducerTelephone})`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM 'nha_cung_cap' WHERE 'nha_cung_cap'.'ma_ncc' = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE 'nha_cung_cap' SET 'ten_ncc' = '${c.ProducerName}' 'dia_chi' = '${c.ProducerAddress}' 'sdt'=${c.ProducerTelephone} WHERE 'nha_cung_cap'.'ma_ncc' = ${c.id}`;
    return db.save(sql);
}

exports.loadAllByCat=(catId, offset)=>{
    var sql = `SELECT * FROM loai_may_anh,may_anh where loai_may_anh.ma_loai= ${catId} and loai_may_anh.ma_may_anh=may_anh.ma_may_anh limit ${config.PRODUCTS_PER_PAGE} offset ${offset};`
    return db.load(sql);
}

exports.countByCat=(catId)=>{
    var sql = `SELECT count(*) as total FROM loai_may_anh,may_anh where loai_may_anh.ma_loai=${catId} and loai_may_anh.ma_may_anh=may_anh.ma_may_anh `
}