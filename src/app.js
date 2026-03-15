const express=require('express')

const app=express()

// app.get("/user",(req,res)=>{
//     res.send('This is get call')
// })

// app.post("/user",(req,res)=>{
//     console.log(req.query)
//     res.send('This is post call')
// })

// app.post("/user/:userId",(req,res)=>{
//     console.log(req.params)
//     res.send('This is post call')
// })

// app.delete("/user",()=>{
//     res.send('This is delete call')
// })

// If we do not send anything here in res.send(), request will hang here.
app.use("/test",(req,res)=>{
//  res.send('hello from node js')
})
// you can send as much as routes but any of the routes must have res.send(). Also code execution will be depend on where you are placing next()
app.use("/user",[(req,res,next)=>{
    // res.send('User response 1')
    console.log('Heyyy, this is user resp 1')
    next();
},
(req,res,next)=>{
    // res.send('User response 2')
    console.log('Heyyy, this is user resp 2')
    next();
},
(req,res,next)=>{
    // res.send('User response 3')
    console.log('Heyyy, this is user resp 3')
    next();
},
(req,res,next)=>{
    res.send('User response 4')
    console.log('Heyyy, this is user resp 4')
    // next();
}])

app.use("/",(req,res)=>{
    res.send('This is first route')
})

app.listen(3000,()=>{
    console.log('server has been listening on port 3000')
})
 