var express = require('express');
var searchRepo = require('../repos/searchRepo');
var config = require('../config/config');
var error = require('util');
var router = express.Router();

router.get('/byProduct', (req, res) => {
    
    // vd: http://localhost:3000/search/byProduct/?productName=canon&priceStart=4000000&priceEnd=12000000&catId=3&producerId=1

    var productName = req.query.productName;
    var priceStart=req.query.priceStart;
    var priceEnd=req.query.priceEnd;
    var catId=req.query.catId;
    var producerId=req.query.producerId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = searchRepo.findResult(productName, priceStart, priceEnd, catId, producerId, offset);
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
            page_numbers: numbers,
            isSearch: true
        };
        res.render('search', vm);
    });
});

module.exports = router;