const express = require("express");
const bcrypt=require("bcrypt")
const connectDB = require("./config/databse");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const {userAuth}=require('./middlewares/auths')

const app = express();
// middleware to convert json data to JS object
app.use(express.json());
app.use(cookieParser())

// Dynamic Signup
app.post("/signup", async (req, res) => { 
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

app.post("/login",async (req,res)=>{
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

app.get("/profile",userAuth, async(req,res)=>{
  try{
const user= req.user
 res.send(user)
  }catch(err){
    res.send("Authentication is failed...")
  }
})

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("User not found...");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong....");
  }
});

// Feed API, get/feed : Get all the users from API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("users not found....");
  }
});

// DELETE API for user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully....");
  } catch (err) {
    res.status(400).send("user not found...");
  }
});

// Update api to update user info
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  // const emailId=req.body.userId
  const data = req.body;
  try {
    const ALLOWED_UPDATE = ["photoUrl", "gender", "age", "skills", "about"];
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k),
    );
    if (!isUpdatedAllowed) {
      throw new Error("Updates not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    // update the user using emailId
    //  const user= await User.findByIdAndUpdate(emailId, data, {returnDocument : "after"})
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully...");
  } catch (err) {
    res.status(400).send("user not found");
  }
});

// post Send connection request APi
app.post("/sendConnectionRequest",userAuth, async (req,res)=>{
const user=req.user
  res.send(user.firstName+" has sent connection request ")

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
