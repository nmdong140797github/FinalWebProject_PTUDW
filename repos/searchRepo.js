var db = require('../fn/db');
var config = require('../config/config');

exports.findResult = (tim_kiem,gia_bat_dau,gia_ket_thuc,loai, nha_cung_cap, offset) => {
    // select * from heroku_7aaf2925f12f4f6.may_anh where INSTR(ten_may_anh, 'canon')>0 
    // and gia>5000000 and gia<12000000 and 
    // ma_may_anh in (select ma_may_anh from heroku_7aaf2925f12f4f6.loai_may_anh where ma_loai=1 ) limit 6 offset 0	

    var sql = `select * from may_anh where  `;


    if(tim_kiem)
    {
        sql+= `INSTR(${ten_may_anh}, 'canon')>0`;
    }

    if(gia_bat_dau && gia_ket_thuc)
    {
        sql+= `and gia>${gia_bat_dau} and gia<${gia_ket_thuc}`;
    }

    if(loai)
    {
        sql+=`and ma_may_anh in (select ma_may_anh from loai_may_anh where ma_loai=${loai} )`;
    }

    if(nha_cung_cap)
    {
        sql+= `and ma_ncc=${nha_cung_cap}`;
    }

    sql += `limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByProduct = productName => {
	var sql = `select count(*) as total from may_anh where INSTR(ten_may_anh, '${productName}')>0`;
    return db.load(sql);
}