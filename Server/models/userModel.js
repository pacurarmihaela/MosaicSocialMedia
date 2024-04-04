import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//Defining the schema for the user model
const UserSchema = mongoose.Schema({
    //username of the user
    username: {
        type:String,
        required:true
    },
    //password of the user
    password:{
        type:String,
        required:true
    },
    //FirstName of the user
    firstname:{
        type:String,
        required:true
    },
    //LastName of the user
    lastname:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    // URL or path to the user's profile picture
    profilePicture: String,
    // URL or path to the user's cover picture
    coverPicture: String,
    // Short bio or description about the user
    about:String,
    // Location where the user lives
    livesIn: String,
    // Workplace or company where the user works
    worksAt: String,
    // Country where the user is located
    country:String,
    // Array containing IDs of users who follow the current user
    followers:[],
     // Array containing IDs of users whom the current user follows
    followings:[]
},{
      // Enabling timestamps to automatically add createdAt and updatedAt
    timestamps: true
})


// Method to compare entered password with the stored hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
}

// Middleware function to hash the password before saving it to the database
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
     // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Creating a model using the user schema
const UserModel = mongoose.model("User", UserSchema);
// Exporting the user model
export default UserModel;