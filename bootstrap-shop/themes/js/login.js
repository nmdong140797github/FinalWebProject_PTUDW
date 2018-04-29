

function OnClickSignIn()
{
    var UserName=document.getElementById("inputEmail").value;
    var Password=document.getElementById("inputPassword").value;

    if(UserName=="admin" && Password=="admin")
    {
        if ( typeof(Storage) !== "undefined") {
            //set sesionStorage
            sessionStorage.setItem('UserName',UserName);
            sessionStorage.setItem('Password',Password);
        } else {
            alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
        }

        location.assign("index.html")
    }
    else if (UserName=="user1" && Password=="user1")
    {
        if ( typeof(Storage) !== "undefined") {
            //set sesionStorage
            sessionStorage.setItem('UserName',UserName);
            sessionStorage.setItem('Password',Password);
        } else {
            alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
        }

        location.assign("index.html")
    }

    
}

function OnClickLogout()
{
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('Password');
    alert("Bạn đã đăng xuất thành công");
    location.assign("index.html")
}

function ToAdminDashboard()
{
    location.assign("admin_dashboard.html");
}

function ToReceiptHistory() 
{
    location.assign("receipt_history.html");
}

function OnClickUpdate()
{
    // // Get data
    // var Name=document.getElementById("inputName").value;
    // //var DateOfBirth=document.getElementById("inputName").value;;
    // var Telephone=document.getElementById("inputTelephone").value;;
    // var Email=document.getElementById("inputEmail").value;;
    
    // Send data to server
    

    // Finish
    alert("Bạn đã cập nhật thành công dữ liệu cá nhân")

}

function OnClickSearch()
{
    // Get serach string
    var SearchString=document.getElementById("srchFld").value;

    // Send data to server and receive result

}

window.onload = function()
{
    if ( typeof(Storage) !== "undefined") {
        //get UserName, Password
        var UserName=sessionStorage.getItem('UserName');
        if(UserName!=null)
        {
            var Password=sessionStorage.getItem('Password');            
            // Insert User
            //-- Delete old child nodes
            $('#login-account-area').children().remove();
            
            //-- Change button Login -> button Account

            var adminFeatures = (UserName == 'admin')?'<li><a onclick="ToAdminDashboard()" href="#">Admin dashboard</a></li>':'<li><a onclick="ToReceiptHistory()" href="#">Lịch Sử Mua Hàng</a></li>';

            var loginArea = '<div class="btn-group open" style="margin-top:20px; "><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Tài Khoản '
            +UserName+ '<span class="caret"></span></button><ul class="dropdown-menu" style="position: absolute;z-index:20"><li><a href="update_personal_information.html">Cập Nhật Thông Tin Cá Nhân</a></li>' + adminFeatures + '<li><a onclick="OnClickLogout()" href="#">Đăng Xuất</a></li></ul></div>'

            $('#login-account-area').append(loginArea);

            //-- Change User Name
            $('#Name-User').text(UserName);
        }
        else{
            //-- Delete old child nodes
            $('#login-account-area').children().remove();
            
            //-- Change button Login -> button Account
            $('#login-account-area').append('<a href="#login" role="button" data-toggle="modal" style="padding-right:0"><span class="btn btn-large btn-success">Login</span></a><div id="login" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" ><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3>Login Block</h3></div><div class="modal-body"><form class="form-horizontal loginFrm"><div class="control-group"><input type="text" id="inputEmail" placeholder="Email"></div>'
            +'<div class="control-group"><input type="password" id="inputPassword" placeholder="Password"></div><div class="control-group"><label class="checkbox"><input type="checkbox"> Remember me</label></div></form><!--                                 Đăng kí ở đây                          --><button type="submit" class="btn btn-success" onclick="OnClickSignIn()">Sign in</button><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div></div>');
            
            //-- Change User Name
            $('#Name-User').text('User');
        }
    }
    else {
        alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
    }

}