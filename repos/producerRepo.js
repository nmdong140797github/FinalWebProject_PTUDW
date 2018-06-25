var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from nha_san_xuat';
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from nha_san_xuat where ma_ncc = ${proId}`;
    return db.load(sql);
}

exports.add=(c)=>{
    var sql= `INSERT INTO 'nha_san_xuat' ( 'ten_ncc', 'dia_chi', 'sdt') VALUES ('${c.ProducerName}', '${c.ProducerAddress}', ${c.ProducerTelephone})`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM 'nha_san_xuat' WHERE 'nha_san_xuat'.'ma_ncc' = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE 'nha_san_xuat' SET 'ten_ncc' = '${c.ProducerName}' 'dia_chi' = '${c.ProducerAddress}' 'sdt'=${c.ProducerTelephone} WHERE 'nha_san_xuat'.'ma_ncc' = ${c.id}`;
    return db.save(sql);
}
