
const mongoose =require("mongoose")



 exports.dbConnection=()=>{
    
    try {
        const params={
            useNewUrlParser:true,
            UseUnifiedTopology:true,
        }
        const mongodburl=process.env.MONGODB_URL
        mongoose.connect(mongodburl,params)
        console.log('db connected successfully')
        
    } catch (error) {
        console.log("server side error",error)
        
    }
}
