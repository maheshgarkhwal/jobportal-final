const registration = require("../mongodb/registration");
const { count } = require("console");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
var jwt = require('jsonwebtoken');
var registrations=require("../mongodb/registrationemployer");
const { Script } = require("vm");
var path=require("path");
var {LocalStorage}=require('node-localstorage')
localStorage=new LocalStorage('./scratch')
function checkSession(req, res, next) {
   

    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        var decode = jwt.verify(token, 'shhhhh');
        console.log(decode._doc);
        next();
    } catch (err) {
        res.status(401).send("invalid token");
    }
}
async function loginemployer(req, res) {

    var email = req.body.email;
    var password = req.body.password;
   
    const user = await registrations.findOne({ email: email })
    console.log(user)
    if (!user) {
        res.send(404, "no user found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            res.send(404, "incmplete data");
        }
       
        if (result == false) {
            return res.send("invalid email or id");

        }
        else {
            var token = jwt.sign({ ...user, _id: user._id.toString() }, 'shhhhh',{expiresIn:'1h'});
       
        localStorage.setItem('_id',id);
            return res.sendFile(path.join(__dirname,'..','/views/dashboardemployer.html'));

        }
    })

}


async function loginemployee(req, res) {

    var email = req.body.email;
    var password = req.body.password;
   console.log("++++++++++++++++++++++++++++++++++"+password)
    const user = await registration.findOne({ email: email })
    if (!user) {
        res.send(404, "no user found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            res.send(404, "incmplete data");
        }
        if (result == false) {
            return res.send("invalid email or id");

        }
        else {
            var token = jwt.sign({ ...user, _id: user._id.toString() }, 'shhhhh',{expiresIn:'1h'});
            localStorage.setItem('token',token);
         res.send(token)
            
            //return //res.sendFile(path.join(__dirname,'..','/views/dashboardemployee.html'));

        }
    })

}



const registeremployee = async function (req, res, next) {
    var filepath=path.join(__dirname,'..','/views/login.html');
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phoneno= req.body.phoneno;
    var address=req.body.address;
    var skills=req.body.skills;
   

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.send(404,"data is not valid");
        }
        var newUser = new registration({
            name: name,
            email: email,
            password: hash,
            phoneno:phoneno,
            address:address,
            skills:skills,

        });
        id=newUser._id;
    localStorage.setItem('id',id)
        newUser.save().then(doc => res.sendFile(filepath ) ).catch(err => res.status(404).json({message:"data is not valid"}));
    });
}
const registeremployer = async function (req, res, next) {
    var filepath=path.join(__dirname,'..','/views/loginemployer.html');
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phoneno= req.body.phoneno;
    var companyName=req.body.companyName;
 
console.log(companyName)
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.send(404,"data is not valid");
        }
        var newUser = new registrations({
            name: name,
            email: email,
            password: hash,
            phoneno:phoneno,
            companyName:companyName,
            
       

        });
        newUser.save().then(doc => res.sendFile(filepath)).catch(err => res.send(err));
    });
}



module.exports = {
    
    registeremployee,
    checkSession,
    registeremployer,
    loginemployee,
    loginemployer


}
