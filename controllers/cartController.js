var express = require('express');
var cartRepo = require('../repos/cartRepo'),
    productRepo = require('../repos/productRepo');

var router = express.Router();
router.get('/', (req, res) => {
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.ProId);
        arr_p.push(p);
    }

    var items = [];
    var total=0;
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.gia * req.session.cart[i].Quantity
            };
            total=total+item.Amount;
            items.push(item);
        }

        var vm = {
            items: items,
            total: total,
        };
        res.render('cart/index', vm);
    });
});

router.post('/add', (req, res) => {
    var item = {
        ProId: req.body.proId,
        Quantity: +req.body.quantity
    };
    if(item.Quantity>0){
        cartRepo.add(req.session.cart, item);
    }
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartRepo.remove(req.session.cart, req.body.ma_may_anh);
    res.redirect(req.headers.referer);
});

router.post('/update', (req, res) => {
    if(req.body.quantity>0)
    {
        cartRepo.update(req.session.cart, req.body.proId,req.body.quantity);
        console.log("update thanh cong");
        console.log(req.body.quantity);
    }
    res.redirect(req.headers.referer);
});

module.exports = router;