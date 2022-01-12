var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/Uploaddata/uploadsimages/');
    },
    filename: function(req, file, callback) { 
        console.log(file.originalname);
        file_path = "product_"  + Date.now() + path.extname(file.originalname);
       
        callback(null, file_path);
        console.log(file_path);
    }
});


var upload = multer({ storage: storage}).single('prodImage');
var file_path;


router.post('/', function(req, res, next) {
    var data = {};
    upload(req, res, function(err) {
        if (err) {
            data.msg = "ERROR"
            console.log(err);
        } else {
            data.file_path = "/Uploaddata/uploadsimages/" + file_path;
            data.msg = 'success';
        }
        res.send(JSON.stringify(data));
    });
});

module.exports = router;