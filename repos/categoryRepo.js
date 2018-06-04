var db = require('../fn/db');

exports.loadAll = () => {
    var sql = 'select * from loai';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from loai where ma_loai = ${id}`;
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
    var sql = `insert into loai(ten_loai) values('${c.CatName}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from loai where ma_loai = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update loai set ten_loai = '${c.CatName}' where ma_loai = ${c.CatId}`;
    return db.save(sql);
}
