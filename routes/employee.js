var express = require('express');
var data = require("../modules/data");
var router = express.Router();
var emp=require('../modules/employeedata');
router.get("/",function(req,res){
    res.send("hh");
})
router.put('/updateprofile/:id', emp.updateprofile);
router.get('/alljobs',data.checkSession,emp.allJobs);
router.get('/filter',data.checkSession,emp.filterJobs);
router.post("/apply", data.checkSession,emp.applicationform);



module.exports = router;
