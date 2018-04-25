
var temp=document.getElementsByClassName("btn_add");
for(var i=0;i<temp.length;i++)
{
    temp[i].setAttribute("href", "product_summary.html");
}

// our array
var movies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", 
"Kill Bill", "Death Proof", "Inglourious Basterds"];
 
// storing our array as a string
localStorage.setItem("quentinTarantino", JSON.stringify(movies));