import { error } from 'util';

var express = require('express');
var producerRepo = require('../repos/producerRepo');

var router = express.Router();

router.get('/',(res,req)=>{
    producerRepo.loadAll().then(rows=>{
        var vm = {
            producers: rows
        };
        res.render('producer/index',vm);
    }).catch(error=>{

    });
    
});

router.get('/add',(res,req)=>{
    router.render('producer/add')
});

router.post('/add',(res,req)=>{
    // Tham số bao gồm: 
    var producer={
        id: req.body.txtId,
        name: req.body.txtName,
        address: req.body.txtAddress,
        telephone: req.body.txtTelephone
    }

    producerRepo.add(producer).then(value =>{
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
    var producer={
        id: req.body.txtName,
        name: req.body.txtName,
        address: req.body.txtAddress,
        telephone: req.body.txtTelephone
    }

    producerRepo.update(producer).then(value=>{
        var vm = {
            showAlert: true 
        };
        res.render('producer/edit',vm);
    }).catch(error=>{
        res.end('fail');
    });
});

module.exports = router;