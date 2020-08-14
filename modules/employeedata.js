const jobcrud=require('../mongodb/jobcrud');
var nodemailer = require('nodemailer');
const registrations= require('../mongodb/registrationemployer');
const registration=require("../mongodb/registration")
const applicationForm = require('../mongodb/applicationform');

async function updateprofile(req,res,next){
    var userid=req.params.id;

   const data=req.body;
   console.log(userid,data);
     var response=await registration.findByIdAndUpdate(userid,data);
     console.log(response);
    
    
     if(!response){
         res.status(400).send("login again");
     }
     else{
            res.send(200);
     }
}
async function allJobs(req,res,next){
    
    const response=await jobcrud.find();
    console.log(response);
    if(!response){
        res.status(404).send("No Job post ");
    }
    else{
        res.status(200).send(response);
    }
}

async function filterJobs(req,res,next){
    const limit=req.query.query;
    const response=await jobcrud.find(limit);
    if(!response){
        res.status(404).send("No Job post");
    }
    else{
        res.status(200).send(response);
    }
    
}
const applicationform=async function(req,res,next){
    var name = req.body.name;
    var email = req.body.email;
    var phoneno= req.body.phoneno;
    var skills=req.body.skills;
    var experience=req.body.experience; 

    
        var newUser = new applicationForm({
            name: name,
            email: email,
            phoneno:phoneno,
            skills:skills,
            experience:experience,
          
        });
        newUser.save().then(doc => res.send(doc)).catch(err => res.send(err));
}








module.exports={
    updateprofile,
    allJobs,
    filterJobs,
    applicationform
}
