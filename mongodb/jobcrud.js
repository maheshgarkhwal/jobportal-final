const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    jobrole:{type:String,required:true},
    experience:Number,
    location:{type:String,required:true},
    postedDate:{type:String,required:true}
})

const jobCRUD=mongoose.model('jobs', jobSchema);

module.exports=jobCRUD;