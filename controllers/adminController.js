var express = require('express');
var cartRepo = require('../repos/cartRepo'),
    productRepo = require('../repos/productRepo'),
    categoryRepo = require('../repos/categoryRepo'),
    producerRepo = require('../repos/producerRepo'),
    receiptRepo = require('../repos/receiptRepo');
var router = express.Router();

var state = {
    numberCat: 0,
    numberProduct: 0,
    numberProducer: 0,
    numberReceipt: 0
}

router.get('/', (req, res) => {
    var p1 = productRepo.countAll();
    var p2 = producerRepo.countProducer();
    var p3 = categoryRepo.countCategory();
    var p4 = receiptRepo.countReceipt();

    Promise.all([p1, p2, p3, p4]).then(([countAll, countProducer, countCategory, countReceipt]) => {

        res.locals.layoutVM = {
            ...res.locals.layoutVM,
            isLogged: true,
            isSearch: false,
            showNavBar: false,
            showSideBar: false,
            isAdmin: req.session.isAdmin,
            numberCat: countCategory[0].total,
            numberProduct: countAll[0].total,
            numberProducer: countProducer[0].total,
            numberReceipt: countReceipt[0].total
        };
        state.numberCat = countCategory[0].total;
        state.numberProduct = countAll[0].total;
        state.numberProducer = countProducer[0].total;
        state.numberReceipt = countReceipt[0].total;
        res.render('admin/admin_dashboard');
    });
});

router.get('/receipt', (req, res) => {
    receiptRepo.getAllReceipt().then(result => {
        var receipts = [];
        // console.log('results', result);
        for (var i = result.length - 1; i >= 0; i--) {
            var receipt = {
                ma_ddh: result[i].ma_ddh,
                ngay_lap: result[i].ngay_lap.toISOString().substring(0, 10),
                sample: result[i].sample,
                tong_tien: result[i].tong_tien,
                so_luong_hang: result[i].so_luong_hang - 1,
                showMore: result[i].so_luong_hang > 1 ? true : false,
                trang_thai_don_hang: result[i].trang_thai_don_hang == 0 ? 'Đang giao hàng' : (result[i].trang_thai_don_hang == 2 ? 'Đã huỷ' : 'Giao hàng thành công'),
                statusRow: result[i].trang_thai_don_hang == 0 ? 'warning' : (result[i].trang_thai_don_hang == 2 ? 'error' : 'success'),
            }
            receipts.push(receipt);
        }

        console.log('receipts', receipts);
        var vm = {
            receipts: receipts,
            isLogged: req.session.isLogged,
            isAdmin: req.session.isAdmin,
            length: receipts && receipts.length > 0 ? true : false,
            isAdminDashboard: true
        };
        res.locals.layoutVM = {
            ...res.locals.layoutVM,
            isLogged: true,
            isSearch: false,
            showNavBar: false,
            showSideBar: false,
            isAdmin: req.session.isAdmin,
            numberCat: state.numberCat,
            numberProduct: state.numberProduct,
            numberProducer: state.numberProducer,
            numberReceipt: state.numberReceipt
        };
        console.log(res.locals.layoutVM.countProducer);
        res.render('receipt/personal', vm);
    });
});



module.exports = router;