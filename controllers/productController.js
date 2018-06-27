// import { error } from 'util';

var express = require('express');
var productRepo = require('../repos/productRepo'),
    producerRepo = require('../repos/producerRepo'),
    categoryRepo = require('../repos/categoryRepo'),
    supplierRepo = require('../repos/supplierRepo');
var config = require('../config/config');
var error = require('util');
var router = express.Router();


router.get('/add', (req, res) => {
    var p1=categoryRepo.loadAll();
    var p2=producerRepo.loadAll();
    var p3=supplierRepo.loadAll();
    Promise.all([p1,p2,p3]).then(([rows1,rows2,rows3])=>{
        var vm={
            category: rows1,
            producer: rows2,
            supplier: rows3
        }
        res.render('product/add',vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.post('/add', (req, res) => {
    productRepo.add(req.body).then(value =>{
        // thông báo đã thêm thành công
        var vm = {
            showAlert: true 
        };
        res.render('product/add',vm);
    }).catch(error=>{
        res.end('fail');
    });

});

function convert2FormatYYYYmmdd(date)
{
    var chuoi='';
    chuoi+=date.getFullYear()+'-';
    chuoi+=parseInt(date.getMonth())+1>9 ? (parseInt(date.getMonth())+1) : '0'+(parseInt(date.getMonth())+1);
    chuoi+='-';
    chuoi+=parseInt(date.getDate())>9 ? (parseInt(date.getDate())) : '0'+(parseInt(date.getDate()));
    return chuoi;
}

router.get('/edit', (req, res) => {

    var p1=categoryRepo.loadAll();
    var p2=producerRepo.loadAll();
    var p3=supplierRepo.loadAll();
    var p4=productRepo.single(req.query.id);

    Promise.all([p1,p2,p3,p4]).then(([rows1,rows2,rows3,rows4])=>{
        var vm={
            category: rows1,
            producer: rows2,
            supplier: rows3,
            product: rows4[0]
        }
        vm.product.ngay_nhap=convert2FormatYYYYmmdd(vm.product.ngay_nhap);
        res.render('product/edit',vm);
    }).catch(error=>{
        res.end('fail');
    });
    
});

router.post('/edit', (req, res) => {    
    productRepo.update(req.body).then(value=>{
        var vm = {
            showAlert: true 
        };
        res.render('product/edit',vm);
    }).catch(error=>{
        res.end('fail');
    });

});

router.get('/delete', (req, res) => {
    productRepo.single(req.query.id).then(value=>{
        var product=value;
        res.render('product/delete',product);
    }).catch(error=>{
        res.end('fail');
    });
    
});

router.post('/delete',(req,res)=>{
    productRepo.delete(req.body.ProductId).then(value =>{
        // thông báo đã xóa thành công
        var vm = {
            showAlert: true 
        };
        res.render('product/delete',vm);
    }).catch(error=>{
        res.end('fail');
    });

});

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllByCat(catId, offset);
    var p2 = productRepo.countByCat(catId);
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
        res.render('product/byCat', vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/byProducer/:producerId', (req, res) => {
    var producerId = req.params.producerId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllByProducer(producerId, offset);
    var p2 = productRepo.countByProducer(producerId);
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
        res.render('product/byProducer', vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    productRepo.single(proId).then(rows => {
        if (rows.length > 0) {
            var vm = {
                product: rows[0],
                noProduct: rows.length === 0
            }
            res.render('product/detail', vm);
        } else {
            res.redirect('/');
        }
    }).catch(error=>{
        res.end('fail');
    });
});


module.exports = router;