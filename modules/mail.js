var nodemailer = require('nodemailer');
var jobdb=require('../mongodb/jobcrud');

function email(req,res,next) {

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abc@gmail.com',
        pass: '1234'
    }
    });

    var mailOptions = {
    from: 'abc@gmail.com',
    to: 'xyz@gmail.com',
    subject: 'job',
    text: `applied for jobs`,
    attachments: [ 
            { filename: 'abc.pdf', path: '../resume/abc.pdf' }
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



// }
module.exports = {
    email
}