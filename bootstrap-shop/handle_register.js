//Create two arrays to save info customer account
var arrUserName=[""];
var arrPassWord=[""];

function HandleRegister()
{
var userName=document.getElementById("input_email").value;
var passWord=document.getElementById("inputPassword1").value;
if(userName!="" && passWord!="")
{
    arrUserName.push(userName);
    arrPassWord.push(passWord);
    alert("Đăng kí tài khoản thành công");
}
else{
    alert("Thông tin tài khoản không được bỏ trống");
}
}