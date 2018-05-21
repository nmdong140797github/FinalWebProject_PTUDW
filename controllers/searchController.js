var express = require('express');
var searchRepo = require('../repos/searchRepo');
var config = require('../config/config');

var router = express.Router();


router.get('/byProduct/:productName', (req, res) => {
    
    // vd: http://localhost:3000/search/byProduct/canon?page=1

    var productName = req.params.productName;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = searchRepo.FindResult(productName, offset);
    var p2 = searchRepo.countByProduct(productName);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        // console.log(pRows);
        // console.log(countRows);

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
        res.render('search', vm);
    });
});

module.exports = router;