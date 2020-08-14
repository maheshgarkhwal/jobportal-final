var nodemailer = require('nodemailer');
var jobdb=require('../mongodb/jobcrud');
const { getMaxListeners } = require('../mongodb/jobcrud');

async function email(req,res,next) {
    let id=req.params.id;
    let emp=await jobdb.findById({_id: id}).exec(); 
    let email=emp.email;
    console.log(emp);

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mahesh.garkhwal@gmail.com',
            pass: 'kelltontechsolutions'
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
}



module.exports = {
    email
}