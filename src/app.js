const express = require("express");
const connectDB = require("./config/databse");
const User = require("./models/user");
const cookieParser = require("cookie-parser")
const app = express();
const cors=require("cors")
require('dotenv').config()
require("./utils/cronjob")
const http = require("http");
// middleware to convert json data to JS object
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

// Express Router
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

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

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log("server has been listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected...",err);
  });
