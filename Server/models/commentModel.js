import mongoose from "mongoose";

//Defining the schema for the comment model
const CommentSchema = mongoose.Schema({
    //Id of the post the comment belongs to, referencing the Post Model
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        require:true
        },
    // Id of the user authored the comment, referencing the User Model
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    // Optional field referencing the parent comment
    parentComment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    //Array of IDs referencing replies to the comment
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    //Text content of the comment, which is requried
    text:{
        type:String,
        required:true
    },
      // Timestamp for the creation of the comment, with default value set to current date/time
    createdAt:{
        type:Date,
        default: Date.now
    }
}, {
      // Enabling timestamps to automatically add createdAt and updatedAt fields
    timestamps: true
});

//Creating a model using comment schema
const CommentModel = mongoose.model("Comment", CommentSchema);

//export comment model
export default CommentModel;