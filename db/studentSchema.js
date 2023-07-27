const mongoose=require("mongoose")

const {ObjectId}=mongoose.Schema
const studentSchema= new mongoose.Schema({
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
    },
    
    mentorId:{
        type:ObjectId
       
       
         
    }
})

 const Students= mongoose.model("students",studentSchema)
 
module.exports= {Students}
