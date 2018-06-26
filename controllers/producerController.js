// import { error } from 'util';

var express = require('express');
var producerRepo = require('../repos/producerRepo');
var error = require('util');

var router = express.Router();

router.get('/',(res,req)=>{
    producerRepo.loadAll().then(rows=>{
        var vm = {
            producers: rows
        };
        console.log(vm);
        res.render('producer/index',vm);
    });
    
});

router.get('/add',(res,req)=>{
    router.render('producer/add')
});

router.post('/add',(res,req)=>{
    producerRepo.add(req.body).then(value =>{
        // thông báo đã thêm thành công
        var vm = {
            showAlert: true 
        };
        res.render('producer/add');
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/delete',(res,req)=>{
    producerRepo.single(req.query.id).then(value=>{
        var producer=value;
        res.render('producer/delete',product);
    });
    
});

router.post('/delete',(res,req)=>{
    producerRepo.delete(req.query.id).then(value =>{
        // thông báo đã xóa thành công
        var vm = {
            showAlert: true 
        };
        res.render('producer/delete',vm);
    }).catch(error=>{
        res.end('fail');
    });

});

router.get('/edit',(res,req)=>{
    producerRepo.single(req.query.id).then(value=>{
        var producer=value;
        res.render('producer/edit',producer);
    });
    
});

router.post('/edit',(res,req)=>{    
    producerRepo.update(req.body).then(value=>{
        var vm = {
            showAlert: true 
        };
        res.render('producer/edit',vm);
    }).catch(error=>{
        res.end('fail');
    });
});

module.exports = router;