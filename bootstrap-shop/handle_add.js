
var temp=document.getElementsByClassName("btn_add");
for(var i=0;i<temp.length;i++)
{
    if(i!=2&&i!=3)
    {
        temp[i].setAttribute("href", "product_summary.html");
    }
   //temp[i].setAttribute("id",i.toString(1));
}
//alert("hello");
//alert(temp[2].getAttribute("id"));
// our array
//var movies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", 
//"Kill Bill", "Death Proof", "Inglourious Basterds"];
 
// storing our array as a string
//localStorage.setItem("quentinTarantino", JSON.stringify(movies));