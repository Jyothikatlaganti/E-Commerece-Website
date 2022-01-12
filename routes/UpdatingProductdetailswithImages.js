var express = require('express');
var router=  express.Router();

var { MongoClient } = require('mongodb');
var url = 'mongodb://localhost:27017';


router.get("/",(request,response)=>{
    MongoClient.connect(url,(error,client)=>{
        var db = client.db("WebApplicationDB");
        var collection = db.collection("ProductDetails");
        collection.insertOne({title:request.query.title,img:request.query. image});
    });
    console.log(request.query);
    response.send("server got created");
});

module.exports = router;