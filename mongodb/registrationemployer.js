const mongoose  = require("mongoose");
 var Schema=mongoose.Schema;

var employer=new Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
            }
        },
    password:{
        type:String ,
        required:true,
        },
        phoneno:{
            type:String,
            required:true,
            index:{
                unique:true
                }
        },
        
        companyName:{
            type:String,
            required:true,
            index:{
                unique:true
                }
        
        },
    });

var registrations=mongoose.model('employerregistration',employer);



module.exports=registrations;