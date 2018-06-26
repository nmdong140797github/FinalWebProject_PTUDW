var express = require('express');
var cartRepo = require('../repos/cartRepo'),
    productRepo = require('../repos/productRepo'),
    categoryRepo=require('../repos/categoryRepo'),
    producerRepo = require('../repos/producerRepo');
var router = express.Router();



router.get('/', (req, res) => {
    var p1=productRepo.countProduct();
    var p2=producerRepo.countProducer();
    var p3=categoryRepo.countCategory();

    Promise.all([p1, p2, p3]).then(([countProduct,countProducer,countCategory]) => {

        res.locals.layoutVM={
            ...res.locals.layoutVM,
            isLogged: true,
            isSearch: false,
            showNavBar: false,
            showSideBar: false,
            isAdmin: req.session.isAdmin,
            numberCat: countCategory[0].total,
            numberProduct: countProduct[0].total,
            numberProducer: countProducer[0].total
        };
        res.render('admin/admin_dashboard');
    });

});

module.exports = router;