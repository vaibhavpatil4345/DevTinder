const express=require('express')

const app=express()

app.get("/user",(req,res)=>{
    res.send('This is get call')
})

// app.post("/user",(req,res)=>{
//     console.log(req.query)
//     res.send('This is post call')
// })

app.post("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send('This is post call')
})




app.delete("/user",()=>{
    res.send('This is delete call')
})


app.use("/test",(req,res)=>{
 res.send('hello from node js')
})

app.use("/",(req,res)=>{
    res.send('This is first route')
})

app.listen(3000,()=>{
    console.log('server has been listening on port 3000')
})
 