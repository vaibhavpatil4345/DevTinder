const express=require("express")
const { userAuth } = require("../middlewares/auths")
const { validateEditProfileData } = require("../utils/validation")

const profileRouter=express.Router()

// profile
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
  try{
const user= req.user
 res.send(user)
  }catch(err){
    res.send("Authentication is failed...")
  }
})

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error ("Invalid edit request")
    }

    const loggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
   await loggedInUser.save()
   res.json({
    message:`${loggedInUser.firstName} Profile updated successfully`,
    data:loggedInUser
   })

  }catch(err){
    res.status(400).send(err + "something went wrong...");
  }
})

module.exports= profileRouter;