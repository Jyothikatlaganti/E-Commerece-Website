var loginuser = ()=>{
    var Userdata = {};
    Userdata.username = $("#uname").val();
    Userdata.userpwd = $("#upass").val();
    $.ajax({
        url:"/validate/user/login",
        method:"GET",
        data:Userdata,
        dataType:"JSON",
        success:(response)=>{
            if(response.msg == 'Valid'){
                loadpage("product");
            }
            else{
                $("#errorblock").show();
            }
        },
        error:(error)=>{
            console.log("error");
        }
    });
}