var express = require('express');
var router =express.Router();
const bcrypt = require('bcrypt');
var { MongoClient, Db }=require('mongodb');
var url = 'mongodb://localhost:27017';

const saltRounds = 10;
router.post("/",(request,response)=>{
    MongoClient.connect(url,(error,client)=>{
        var responseData={
            msg:"success"
        }
        var db = client.db("WebApplicationDB");
        var collection = db.collection("UserAccountDetails");
        collection.find({uid:request.body.uid,useremail:request.body.useremail}).toArray((error,data)=>{
            if(data.length>0){
                responseData.msg="User Already Exists........";
                responseData=JSON.stringify(responseData);
                response.send(responseData); 
            } else{
                console.log(request.body.pwd)
                bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(request.body.pwd, salt, function(err, encryptpwd) {
                    request.body.pwd=encryptpwd;
                    collection.insertOne(request.body,(error,data)=>{
                if(error){
                    responseData.msg="Error While Inserting... ";
                } else{
                    responseData.msg="User Created Successfully ";
                    responseData=JSON.stringify(responseData);
                    response.send(responseData); 
                }
        });
            // result == true
    });
});
            }
        });
    });
});

module.exports = router;