var express = require('express');
let request = require('request');    // Sử dụng thư viện request để gửi request lên Google API


//Xử lí captcha
var router = express.Router();
router.post('/check', (req, res) => {
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
                console.log(this.method);
                console.log(this.body);
                res.render(req.headers.referer);
            }else{
                // Xử lý lỗi nếu Captcha không hợp lệ
                console.log(this.method);
                console.log(this.body);
                res.render(req.headers.referer);
                console.log("captcha khong hop le");   
            }
        });
    } else {
        // Xử lý lỗi nếu không có Captcha
        res.render(req.headers.referer);
        console.log("captcha khong hop le");   
    }
   
});



module.exports = router;