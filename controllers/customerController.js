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
    if(req.session.isLogged==true)
	{
        var date=new Date(req.session.user.ngay_sinh);
        var dob=date.getFullYear()+'-';
        dob+=parseInt(date.getMonth())>9?date.getMonth()+1:'0'+(date.getMonth()+1);
        dob+='-';
        dob+=parseInt(date.getDate())>9?date.getDate():'0'+date.getDate();
        var user = {
            ma_nd: req.session.user.ma_nd,
            ten_nd: req.session.user.ten_nd,
            email: req.session.user.email,
            ngay_sinh: dob,
            dia_chi:req.session.user.dia_chi,
            sdt: req.session.user.sdt
        };
        var vm={
            person: user
        }
        res.render('customer/update',vm); 
    }
});

router.post('/update', (req, res) => {
    // Kiểm tra mật khẩu có phù hợp không
    var newPassword=req.body.newPassword==''? req.session.user.password:SHA256(req.body.newPassword).toString();
    
    if(newPassword==req.session.user.password )
    {
        var user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            dob: req.body.dob,
            addr:req.body.address,
            telephone: req.body.telephone,
            permission: 0
        };

        customerRepo.updateInformationPersonal(user).then(value => {
            //req.session.user=customerRepo.single(req.session.user.ma_nd);
            var vm={
                isUpdate:true,
                person: req.session.user
            }
            res.render('customer/update',vm);
        }).catch(error=>{
            res.end('fail');
        });
    }
    else
    {
        var vm={
            isUpdate:false,
            person: req.session.user
        }
        res.render('customer/update',vm);
    }
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
            var vm={
                showAlert: true
            }
            res.render('customer/register',vm);
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

            //check if admin
            req.session.isAdmin = user.email === 'admin' ? true : false;
            // user = rows[0];

            req.session.isLogged = true;
            //Quản lí giỏ hàng
            req.session.user=rows[0]
            req.session.cart=[];
            var url= '/';
            if(req.query.retUrl){
                url=req.query.retUrl;
            }
            res.redirect(req.session.isAdmin? '../admin' : url);
            //res.redirect('/');
            
        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    }).catch(error=>{
        res.end('fail');
    });
});

router.get('/profile', (req, res) => {
    res.render('customer/profile');
});

router.post('/logout',(req,res)=>{
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
   // res.redirect(req.headers.referer);
   res.redirect('/home');
})

module.exports = router;
