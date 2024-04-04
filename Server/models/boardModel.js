import mongoose, { mongo } from "mongoose";

//Defining schema for the board model
const BoardSchema = mongoose.Schema({
    //Name of the board
    name:{
        type:String,
        required:true
    },
    //Id of the user wo created the board, referencing the User Model
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    //Array of post IDs associated wit the board, referencing the Post Model
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    //Optional field for storing a picture associated with the board
    pictureBoard: String
},{
    //Enabling timestamps to  automatically add createdAt/updatedAt fields
    timestamps: true
});

//Create a unique index on name and createdBy fields
BoardSchema.index({name:1, createdBy:1}, {unique:true});

//Create model using te board schema
const BoardModel = mongoose.model("Board", BoardSchema);

//Export board model
export default BoardModel;