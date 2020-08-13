var express = require('express');
var router = express.Router();
var employer =require('../modules/employerdata');

//employer
router.post("/addjobs",employer.addJobs);
router.get("/listjobs",employer.listJobs);
router.put("/editjobs/:id",employer.jobPostExist,employer.editJobs);
router.get("/filterjobs",employer.filterJobs);
router.put("/updateprofile/:id",employer.updateprofile);
router.get("/application",employer.applied)