const express=require("express")
const { userAuth } = require("../middlewares/auths")

const requestRouter=express.Router()

// post Send connection request APi
requestRouter.post("/sendConnectionRequest",userAuth, async (req,res)=>{
const user=req.user
  res.send(user.firstName+" has sent connection request ")
})

module.exports= requestRouter;