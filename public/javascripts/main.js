var loadpage = (type)=>{
    var url = "";
    switch(type){
        case "login":
            url="templates/login.htm"
            break;
        case "frgtpwd":
            url="templates/frgtpwd.htm"
            break;
        case "signup":
            url="templates/signuppage.htm"
            break;
        case "deleteact":
            url="templates/deletepage.htm"
            break;
        case "product":
            $("main").empty();
            $("main").append("<div class='logoutlink' onclick ='Logoutsession();'>Logout</div>");
            Loadproductsonpage();
            break;
    }
    if(url){
        $.ajax({
            url:url,
            method:"GET",
            success:(response)=>{
                $("main").html(response);
            },
            error:(error)=>{
                console.log("error");
            }
        });
    }
}
// Ajax call to Register A new User........
var userRegistration = ()=>{
    var userinfo={
        uid:$("#uname").val(),
        pwd:$("#upass").val(),
        useremail:$("#umail").val(),
        userno:$("#uno").val()
    };
    rpwd=$("#repass").val();
    if(userinfo.uid==""||userinfo.pwd==""||userinfo.pwd!=rpwd){
        $(".error").show();
    }
    else{
        $(".error").hide();
    $.ajax({
        url:"/newuser/registration",
        method:"POST",
        data:userinfo,
        dataType:"JSON",
        success:(response)=>{
                $("#smsg").show();
                $("#smsg").html(response.msg);
        },
        error:(error)=>{
            console.log("error");
        }
    });
}}

// Ajax call for Deleting The User Account.....
var userAccountdelete = ()=>{
    var userdata={
        uid:$("#uname").val(),
        pwd:$("#upass").val(),
        useremail:$("#umail").val()
    };
    var reenterpwd = $("#repass").val();
    if(userdata.uid==""||userdata.pwd==""||userdata.pwd!=reenterpwd){
        $(".error").show();
    }
    else{
        $(".error").hide();
    $.ajax({
        url:"/user/account/delete",
        method:"POST",
        data:userdata,
        dataType:"JSON",
        success:(response)=>{
            $("#dmsg").show();
            $("#dmsg").html(response.msg);
        },
        error:(error)=>{
            console.log("error");
        }
    });
}}

// Ajax Call to check whether the user already login or not .................
$.ajax({
    url:'/check/user/login',
    method:"GET",
    dataType:"JSON",
    success:(data)=>{
        if(data.loginStatus){
            loadpage("product");
        } else{
            loadpage("login");
        }
    },
    error:(err)=>{
        console.log("error");
    }

});

//Ajax call to logout the user.......
var Logoutsession =()=>{
    $.ajax({
        url:'/user/Logout',
        method:'GET',
        dataType:"JSON",
        success:(response)=>{
            loadpage("login");
        },
        error:(error)=>{
            console.log("error");
        }
    });
}