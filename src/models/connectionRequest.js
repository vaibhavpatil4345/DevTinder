const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user", /* referrence to the user collection */  
        required:true
    },
    toUserId:{
          type:mongoose.Schema.Types.ObjectId,
           ref: "user", /* referrence to the user collection */  
          required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required:true
    }
},{
    timestamps: true
})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest=this;
    // Check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("cannot send connection request to yourself")
    }
    next;
})

// compound indexing
connectionRequestSchema.index({fromUserId:1, toUserId:1})

const ConnectionRequestModel=new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports= ConnectionRequestModel