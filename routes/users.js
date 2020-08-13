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

router.post('/login' ,validation,data.get);
router.post('/loginEmployer' ,validation,data.getEmployer);
router.post('/registration',data.createdata);
router.post('/registrationEmployer',data.createdataEmployer);



module.exports = router;
