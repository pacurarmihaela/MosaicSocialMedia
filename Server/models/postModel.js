import mongoose from "mongoose";

//Defining the schema for the post model
const PostSchema = mongoose.Schema({
    //ID of the user who created the post
    userId:{
        type:String,
        required:true
    },
    //Description of the post
    desc: String,
    //Array containing the IDs of users who liked the post
    likes: [],
    //URL or path to the image associated with the post
    image:String
},{
    //Enabling timestamps to automatically add createdAt and updatedAt
    timestamps: true
})

//Creating a model using the post Schema
const PostModel = mongoose.model("Post", PostSchema);

//Export the post model
export default PostModel;