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
    if(req.session.isAdmin==true)
    {
        res.render('producer/add')
    }else{
        res.render('error/index');
    }
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
    if(req.session.isAdmin==true)
    {
        producerRepo.single(req.query.id).then(value=>{
            var producer=value;
            res.render('producer/delete',product);
        }).catch(error=>{
            res.end('fail');
        });
    }else{
        res.render('error/index');
    }
    
});

router.post('/delete',(req,res)=>{
    if(req.session.isAdmin==true)
    {
        producerRepo.delete(req.body.ProducerId).then(value =>{
            // thông báo đã xóa thành công
            var vm = {
                showAlert: true 
            };
            res.render('producer/delete',vm);
        }).catch(error=>{
            res.end('fail');
        });
    }else{
        res.render('error/index');
    }

});

router.get('/edit',(req,res)=>{
    if(req.session.isAdmin==true)
    {
        producerRepo.single(req.query.id).then(value=>{
            var vm={
                producer: value[0]
            }
            res.render('producer/edit',vm);
        }).catch(error=>{
            res.end('fail');
        });
    }else{
        res.render('error/index');
    }
    
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