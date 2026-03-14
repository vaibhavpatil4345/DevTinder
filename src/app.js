const express=require('express')

const app=express()

app.use("/test",(req,resp)=>{
 resp.send('hello from node js')
})

app.listen(3000,()=>{
    console.log('server has been listening on port 3000')
})