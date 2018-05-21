var db = require('../fn/db');

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from khach_hang where ma_kh = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into khach_hang(ma_kh,ten_kh,ngay_sinh,dia_chi,sdt) values('${c.inputId}','${c.inputName}','${c.inputDate}','${c.inputAddress}','${c.inputTelephone}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from khach_hang where ma_kh = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update khach_hang set ten_kh = '${c.inputName}', ngay_sinh='${c.inputDate}', dia_chi='${c.inputAddress}', sdt='${c.inputTelephone}' where ma_kh = ${c.inputId}`;
    return db.save(sql);
}
