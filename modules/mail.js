var nodemailer = require('nodemailer');

function email(req,res,next) {

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mahesh.garkhal@gmail.com',
        pass: 'kelltontechsolutions'
    }
    });

    var mailOptions = {
    from: 'mahesh.garkhal@gmail.com',
    to: 'mahesh.garkhwal@kelltontech.com',
    subject: 'job',
    text: `applied for jobs`
        
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