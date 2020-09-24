var express = require('express');
var data = require("../modules/data");
var router = express.Router();

function validation(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        return res.send("required email or password");
     }
      next();
}

router.post('/login' ,validation, data.loginemployee);
router.post('/loginEmployer' ,validation, data.loginemployer);
router.post('/registration',data.registeremployee);
router.post('/registrationEmployer',data.registeremployer);



module.exports = router;
