var express = require('express');
var router = express.Router();

router.get('/',(request,response)=>{
    var data ={
        loginStatus:request.session.isUserLoggedIn
    }
    response.send(JSON.stringify(data));
});


module.exports = router;