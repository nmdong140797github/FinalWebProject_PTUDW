var express = require('express');
var producerRepo = require('../repos/producerRepo');
var error = require('util');

var router = express.Router();

router.get('/',(req,res)=>{
    producerRepo.loadAll().then(rows=>{
        var vm = {
            producers: rows,
            isAdmin: req.session.isAdmin
        };
        //console.log(vm);
        res.render('producer/index',vm);
    }).catch(error=>{
        res.end('fail');
    });
    
});

router.get('/add',(req,res)=>{
    
        res.render('producer/add')
    
});

router.post('/add',(req,res)=>{
    producerRepo.add(req.body).then(value =>{
        // thông báo đã thêm thành công
        var vm = {
            showAlert: true 
        };
        res.render('producer/add',vm);
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/delete',(req,res)=>{
    
        producerRepo.single(req.query.id).then(value=>{
            var producer=value;
            res.render('producer/delete',product);
        }).catch(error=>{
            res.end('fail');
        });
    
    
});

router.post('/delete',(req,res)=>{
    
        producerRepo.delete(req.body.ProducerId).then(value =>{
            // thông báo đã xóa thành công
            var vm = {
                showAlert: true 
            };
            res.render('producer/delete',vm);
        }).catch(error=>{
            res.end('fail');
        });
    

});

router.get('/edit',(req,res)=>{
    
        producerRepo.single(req.query.id).then(value=>{
            var vm={
                producer: value[0]
            }
            res.render('producer/edit',vm);
        }).catch(error=>{
            res.end('fail');
        });
    
    
});

router.post('/edit',(req,res)=>{    
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