const express = require("express");
const connectDB = require("./config/databse");
const User=require("./models/user")

const app = express();
// middleware to convert json data to JS object
app.use(express.json())

// Dynamic Signup
app.post("/signup",async (req,res)=>{
  // console.log(req.body)
    // Create new instance of User model
    const user= new User(req.body)
    try {
            await user.save()
    res.send("User Added Successfully...")
    }catch(err){
        res.status(400).send("Error:",err.message)
    }
})

// Get user by email
app.get("/user", async(req,res)=>{
  const userEmail=req.body.emailId
  try{
    const users= await User.find({emailId: userEmail})
    if (users.length===0){
      res.status(400).send("User not found...")
    }else {
        res.send(users)
    }
  }catch(err){
    res.status(400).send("something went wrong....")
  }  
})

// Feed API, get/feed : Get all the users from API
app.get("/feed",async (req,res)=>{

  try{
    const users= await User.find({})
    res.send(users)

  }catch(err){
    res.status(400).send("users not found....")
  }
})

// DELETE API for user
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId
  try{
      const user= await User.findByIdAndDelete(userId)
      res.send("user deleted successfully....")
  }catch(err){
    res.status(400).send("user not found...")
  }
})


// Update api to update user info

app.patch("/user",async (req,res)=>{
const userId=req.body.userId
const emailId=req.body.userId
const data=req.body
  try{
  //  const user= await User.findByIdAndUpdate({_id: userId}, data, {returnDocument : "after"})
   const user= await User.findByIdAndUpdate(emailId, data, {returnDocument : "after"})
   console.log("user",user)
   res.send("user updated successfully...")

  }catch(err){
    res.status(400).send("user not found")
  }
})





connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server has been listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected...");
  });
