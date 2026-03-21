const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vaibhavpatil4345:NwjQkSJNR5tzMJ4X@namastenode.qr2dpgh.mongodb.net/devTinder",
  );
};

module.exports=connectDB
