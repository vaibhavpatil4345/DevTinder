const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://vaibhavpatil4345:mYGNbn4IvV8mcR1O@ac-pab6rhu-shard-00-00.qr2dpgh.mongodb.net:27017,ac-pab6rhu-shard-00-01.qr2dpgh.mongodb.net:27017,ac-pab6rhu-shard-00-02.qr2dpgh.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-robjwh-shard-0&authSource=admin&appName=NamasteNode"
  );
};

module.exports = connectDB
