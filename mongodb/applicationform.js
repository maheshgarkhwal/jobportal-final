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
        
        },
    
        phoneno:{
            type:Number,
            required:true,
            
        },
        skills:{
            type:String,
            required:true

        },
        experience:String,
        jobpost:String
       
    
})

const applicationForm=mongoose.model('applicationsform', formSchema);

module.exports=applicationForm;
