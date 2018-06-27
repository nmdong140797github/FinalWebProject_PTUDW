var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from nha_san_xuat';
    return db.load(sql);
}

exports.countProducer=()=>{
    var sql = `select count(*) as total from nha_san_xuat `;
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from nha_san_xuat where ma_nsx = ${proId}`;
    return db.load(sql);
}

exports.add=(c)=>{
    var sql= `INSERT INTO nha_san_xuat ( ten_nsx) VALUES ('${c.ProducerName}')`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM nha_san_xuat WHERE ma_nsx = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE nha_san_xuat SET ten_nsx = '${c.ProducerName}'  WHERE ma_nsx = ${c.ProducerId}`;
    return db.save(sql);
}
