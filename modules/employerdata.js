var jobdb=require('../mongodb/jobcrud');
const registrations = require('../mongodb/registrationemployer');
const applicationform=require("../mongodb/applicationform");


function jobPostExist(req, res, next){
    console.log("check");
    let id=req.params.id;
    const users= jobdb.find({_id: id}).exec()
    console.log(users);
      next();
}
async function updateprofile(req,res,next){
    const empId=req.params.id;
   const data=req.body;
     var response=await registrations.findByIdAndUpdate(empId,data)
     if(!response){
         res.status(400).send("login again");
     }
     else{
            res.send(200);
     }
}
async function addJobs(req, res, next){
        let jobdetails = req.body;
        let job = new jobdb(jobdetails);
        await job.save(); 
        res.status(200).send(`job added`);
        res.end();
}

function listJobs(req, res, next){
    jobdb.find().exec(function (error, data) {
        if (error) 
        return res.status(500).send("internal server error");

        res.status(200).send(data);
        res.end();
    });
}

 function editJobs(req, res, next){
    let jobdetails = req.body;
    let id = req.params.id;
    console.log(id);
    userdata.findByIdAndUpdate(id, jobdetails, function (error, data) {
        if (error) {
            console.log(error);
        }
        return res.status(200).send(`user updated :${id}`);
    });
}

function applied(req, res, next){
        applicationform.find().exec(function (error, data) {
            if (error) 
            return res.status(500).send("internal server error");
            if(data.length==0){
                res.send(404,"No application")
            }
            res.status(200).send(data);
            res.end();

    })
}



async function filterJobs(req, res, next){
    let skill=req.query;
    jobdb.find(skill).exec(function (error, data) {
        if (error) 
        return res.status(500).send("internal server error");

        return res.status(200).send(data);
    });
}

module.exports={
    addJobs,
    listJobs,
    editJobs,
    filterJobs,
    jobPostExist,
    updateprofile,
    applied
}