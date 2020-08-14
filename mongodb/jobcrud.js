const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    jobrole:{type:String,required:true},
    experience:{type:String,required:true},
    location:{type:String,required:true},
<<<<<<< HEAD
    postedDate:{type:Date,default:Date.now(),required:true},
   
=======
    postedDate:{type:String,required:true}
>>>>>>> aebb09edbc7df2e65a88c11252e1b3c95505aca5
})

const jobCRUD=mongoose.model('jobs', jobSchema);

module.exports=jobCRUD;