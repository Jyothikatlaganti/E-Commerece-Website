var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');

var { MongoClient } = require('mongodb');
var url = 'mongodb://localhost:27017';

router.post('/',(request,response)=>{
    MongoClient.connect(url, (error,client)=>{
        var db = client.db('WebApplicationDB');
        var collection = db.collection("UserAccountDetails");
        collection.deleteOne({uid:request.body.uid},(err,data)=>{
                var responseData = {
                    msg:""
                }
                if(data.length){
                        responseData.msg = 'Invalid data'
                    }
                else{
                    responseData.msg=" User Got Deleted Successsfully";
                }
            responseData=JSON.stringify(responseData);
            response.send(responseData);
        });
    });
});


module.exports = router; 