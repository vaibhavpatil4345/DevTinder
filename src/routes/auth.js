const express=require("express")
const bcrypt=require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");

const authRouter=express.Router()

// Dynamic Signup
authRouter.post("/signup", async (req, res) => { 
  try {
    // Validate request
    validateSignupData(req)
     
    // Encrypt password
    const {firstName,lastName,emailId,password}=req.body
    const passwordHash=await bcrypt.hash(password,10)

    // Create new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
    });
    await user.save();
    res.send("User Added Successfully...");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

// Login
authRouter.post("/login",async (req,res)=>{
  try{
    const {emailId,password}=req.body
    const user= await User.findOne({emailId:emailId})
    if (!user){
      throw new Error("User is not valid")
    }
    const isPasswordValid= await user.validatePassword(password)
    if (isPasswordValid){
      // create a jwt token
      const token=await user.getJWT()
      // wrap tocken in cookes and send cookies to client:
      res.cookie("token", token, {expires: new Date(Date.now() + 2 * 3600000)})
      res.send("User login successful")
    }else{
      throw new Error ("Invalid password")
    }
  }catch(err){
    res.status(400).send("Error:" + err.message);
  }
})

module.exports=authRouter