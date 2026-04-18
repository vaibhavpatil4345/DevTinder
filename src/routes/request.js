const express = require("express");
const { userAuth } = require("../middlewares/auths");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

// post Send connection request APi
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //   Validations:
      const allowedStatusType = ["interested", "ignored"];
      if (!allowedStatusType.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid Status type" + status });
      }

      
    //   Validation to check if user present in DB or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "Invalid user, not found"});
      }

      // If there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already present" });
      }


      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  },
);

module.exports = requestRouter;
