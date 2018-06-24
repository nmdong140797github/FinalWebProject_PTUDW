var express = require('express');
var categoryRepo = require('../repos/categoryRepo');
var productRepo = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {
    var p1 = productRepo.DanhSachSanPhamBanChay(6);
    var p2 = productRepo.DanhSachSanPhamDuocXemNhieuNhat(6);
    var p3 = productRepo.DanhSachSanPhamMoiNhat1(4);
    var p4 = productRepo.DanhSachSanPhamMoiNhat2(4);
    Promise.all([p1,p2,p3,p4]).then(([row1,row2,row3,row4])=>{
        var home_vm={
            itemsBanChay:row1,
            itemsXemNhieu:row2,
            itemsMoi1:row3,
            itemsMoi2:row4
        }
        res.render('home/index',home_vm);
    });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

module.exports = router;