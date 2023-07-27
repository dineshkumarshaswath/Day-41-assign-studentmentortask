const mongoose=require("mongoose")


const mentorSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true   
    },
    gender:{
        type:String,
        required:true   
    }
  
})

 const Mentors= mongoose.model("mentors",mentorSchema)
 
module.exports= {Mentors}
