var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');

var { MongoClient } = require('mongodb');
var url = 'mongodb://localhost:27017';

router.get('/',(request,response)=>{
    MongoClient.connect(url, (error,client)=>{
        request.session.isUserLoggedIn = false;
        var db = client.db('WebApplicationDB');
        var collection = db.collection("UserAccountDetails");
        collection.find({uid:request.query.username}).toArray((err,data)=>{
                var responseData = {
                    msg:""
                }
                if(data.length){
                    var isValid = bcrypt.compareSync(request.query.userpwd, data[0].pwd);
                    if(isValid){
                        responseData.msg = 'Valid';
                        request.session.isUserLoggedIn = true;
                    }
                    else{
                        responseData.msg="Invalid";
                    }
                }
                else{
                    responseData.msg="Invalid";
                }
            responseData=JSON.stringify(responseData);
            response.send(responseData);
        });
    });
});


module.exports = router; 