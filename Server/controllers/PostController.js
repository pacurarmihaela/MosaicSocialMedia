import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose, { mongo } from "mongoose";


//create post
export const createPost = async(req,res)=>{
   const newPost = new PostModel(req.body);

   try{
    await newPost.save();
    res.status(200).json(newPost);
   }catch(err){
    res.status(500).json(err);
   }
}

//get a post
export const getPost = async (req, res) => {
    try {

          // Checking if post data is available in the request (enriched by middleware)
        if (!req.post) {        
            return;
        }
        // Post Object constructing with the author information
        const postWithAuthorInfo = {
            ...req.post.toObject(), // Convert Mongoose model instance to javascript plain object
            authorInfo: req.postAuthorInfo,
        };
        res.status(200).json(postWithAuthorInfo);
    } catch (err) {
        console.error("Error in getPost:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

//Get all posts of a user
export const getAllPosts = async(req,res)=>{
    const userId = req.params.id;

    try{
        //Finding all posts of the specified user and sorting them  by createdAt timestamp
        const posts = await PostModel.find({userId: userId}).sort({createdAt:-1});

        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//Update a post
export const updatePost = async(req,res)=>{
    const postId = req.params.id;
    const {userId} = req.body;

    try{
     const post = await PostModel.findById(postId);
     if(post.userId === userId){
        await post.updateOne({$set: req.body});
        res.status(200).json("Post Updated!");
     }else{
        res.status(403).json("Authentication failed");
     }
    }catch(err){
        res.status(500).json(err);
    }
}

//DELETE A POST
export const deletePost = async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;

    try{
        const post = await PostModel.findById(id);
        if(post.userId == userId){
            await post.deleteOne();
            res.status(200).json("Post Deleted");
        }else{
            res.status(403).json("Action forbidden");
        }
        
    }catch(err){
        res.status(500).json(err);
    }
}

//LIKE & DISLIKE POST
export const likePost = async (req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;

    try{
        const post = await PostModel.findById(id);
        if(post.likes.includes(userId)){
            await post.updateOne({ $pull: {likes: userId}});
            res.status(200).json("Post Disliked");
        }else{
            await post.updateOne({$push : {likes:userId}});
            res.status(200).json("Post Liked!");
        }
    }catch(err){
        res.status(500).json(err);
    }
}

//Get TIMELINE POSTS
export const getTimeLinePosts = async(req,res) => {
    const userId = req.params.id;

    try{
        //Find posts of the current user
        const currentUserPosts = await PostModel.find({userId: userId});
        //Finding posts of users that are in the following list, sort them by timestamp
        const followingPosts = await UserModel.aggregate([
            {

                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
                {
                    $lookup : {
                        from: "posts",
                        localField: "followings",
                        foreignField: "userId",
                        as: "followingPosts",
                    }
                },
                {
                    $project: {
                        followingPosts:1,
                        _id:0,
                    },
            },
        ]);
        //Merging and sorting the current users posts and following users post by timestamp
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>{
            return new Date(b.createdAt) - new Date (a.createdAt);
        }))
    }catch(err){
        res.status(500).json(err);
    }
}