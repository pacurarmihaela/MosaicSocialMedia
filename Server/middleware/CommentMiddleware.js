import UserModel from "../models/userModel.js";
import CommentModel from "../models/commentModel.js";

/*
MIDDLEWARE to enrich comments with user Info
Fetches comments for a post Id, 
then enriches each comment with detailed information about user who left the comment(username, profilePicture, first name)

*/


export const extractUserInfo = async (req, res, next) => {
    try {
        //Extract the post Id from request parameters
        const postId = req.params.postId;

        //Fetch all comments associated withh the specified postId,
        // Using .lean() optimizes the query by returning plain Javascript object instead of Mongoose document
        let comments = await CommentModel.find({ postId }).lean(); 

        //Use Promise.all to async fetch user infromation for the author of each comment
        // enrich the comment objects with the user information
        
        comments = await Promise.all(comments.map(async comment => {
            
            //If the user is found, return an enriched comment object that includes "authorInfo"
            const user = await UserModel.findById(comment.author);
            if (user) {
                return {
                    ...comment, // Spread existing comment properties
                    authorInfo: { // Add new authorInfo property
                        username: user.username,
                        profilePicture: user.profilePicture,
                        firstName: user.firstname,
                       
                    }
                };
            } else {
                return comment; // In case the user isn't found, return the comment unmodified
            }
        }));

        //Attach the enriched comments array to the request object
        req.comments = comments;
        next();
    } catch (error) {
        //Log and return an error respose if any partof the process fails
        console.error("Error enriching comments with user info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
