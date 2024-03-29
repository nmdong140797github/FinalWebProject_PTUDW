var express = require('express');

var router = express.Router();
var receiptRepo = require('../repos/receiptRepo');
var productRepo = require('../repos/productRepo');
var customerRepo = require('../repos/customerRepo');

var state = {
    cameras: [],
    ma_ddh: '',
    total: 0
}

var router = express.Router();
router.get('/', (req, res) => {
    var arr_p = []; //san pham
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.ProId);
        arr_p.push(p);
    }

    var items = [];
    var total = 0;
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.gia * req.session.cart[i].Quantity
            };
            total = total + item.Amount;
            items.push(item);
        }

        state.cameras = items;
        state.total = total;
        var vm = {
            items: items,
            total: total,
            curUser: req.session.user,
            isChecked: false
        };
        console.log('username', req.session.user);
        res.render('receipt/index', vm);
    });
});

router.post('/add', (req, res) => {

    var receipt = {
        ma_nd: req.session.user.ma_nd,
        ngay_lap: (new Date()).toISOString().substring(0, 10),
        trang_thai_don_hang: 0,
        tong_tien: state.total,
        sample: state.cameras[0].Product.ten_may_anh,
        so_luong_hang: state.cameras.length,
    };

    receiptRepo.addReceipt(receipt).then(res => {
        console.log('maddh', res.insertId);
        var cameras = state.cameras;
        cameras.forEach(camera => {
            console.log('camera', camera);
            receiptRepo.addCTReceipt(camera, res.insertId);
        });
    }).then(val => {
        //clear current cart and receipt data
        req.session.cart = [];
        state.cameras = [];
        var vm = {
            isChecked: true,
            items: []
        }
        res.render('receipt/index', vm);
        // res.redirect('/receipt');
        console.log('dat hang thanh cong');
    });
});

router.get('/personal', (req, res) => {

    // console.log(req.session.user.ma_nd);
    receiptRepo.getPersonalReceipt(req.session.user.ma_nd).then(result => {
        var receipts = [];
        // console.log('results', result);
        if (result) {
            for (var i = result.length - 1; i >= 0; i--) {
                var receipt = {
                    ma_ddh: result[i].ma_ddh,
                    ngay_lap: result[i].ngay_lap.toISOString().substring(0, 10),
                    sample: result[i].sample,
                    tong_tien: result[i].tong_tien,
                    so_luong_hang: result[i].so_luong_hang - 1,
                    showMore: result[i].so_luong_hang > 1 ? true : false,
                    trang_thai_don_hang: result[i].trang_thai_don_hang == 0 ? 'Đang giao hàng' : (result[i].trang_thai_don_hang == 2 ? 'Đã huỷ' : 'Giao hàng thành công')
                }
                receipts.push(receipt);
            }

            console.log('receipts', receipts);
        }
        var vm = {
            receipts: receipts,
            isLogged: req.session.isLogged,
            length: receipts.length > 0 ? true : false
        };
        res.render('receipt/personal', vm);
    });
});

router.get('/detail/:receiptId', (req, res) => {
    var receiptId = req.params.receiptId;
    console.log(receiptId);
    receiptRepo.getUserId(receiptId).then(result => {
        console.log(result);
        customerRepo.single(result[0].ma_nd).then(user => {
            receiptRepo.single(receiptId).then(rows => {
                if (rows.length > 0) {
                    var arr_p = []; //san pham
                    for (var i = 0; i < rows.length; i++) {
                        var cartItem = rows[i];
                        var p = productRepo.single(cartItem.ma_may_anh);
                        arr_p.push(p);
                    }
    
                    var items = [];
                    var total = 0;
                    Promise.all(arr_p).then(result => {
                        for (var i = result.length - 1; i >= 0; i--) {
                            var pro = result[i][0];
                            var item = {
                                Product: pro,
                                Quantity: rows[i].so_luong_ban,
                                Amount: rows[i].gia,
                            };
                            total = total + item.Amount;
                            items.push(item);
                        }
    
                        state.cameras = items;
                        state.total = total;
                        var vm = {
                            items: items,
                            total: total,
                            curUser: user[0],
                            isChecked: false,
                        };
                        res.render('receipt/detail', vm);
                    });
                } else {
                    res.redirect('/');
                }
            });
        });
    });
});

router.get('/admin', (req, res) => {
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
            length: receipts && receipts.length > 0 ? true : false
        };
        res.render('receipt/personal', vm);
    });
});

router.post('/update', (req, res) => {
    receiptRepo.updateReceipt(req.body.maddh, req.body.trang_thai);
    res.redirect('./admin');
});

module.exports = router;