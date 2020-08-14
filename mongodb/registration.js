const mongoose  = require("mongoose");
 var Schema=mongoose.Schema;

var employee=new Schema({
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
        
        address:{
            type:String,
            required:true,
            index:{
                unique:true
                }
        
        },
        skills:{
            type:String,
            required:true

        }
        
});

var registration=mongoose.model('registrationemployee',employee);



module.exports=registration;