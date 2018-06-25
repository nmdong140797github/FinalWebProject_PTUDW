var express = require('express');

var router = express.Router();
var receiptRepo = require('../repos/receiptRepo');
var productRepo = require('../repos/productRepo');


var state = {
    cameras: [],
    ma_ddh: ''
}

var router = express.Router();
router.get('/', (req, res) => {
    var arr_p = []; //san pham
    var producers = []; //nha cc
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.ProId);
        arr_p.push(p);
        producers.push(p.ma_ncc);
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
        var vm = {
            items: items,
            total: total,
            curUser: req.session.user,
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
        };
        
        receiptRepo.addReceipt(receipt).then(res => {
            console.log('maddh', res.insertId);
            
            var cameras = state.cameras;
            cameras.forEach(camera => {
                receiptRepo.addCTReceipt(camera, res.insertId);
            });


            // res.render('home',err);
            console.log('dat hang thanh cong');
        });
});


module.exports = router;