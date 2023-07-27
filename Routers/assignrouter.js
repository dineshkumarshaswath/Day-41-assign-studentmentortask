
const express=require("express")
const { Mentors } = require("../db/mentorSchema")
const { Students } = require("../db/studentSchema")


const mongoose=require("mongoose")
const router=express.Router()


// 1.Write API to create Mentor

router.post("/mentor",async(req,res)=>{
    try {
        const newmentor= await Mentors.create({...req.body})
        if(!newmentor){
            return res.status(400).json({message:"The newmentor didnot created successfully"})
        }
        return res.status(200).json({message:"successfully created",newmentor})
    } catch (error) {
        
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
   
})

// 2.Write API to create Student

router.post("/student",async(req,res)=>{
    try {
      
        const newstudent= await Students.create({...req.body})
        if(!newstudent){
            return res.status(400).json({message:"The newstudent didnot created successfully"})
        }
        return res.status(200).json({message:"successfully created",newstudent})
    } catch (error) {
        
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
   
})

//3. Write API to Assign a student to Mentor

//Select one mentor and Add multiple Student 

router.put("/student/:mentorid/addstudents",async(req,res)=>{
    try {
        
        const { mentorid}=req.params
        const {studentsid}= req.body
         const mentorId= await Mentors.findById({_id:mentorid}).select("name")
       

            const addmanystudent=  await Students .updateMany({_id:{$in:studentsid}},
                {$set:{mentorId:mentorId}},
                {multi:true})

                if(!addmanystudent){
                    return res.status(400).json({message:"the upmateamny function didnot add the students data"})
                }
            return res.status(200).json({message:"successfully created"})
        
            }catch (error) {
        
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
   
})



//4. Write API to Assign or Change Mentor for particular Student

router.put("/student/:id/:mentorid/",async(req,res)=>{
    try {
        
        const { id,mentorid}=req.params
         const mentorId= await Mentors.find({_id:mentorid})
       
            const newstudent= await Students.
            findByIdAndUpdate({_id:req.params.id},
            {$set:req.body,mentorId},{new:true})

            if(!newstudent){
                return res.status(400).json({message:"the newstudent didnot update successfully"})
            }
            return res.status(200).json({message:"successfully created",newstudent})
        
        
     
            }catch (error) {
        
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
   
})


//5.Write API to show all students for a particular mentor

router.get("/getmentor/:id",async(req,res)=>{

    try {
           const allstudent=await Mentors.aggregate(
            [{
                $match:{
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
              {
                $lookup:{
                    from:"students",
                    localField:"_id",
                    foreignField:"mentorId",
                    as:"student"
                }
            }])
            if(!allstudent){
                return res.status(400).json({message:"the data didnot successfully loaded"})
            }
            return res.status(200).json({message:"successfully created",allstudent})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
   
})


//6.  Write an API to show the previously assigned mentor for a particular student.

router.get("/student/previousmentor/:studentid",async(req,res)=>{
    try {
        const {studentid}=req.params
        const studentmentor=await Students.findById({_id:studentid}).populate("mentorId","id,name")
  
        const previousmentor=studentmentor.mentorId? studentmentor.mentorId.name:"There is no mentor assigned for this student"
           console.log(previousmentor)
           if(!previousmentor){
           
                return res.status(400).json({message:"the data is not successfully loaded"})
           }
           return res.status(200).json({message:"successfully got the data",studentmentor})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal server error"})
    }
  
})



const assignRouter=router 

module.exports = assignRouter