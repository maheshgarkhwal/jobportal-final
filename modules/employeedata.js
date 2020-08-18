const jobcrud = require('../mongodb/jobcrud');
var nodemailer = require('nodemailer');

const registration = require("../mongodb/registration")
const applicationForm = require('../mongodb/applicationform');
const { query } = require('express');
const { db } = require('../mongodb/registration');

async function updateprofile(req, res, next) {
    var userid=localStorage.getItem('id');

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
    var jobpost = JSON.stringify(req.query);
    var name = req.body.name;
    var email = req.body.email;
    var phoneno = req.body.phoneno;
    var skills = req.body.skills;
    var experience = req.body.experience;

    console.log(typeof (jobpost))
    var newUser = new applicationForm({
        name: name,
        email: email,
        phoneno: phoneno,
        skills: skills,
        experience: experience,
        jobpost: jobpost

    });
    newUser.save().then(doc => res.send(201,doc)).catch(err => res.send(err));
}

module.exports = {
    updateprofile,
     filterJobs,
    applicationform
}
