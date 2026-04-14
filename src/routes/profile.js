const express=require("express")
const { userAuth } = require("../middlewares/auths")

const profileRouter=express.Router()

// profile
profileRouter.get("/profile",userAuth, async(req,res)=>{
  try{
const user= req.user
 res.send(user)
  }catch(err){
    res.send("Authentication is failed...")
  }
})

module.exports= profileRouter;