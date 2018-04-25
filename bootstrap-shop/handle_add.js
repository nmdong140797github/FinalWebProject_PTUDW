
var temp=document.getElementsByClassName("btn_add");
for(var i=0;i<temp.length;i++)
{
    if(i!=2&&i!=3)
    {
        temp[i].setAttribute("href", "product_summary.html");
    }
    if(i==2)
    {
        temp[i].setAttribute("href", "product_summary1.html");
    }
    if(i==3)
    {
        temp[i].setAttribute("href", "product_summary2.html");
    }
}
