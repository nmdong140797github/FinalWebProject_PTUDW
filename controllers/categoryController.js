// import { error } from 'util';

var express = require('express');
var categoryRepo = require('../repos/categoryRepo');
var error = require('util');

var router = express.Router();

router.get('/', (req, res) => {
    categoryRepo.loadAll().then(rows => {
        var vm = {
            categories: rows,
            isAdmin: req.session.isAdmin
        };
        res.render('category/index', vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/add', (req, res) => {
    
        res.render('category/add');
    
});

router.post('/add', (req, res) => {
    categoryRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.render('category/add', vm);
    }).catch(error => {
        res.end('fail');
    });
});

router.get('/edit', (req, res) => {
    
        categoryRepo.single(req.query.id).then(c => {
            // console.log(c);
            var vm = {
                Category: c
            };
            res.render('category/edit', vm);
        }).catch(error=>{
            res.end('fail');
        });
    
});

router.post('/edit',(req, res)=>{
    categoryRepo.update(req.body).then(value=>{
        var vm = {
            showAlert: true
        };
        res.render('category/edit', vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/delete', (req, res) => {
    
        var vm = {
            CatId: req.query.id
        }
        res.render('category/delete', vm);
    
});

router.post('/delete', (req, res) => {
    
        categoryRepo.delete(req.body.CatId).then(value => {
            res.redirect('/category');
        }).catch(error=>{
            res.end('fail');
        });
    
});

module.exports = router;