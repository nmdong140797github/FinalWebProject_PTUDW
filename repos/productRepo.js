var db = require('../fn/db');
var config = require('../config/config');

exports.DanhSachSanPhamBanChay=(soLuong)=>{
    var sql = `select * from may_anh order by so_luong_ban desc limit ${soLuong}`;
    return db.load(sql);
}
exports.DanhSachSanPhamDuocXemNhieuNhat=(soLuong)=>{
    var sql = `select * from may_anh order by so_luong_xem desc limit ${soLuong}`;
    return db.load(sql);
}
exports.DanhSachSanPhamMoiNhat1=(soLuong)=>{
    var sql = `select * from may_anh order by ngay_nhap desc limit ${soLuong}`;
    return db.load(sql);
}
exports.DanhSachSanPhamMoiNhat2=(soLuong)=>{
    var sql = `select * from may_anh order by ngay_nhap desc limit 4,${soLuong}`;
    return db.load(sql);
}
exports.DanhSachSanPhamMoiNhat3=(soLuong)=>{
    var sql = `select * from may_anh order by ngay_nhap desc limit 8,${soLuong}`;
    return db.load(sql);
}
exports.DanhSachSanPhamCungLoai=(proId, soLuong)=>{
    var sql = `select * from may_anh ma_loai=${proId} limit ${soLuong}`;
    return db.load(sql);
}
exports.loadSanPhamTheoYeuCau = (soLuong) => {
    var sql = `select * from may_anh limit ${soLuong}`;
    return db.load(sql);
}
exports.loadAll = (offset) => {
    var sql = `select * from may_anh limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countAll=()=>{
    var sql = `select count(*) as total from may_anh `;
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from may_anh where ma_may_anh = ${proId}`;
    return db.load(sql);
}

exports.loadAllByCat = (catId, offset) => {
    var sql = `select * from may_anh where ma_loai =${catId}  limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.loadAllByProducer = (producerId, offset) => {
    var sql = `select * from may_anh where ma_nsx=${producerId}  limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.loadAllCategories = (proId)=>{
    // Load tất các mã loại của một máy ảnh
    var sql =  ``
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from may_anh where ma_loai = ${catId}`;
    return db.load(sql);
}

exports.countByProducer = producerId => {
	var sql = `select count(*) as total from may_anh where ma_nsx = ${producerId}`;
    return db.load(sql);
}

exports.add=(c)=>{
    var sql= `INSERT INTO may_anh (ten_may_anh, gia, duong_dan, ma_loai, ma_ncc, ma_nsx, so_luong, ngay_nhap, mo_ta, xuat_xu) VALUES ('${c.ProductName}', ${c.ProductPrice}, '${c.ProductLink}', ${c.ProductCat}, ${c.ProductSupplier}, ${c.ProductProducer}, ${c.ProductNumber}, '${c.ProductDate}', '${c.ProductDescribe}', '${c.ProductOrigin}')`;
    return db.save(sql);
}

exports.delete= (id)=>{
    var sql = `DELETE FROM may_anh WHERE ma_may_anh = ${id}  `;
    return db.save(sql);
}

exports.update =  (c) =>{
    var sql=`UPDATE may_anh SET ten_may_anh = '${c.ProductName}', gia = ${c.ProductPrice}, duong_dan='${c.ProductLink}', ma_loai=${c.ProductCat},  ma_ncc=${c.ProductSupplier}, ma_nsx=${c.ProductProducer}, so_luong=${c.ProductNumber}, ngay_nhap='${c.ProductDate}', mo_ta='${c.ProductDescribe}', xuat_xu='${c.ProductOrigin}' WHERE ma_may_anh = ${c.ProductId}`;
    return db.save(sql);
}