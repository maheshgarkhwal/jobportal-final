const mongoose=require('mongoose');

const pdf=new mongoose.Schema({
    email:{
        type:String
    },
    pdf:{
        type:String
    }
})

const resume=mongoose.model('pdf', pdf);

module.exports=resume;