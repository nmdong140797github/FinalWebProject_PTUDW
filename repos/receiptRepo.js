var db = require('../fn/db');

exports.single = (id) => {
    // console.log('load single', id);
    return new Promise((resolve, reject) => {
        var sql = `select * from ct_don_dat_hang where ma_ddh = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getUserId=(ma_ddh)=>{
    var sql = `select * from don_dat_hang where ma_ddh = ${ma_ddh}`;
    return db.load(sql);
}

exports.updateReceipt = (ma_ddh, trang_thai_don_hang) => {
    var sql = `update don_dat_hang set trang_thai_don_hang=${trang_thai_don_hang} where ma_ddh =${ma_ddh}`;
    return db.save(sql);
}


exports.countReceipt=()=>{
    var sql = `select count(*) as total from don_dat_hang `;
    return db.load(sql);
}

exports.addReceipt = (receipt) => {
    console.log('receipt', receipt);
    var sql = `insert into don_dat_hang(ma_nd,ngay_lap,trang_thai_don_hang, tong_tien, sample, so_luong_hang) values(${receipt.ma_nd},'${receipt.ngay_lap}',${receipt.trang_thai_don_hang},${receipt.tong_tien},'${receipt.sample}',${receipt.so_luong_hang})`;
    return db.save(sql);
}
exports.addCTReceipt = (camera, ma_ddh) => {
    console.log(camera.Product.ma_may_anh);
    var sql = `insert into ct_don_dat_hang(ma_ddh,ma_may_anh,so_luong_ban,gia) values(${ma_ddh},${camera.Product.ma_may_anh},${camera.Quantity}, ${camera.Amount})`;
    return db.save(sql);
}

exports.getPersonalReceipt = (ma_nd) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from don_dat_hang where ma_nd = ${ma_nd}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows);
            }
        }).catch(err => {
            reject(err);
        });
    });
}
exports.getAllReceipt = () => {
    return new Promise((resolve, reject) => {
        var sql = `select * from don_dat_hang`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.delete = (id) => {
    var sql = `delete from don_dat_hang where ma_ddh = ${id}`;
    return db.save(sql);
}