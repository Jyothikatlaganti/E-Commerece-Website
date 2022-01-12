var submitingdata = ()=>{
    var uploadfile = $("input[name=prodImage]")[0].files[0];
    console.log(uploadfile);
    var formData = new FormData();
    formData.append("prodImage", uploadfile);
    console.log(formData);


var imageUploadReq = $.ajax({
        url:'/upload/data',
        type:'POST',
        data:formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType:'JSON'
    });

    imageUploadReq.done((response)=>{
        console.log(response);
        UploadProductData(response);

    });

    imageUploadReq.fail(()=>{
        console.log("error");
    })

}

var UploadProductData=(response)=>{
    var pdata={};
    pdata.title = $("#ptitle").val();
    pdata.image = response.file_path;
    console.log(pdata);

    $.ajax({
        url:'/upload/product/data/dynamically',
        method:'GET',
        dataType:'JSON',
        data:pdata,
        success:(res)=>{
            console.log("success");
        },
        error:(err)=>{
            console.log("error");
        }
    });
}