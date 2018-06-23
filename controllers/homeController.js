var express = require('express');
var productRepo = require('../repos/productRepo');
var config = require('../config/config');
var router = express.Router();

router.get('/', (req, res) => {
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAll(offset);
    var p2 = productRepo.countProduct();
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
      

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
    res.render('home/index');
    });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

module.exports = router;