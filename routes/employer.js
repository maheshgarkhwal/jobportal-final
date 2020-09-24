var express = require('express');
var router = express.Router();
var employer =require('../modules/employerdata');
var data = require("../modules/data");


//employer
router.post("/addjobs",data.checkSession,employer.addJobs);
router.put("/editjobs/:id",data.checkSession,employer.jobPostExist,employer.editJobs);
router.get("/filterjobs",data.checkSession,employer.filterJobs);
router.put("/updateprofile",data.checkSession,employer.updateprofile);
router.get("/application",data.checkSession,employer.applied)


module.exports = router;
