const express=require('express')
const {adminAuth,userAuth}=require('./middlewares/auths')

const app=express()
// USE OF MIDDLEWARE IN AUTHORIZATION
app.use("/admin",adminAuth)

app.get("/user",userAuth,(req,res,next)=>{
    res.send("This user data user can access")
    next()
})
// auth middleware will not work here
app.post("/user/login",(req,res,next)=>{
    res.send("user has been logged in....!")
    next()
})

app.get("/admin",(req,res,next)=>{
    res.send("This user data admin can access")
    next()
})

app.get("/admin/manager",(req,res,next)=>{
    console.log("This user data manager can access")
})

app.listen(3000,()=>{
    console.log('server has been listening on port 3000')
})
 