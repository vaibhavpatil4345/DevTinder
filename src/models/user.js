const mongoose = require("mongoose");
const validator= require("validator")

// Create Schema here
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength:5, maxLength:20 },
  lastName: { type: String },
  emailId: { type: String, required: true, unique: true, lowercase:true, trim: true, validate(value){
    if (!validator.isEmail(value)){
      throw new Error("invalid email address"+ value)
    }
  } 

   },
  password: { type: String, required: true,validate(value){
    if (!validator.isStrongPassword(value)){
      throw new Error("Password is not strong enough:"+ value)
    }
  } },
  age: { type: Number,min:18 },
  gender: { type: String, validate(value){
    if(!['male','female','other'].includes(value)){
      throw new Error ("Gender data is not valid")
    }
  }  },
  photoUrl: {type: String, default: "www.samplephoto.com"},
  about: {type: String, default: "This is a default desc of user"},
  skills: { type: [String]}
},{timestamps: true});
// Create User Model (here "user" is collection name)
const User = mongoose.model("user", userSchema);
module.exports = User;
