var express = require('express');
var customerRepo = require('../repos/customerRepo');

var router = express.Router();

function getString(date)
{
    var currentDate = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var currentMonth = (date.getMonth()+1 < 10 ? '0' : '') + (parseInt(date.getMonth())+1).toString();
    var chuoi=date.getFullYear()+'-'+currentMonth+'-'+currentDate;
    return chuoi;
}

router.get('/update', (req, res) => {
    customerRepo.single(req.query.id).then((result) => {
        result.ngay_sinh=getString(result.ngay_sinh);
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
