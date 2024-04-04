import UserModel from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//get single user
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (user) {
          //Remove password from user data, security reason
            const { password, ...otherDetails } = user._doc;

            // Append enhanced followers and followings to the user object
            const userDetailsWithFollowers = {
                ...otherDetails,
                followersDetails: req.enhancedFollowers,
                followingsDetails: req.enhancedFollowings
            };

            res.status(200).json(userDetailsWithFollowers);
        } else {
            res.status(404).json("No user found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


//get all users
export const getAllUsers = async(req,res)=>{
    try{
      //find all users
        let users = await UserModel.find();
        // remove password from each user data, security reason
        users = users.map((user)=> {
            const {password, ...otherDetails} = user._doc;
            return otherDetails;
        })
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}

// Update a User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { _id, currentUserAdmin, password } = req.body;
    
    if (id === _id) {
      try {
        // if password provided, hash it
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        // find user by Id and update it with new data
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        // generate JWT token with the updated user info
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        console.log({user, token})
        res.status(200).json({user, token});
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(403)
        .json("Access Denied! You can update only your own Account.");
    }
  };
  

//DELETE USER
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

//FOLLOW USER
export const followUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;
    console.log(id,_id);
    if(_id == id){
      //forbidden to user to follow themselves
        res.status(403).json("Action forbidden!");
    }else{
      // find the user to follow and the current user
        try{
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(_id);
          
          if(!followUser.followers.includes(_id)){
            //if current usere is not already following the user, update the followers list
            await followUser.updateOne({$push: {followers: _id}});
            await followingUser.updateOne({$push: {followings: id}});
            //send success response
            res.status(200).json("User followed!");
          }else{
            //Send forbidden response if user is already following
            res.status(403).json("You are already following this account");
          }
        }catch(err){
          //send error if theres any issue
            console.log(err);
            res.status(500).json(err);
        }
    }
}

//UNFOLLOW USER
export const unfollowUser = async(req,res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if(_id == id){
      //sending forbidden response if user is trying to unfollow themselves
        res.status(403).json("Action forbidden!");
    }else{
        try{
          // find the user to unfollow and the current user
            const unfollowUser = await UserModel.findById(id);
            const unfollowingUser = await UserModel.findById(_id);

            if(unfollowUser.followers.includes(_id)){
              //If the current user is following the user, update followers list
                await unfollowUser.updateOne({$pull : {followers: _id}})
                await unfollowingUser.updateOne({$pull: {followings: id}})
                //sending success response
                res.status(200).json("Unfollowed Sucessfully!");
            }else{
              //sending forbiggen response if user is not following
                res.statu(403).json("You are not following this account!");
            }
        }catch(err){
          //sending error response if theres any issue
            res.status(500).json(err);
        }
    }
};


//Get explore accounts(users not followed by current user)
export const getExploreAccounts = async (req, res) => {
  const userId = req.params.id; // ID of the current user
  try {
    //find current user
    const currentUser = await UserModel.findById(userId);
    if (!currentUser) {
      //if user not found send the User Not found response
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch users that the current user is not following
    const users = await UserModel.find({
      _id: { $nin: [...currentUser.followings, userId] }, // Exclude current user and their followings
    });
    
    //Sending success response with the list of users to explore
    res.json(users);
  } catch (error) {
    //Sending error response if theres no issue
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
