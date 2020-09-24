var express = require('express');
var data = require("../modules/data");
var router = express.Router();
var emp=require('../modules/employeedata');

router.put('/updateprofile',data.checkSession,emp.updateprofile);
router.get('/filter',data.checkSession,emp.filterJobs);
router.post("/apply/:id",data.checkSession,emp.applicationform);

module.exports = router;
