var express = require("express");
var router = express.Router();
var { MongoClient }=require('mongodb');
var dburl = 'mongodb://localhost:27017';

router.get("/",(request,response)=>{
    var Productdata = {
        "object":[]
    };
        MongoClient.connect(dburl,(error,client)=>{
            var db = client.db("WebApplicationDB");
            var collection = db.collection("ProductDetails");
            collection.find({}).toArray((error,data)=>{
                Productdata.object = data;
                Productdata = JSON.stringify(Productdata);
                response.send(Productdata);
            });
        });
});

module.exports = router;