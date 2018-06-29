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



module.exports = router;