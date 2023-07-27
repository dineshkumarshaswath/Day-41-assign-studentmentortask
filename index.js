const express =require("express")
const { dbConnection } = require("./db")
const assignRouter = require("./Routers/assignrouter")
const cors=require('cors')
const dotenv=require("dotenv")








const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()


dbConnection()


const PORT =process.env.PORT

app.get("/",(req,res)=>{
    res.send("server conditon is fine")
})

app.use("/api",assignRouter)

app.listen(PORT,()=>console.log(`server running in localhost:${PORT}`))




