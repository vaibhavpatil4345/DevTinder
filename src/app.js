const express=require('express')

const app=express()
// HANDLE ERROR WITH MIDDLEWARE OR WITH TRY CATCH METHOD. BUT WHILE FIRING ERROR KEEP THE SEQUEBNCE OF CODE IN MIND.
// GIVE PRIORITY TO TRY AND CATCH METHOD
app.get("/getUserData",(req,res)=>{
    // Try catch method
    try{
        throw new Error ('error Thrown')
    res.send("User data sent...!")
    }
    catch(err){
        res.status(500).send('Something went wrong...!')
    }
})
// Middleware for Error: Handle error here
app.use("/",(err,req,res,next)=>{
    if (err){
        // Log Error Message 
        res.status(500).send('Something went wrong...!')
    }
})

app.listen(3000,()=>{
    console.log('server has been listening on port 3000')
})
 