const mongoose=require('mongoose');

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
        experience:Number
})

const applicationForm=mongoose.model('applications', formSchema);

module.exports=applicationForm;