// import { error } from 'util';

var express = require('express');
var categoryRepo = require('../repos/categoryRepo');
var error = require('util');

var router = express.Router();

router.get('/', (req, res) => {
    categoryRepo.loadAll().then(rows => {
        var vm = {
            categories: rows
        };
        res.render('category/index', vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/add', (req, res) => {
    if(req.session.isAdmin==true)
    {
        res.render('category/add');
    }else{
        res.render('error/index');
    }
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
    if(req.session.isAdmin==true)
    {
        categoryRepo.single(req.query.id).then(c => {
            // console.log(c);
            var vm = {
                Category: c
            };
            res.render('category/edit', vm);
        }).catch(error=>{
            res.end('fail');
        });
    }else{
        res.render('error/index');
    }
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
    if(req.session.isAdmin==true)
    {
        var vm = {
            CatId: req.query.id
        }
        res.render('category/delete', vm);
    }else{
        res.render('error/index');
    }
});

router.post('/delete', (req, res) => {
    if(req.session.isAdmin==true)
    {
        categoryRepo.delete(req.body.CatId).then(value => {
            res.redirect('/category');
        }).catch(error=>{
            res.end('fail');
        });
    }else{
        res.render('error/index');
    }
});

module.exports = router;