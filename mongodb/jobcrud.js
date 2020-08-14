const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    jobrole:{type:String,required:true},
    experience:{type:String,required:true},
    location:{type:String,required:true},

    postedDate:{type:Date,default:Date.now(),required:true},
   


})

const jobCRUD=mongoose.model('jobs', jobSchema);

module.exports=jobCRUD;