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
    var sql= `INSERT INTO 'nha_cung_cap' ('ma_ncc', 'ten_ncc', 'dia_chi', 'sdt') VALUES (${c.id}, '${c.name}', '${c.address}', ${c.telephone})`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM 'nha_cung_cap' WHERE 'nha_cung_cap'.'ma_ncc' = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE 'nha_cung_cap' SET 'ten_ncc' = '${c.name}' 'dia_chi' = '${c.address}' 'sdt'=${c.telephone} WHERE 'nha_cung_cap'.'ma_ncc' = ${c.id}`;
    return db.save(sql);
}