var express = require('express');
let request = require('request');    // Sử dụng thư viện request để gửi request lên Google API


//Xử lí captcha
var router = express.Router();
router.post('/check', (req, res) => {
    res.setHeader("Content-Type", "app/json");
    var check=false;
    var data=req.body;
    var captchaResponse = req.body['g-recaptcha-response'];
    if (captchaResponse) {
        request({
            url: 'https://www.google.com/recaptcha/api/siteverify',
            method: 'POST',
            form: {
                secret: '6LdBOmEUAAAAAD9zMuO6pDiSoqMXPv_foU1EJsSV',
                response: captchaResponse
            }
        }, function (error, response, body) {
            // Parse String thành JSON object
            try {
                body = JSON.parse(body);
            } catch (err) {
                body = {};
            }
    
            if (!error && response.statusCode == 200 && body.success) {
                let options = {  
                    url: req.headers.referer,
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        'User-Agent': 'my-reddit-client'
                    },
                    form: {
                        name: data.name,
                        email: data.email,
                        rawPWD: data.rawPWD,
                        dob: data.dob,
                        address:data.address,
                        telephone: data.telephone
                    }
                };
                
                request.post(options, function(p1, p2, body){
                  check=true;
                } );
                console.log("captcha hợp lệ");
                //res.redirect(`http://127.0.0.1:3000/customer/register`);
            }else{
                // Xử lý lỗi nếu Captcha không hợp lệ
                console.log("captcha khong hop le");
               // res.redirect(`http://127.0.0.1:3000/customer/register`);
               res.render('/home');
            }
        });
    } else {
        // Xử lý lỗi nếu không có Captcha
       // res.redirect(`http://127.0.0.1:3000/customer/register`);
        console.log("captcha khong co");   
        res.render('/home');
    }
    if(check==true){
        res.render("/customer/register")
    }
});



module.exports = router;