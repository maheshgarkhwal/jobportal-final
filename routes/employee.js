var express = require('express');
var data = require("../modules/data");
var router = express.Router();
var multer=require('multer');
var emp=require('../modules/employeedata');

router.put('/updateprofile/:id',data.checkSession, emp.updateprofile);
router.get('/filter',data.checkSession,emp.filterJobs);
router.post("/apply",emp.applicationform);



module.exports = router;
