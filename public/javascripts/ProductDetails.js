var ProductDetails=[];
var Creatingproducts=(pdata)=>{
    var template = Handlebars.compile($("#producttemplate").html());
    $("main").append(template(pdata));
}
var Loadproductsonpage =()=>{
    $.ajax({
        url:"http://localhost:8081/get/Productdata",
        method:"GET",
        dataType:"JSON",
        data:{},
        success:(response)=>{
            ProductDetails=response.object;
            Loaddata();

        },
        error:(error)=>{
            console.log("error");
        }
    });
}

var Loaddata = ()=>{
    for(i=0;i<ProductDetails.length;i++){
        Creatingproducts(ProductDetails[i]);
    }
}