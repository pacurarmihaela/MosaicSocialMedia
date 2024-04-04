import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";

/* 
Middleware to enrich post object with its author information
Retrieve the post absed on the id, provided in the request parameters
If post exists, fetch the author of the post based on the associated userId
Authors details such as username, firstname, lastname, profile pircture are attached to te request object  
*/
export const extractPostAuthorInfo = async (req, res, next) => {
    try {
        //extract post id from requesr parameters
        const postId = req.params.id;
        //fetch the post using the extracted id 
        const post = await PostModel.findById(postId);
        if (post) {
            //fetch the author user details, using the userId from the post object
            const user = await UserModel.findById(post.userId);
            if (user) {
                //attach the author s information to the request object  if te user was found
                req.postAuthorInfo = {
                    username: user.username,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    profilePicture: user.profilePicture,
                };
            } else {
                req.postAuthorInfo = null; // Author not found
            }
            //Attached the fetch post to the request object
            req.post = post; 
        } else {
            //Return a 404 when Post was Not Found
            return res.status(404).json({ error: "Post not found" });
        }
        next();
    } catch (error) {
        //log and return 500 Internal Server error if any of the process fails
        console.error("Error extracting post author info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
