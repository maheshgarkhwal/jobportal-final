const registration = require("../mongodb/registration");
const { count } = require("console");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var registrations=require("../mongodb/registrationemployer");


function checkSession(req, res, next) {
   try {
        const token = req.headers.authorization.split(" ")[1];
       var decode = jwt.verify(token, 'shhhhh');
    
    req.user = {
        id: decode._doc._id
    };
        next();
    } catch (err) {
        res.status(401).send("invalid token");
    }
}
async function loginemployer(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    const user = await registrations.findOne({ email: email })
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
        
            return res.send(200,token);

        }
    })
}


async function loginemployee(req, res) {

    var email = req.body.email;
    var password = req.body.password;
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
         res.status(200).json({message:"login in sucessfully","token":token})

        }
    })

}
const registeremployee = async function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phoneno= req.body.phoneno;
    var address=req.body.address;
    var skills=req.body.skills;
   

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.send(404,"data is notx valid");
        }
        var newUser = new registration({
            name: name,
            email: email,
            password: hash,
            phoneno:phoneno,
            address:address,
            skills:skills,

        });
        console.log("hh")
        newUser.save().then(doc => res.send(200,"registrered") ) .catch(err => res.status(404).json({message:"data is not valid"}));
    });
}
const registeremployer = async function (req, res, next) {
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
        newUser.save().then(doc => res.send(200,"registered")).catch(err => res.send(err));
    });
}



module.exports = {
    
    registeremployee,
    checkSession,
    registeremployer,
    loginemployee,
    loginemployer


}
