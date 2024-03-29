var db = require('../fn/db');

exports.single = (id) => {
    // return new Promise((resolve, reject) => {
    //     var sql = `select * from nguoi_dung where ma_nd = ${id}`;
    //     db.load(sql).then(rows => {
    //         if (rows.length === 0) {
    //             resolve(null);
    //         } else {
    //             resolve(rows[0]);
    //         }
    //     }).catch(err => {
    //         reject(err);
    //     });
    // });
    var sql = `select * from nguoi_dung where ma_nd = ${id}`;
    return db.load(sql);
}

exports.add = (c) => {
    var sql = `insert into nguoi_dung(ten_nd,email,password,ngay_sinh,dia_chi,sdt,permission) values('${c.name}','${c.email}','${c.password}','${c.dob}','${c.addr}','${c.telephone}','${c.permission}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from nguoi_dung where ma_nd = ${id}`;
    return db.save(sql);
}

exports.updateInformationPersonal = (c) => {
    var sql = `update nguoi_dung set ten_nd = '${c.name}', ngay_sinh='${c.dob}', dia_chi='${c.addr}',  sdt='${c.telephone}' where ma_nd = ${c.id}`;
    return db.save(sql);
}

exports.updateAccount = (c) => {
    var sql = `update nguoi_dung set password='${c.password}', permission='${c.permission}' where ma_nd = ${c.inputId}`;
    return db.save(sql);
}

exports.email = (email) => {
    var sql = `select * from nguoi_dung where email = '${email}'`;
    return db.load(sql);
}

exports.login = user => {
    var sql = `select * from nguoi_dung where email = '${user.email}' and password = '${user.password}'`;
    return db.load(sql);
}

exports.requestSession=session_id=>{
    var sql = `select * from sessions where session_id='${session_id}'`;
    return db.load(sql);
}