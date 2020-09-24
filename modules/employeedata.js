const jobcrud = require('../mongodb/jobcrud');
var nodemailer = require('nodemailer');
var jobdb=require('../mongodb/jobcrud');

const registration = require("../mongodb/registration")
const applicationForm = require('../mongodb/applicationform');
const { query } = require('express');
const { db } = require('../mongodb/registration');

async function updateprofile(req, res, next) {
    var userid=req.user.id;
console.log(userid)
    const data = req.body;
    console.log(userid, data);
    var response = await registration.findByIdAndUpdate(userid, data);
    console.log(response);


    if (!response) {
        res.status(400).send("login again");
    }
    else {
        res.send(200);
    }
}


async function filterJobs(req, res, next) {
    const limit = req.query;

    const response = await jobcrud.find(limit);
    console.log(response)
    if (response.length == 0) {
        res.status(404).send("No Job post");
    }
    else {
        res.status(200).send(response);
    }

}
const applicationform = async function (req, res, next) {
    var jobpost = req.user.id;
    var job=req.params.id
    var result= await registration.findById({_id:jobpost})
    console.log(result.name)


    var newUser = new applicationForm({
        name: result.name,
        email: result.email,
        phoneno: result.phoneno,
        skills: result.skills,
        experience: result.experience,
        jobpost: job

    });
    var result1= await applicationForm.find({email:result.email})
    console.log(result1)
    if(result1.length==0){
    newUser.save().then( async function email(req,res,next) {
        let emp=await jobdb.findById({_id: job}).exec(); 
        let email=emp.email;
        console.log(email)
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: '@@@@@',
                pass: '%%%%%'
            }
        });
    
        var mailOptions = {
            to: email,
            subject: 'job',
            text: `applied for jobs`,
            attachments: [ 
                    { filename: 'abc.pdf', path: __dirname+'/resume/abc.pdf' }
                ]
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('information: ' + info.response);
        }
        });
    }).catch(err => res.send(err));}
    else{
        res.status(404).json({message:"already applied"})
    }
}

module.exports = {
    updateprofile,
     filterJobs,
    applicationform,

}
