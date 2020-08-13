const mongoose=require('mongoose');
const fileUpload = require('express-fileupload');

const formSchema=new mongoose.Schema({
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
    
        phoneno:{
            type:String,
            required:true,
            index:{
                unique:true
                }
        },
        skills:{
            type:String,
            required:true

        },
        experience:Number,
        //file:fileUpload
})

const applicationForm=mongoose.model('applications', formSchema);

module.exports=applicationForm;
