var express = require('express');
var customerRepo = require('../repos/customerRepo');

var router = express.Router();

router.get('/update', (req, res) => {
    customerRepo.single(req.query.id).then((result) => {
        var vm={
            person: result
        }
        res.render('customer/update',vm);
    }).catch((err) => {
        
    });
});

router.post('/update', (req, res) => {
    categoryRepo.update(req.body).then(value => {
        var vm={
            person: value
        }
        res.redirect('customer/update',vm);
    });
});

module.exports = router;
