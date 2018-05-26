var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');
var customerRepo = require('../repos/customerRepo');

var router = express.Router();

function getString(date)
{
    var currentDate = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var currentMonth = (date.getMonth()+1 < 10 ? '0' : '') + (parseInt(date.getMonth())+1).toString();
    var chuoi=date.getFullYear()+'-'+currentMonth+'-'+currentDate;
    return chuoi;
}

function CheckEmailExists(srcEmail)
{
    if(customerRepo.email(srcEmail).length>0)
        return false;
    return true;
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
    customerRepo.update(req.body).then(value => {
        var vm={
            person: value
        }
        res.redirect('customer/update',vm);
    });
});

router.get('/register', (req, res) => {
    res.render('customer/register');
});

router.post('/register', (req, res) => {
    var err;
    if(CheckEmailExists(req.body.email)==false)
    {
        err=true;
        res.render('customer/register',err);
    }
    else
    {
        err=false;        

        var user = {
            name: req.body.name,
            email: req.body.email,
            password: SHA256(req.body.rawPWD).toString(),
            dob: req.body.dob,
            addr:req.body.address,
            telephone: req.body.telephone,
            permission: 0
        };
        
        customerRepo.add(user).then(value => {
            res.render('customer/register',err);
        });
    }
    
});

router.get('/login', (req, res) => {
    res.render('customer/login');
});

router.post('/login', (req, res) => {
    var user = {
        email: req.body.email,
        password: SHA256(req.body.rawPWD).toString()
    };

    customerRepo.login(user).then(rows => {
        if (rows.length > 0) {
            // user = rows[0];

            req.session.isLogged = true;

            res.redirect('/');

        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    });
});

router.get('/profile', (req, res) => {
    res.render('customer/profile');
});

module.exports = router;
