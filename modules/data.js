const registration = require("../mongodb/registration");
const { count } = require("console");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
var jwt = require('jsonwebtoken');
var registrations=require("../mongodb/registrationemployer");
const { Script } = require("vm");

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
async function getEmployer(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    console.log(password);
    const user = await registrations.findOne({ email: email })
    console.log(user)
    if (!user) {
        res.send(404, "no user found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            res.send(404, "incmplete data");
        }
        console.log(result)
        if (result == false) {
            return res.send("invalid email or id");

        }
        else {
            var token = jwt.sign({ ...user, _id: user._id.toString() }, 'shhhhh',{expiresIn:'1h'});
            return res.status(200).json({ message: "logged in sucessfully", id:user._id,token: token });

        }
    })

}


async function get(req, res) {

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
            return res.status(200).json({ message: "logged in sucessfully", id:user._id,token: token });

        }
    })

}



const createdata = async function (req, res, next) {
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
        newUser.save().then(doc => res.send("resgistered")).catch(err => res.send("error"));
    });
}
const createdataEmployer = async function (req, res, next) {
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
        newUser.save().then(doc => res.send("resgistered")).catch(err => res.send(err));
    });
}



module.exports = {
    
    createdata,
    checkSession,
    createdataEmployer,
    get,
    getEmployer


}
