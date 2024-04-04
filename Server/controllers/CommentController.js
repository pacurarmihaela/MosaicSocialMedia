import CommentModel from "../models/commentModel.js";

/*
Creates a new comment associated with the post
Save a new comment in the database using info provided in the request body
Including the post Id, comment text, authors userId
*/
export const createComment = async (req, res) => {
    const { postId, text,authorId } = req.body;
  
    try {
        const newComment = new CommentModel({
            postId,
            author: authorId, // Assign the authenticated user's ID to the comment's author field
            text
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Failed to create comment", error: error.message });
    }
}

/*
    Retrieves all comments for a post
    Function takes in consideration that the comments are already been enriched by the middleware, it directly uses the enriched comments attached to the request object
*/

export const getAllComments = async(req, res) => {
    // Use the enriched comments from the middleware
    const comments = req.comments; // This is now enriched with authorInfo by the middleware
    try {
        if (!comments) {
            throw new Error('No comments found');
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch comments", error: error.message});
    }
};


//Delete Comment
//Validate that the requestin user is the author of the comment and the comment belongs to the specified post before deletinf the comment from the database
export const deleteComment = async(req,res)=>{
    const commentId = req.params.commentId;
    const { userId,postId} = req.body;


    try{
        const comment = await CommentModel.findById(commentId);

        if(comment && comment.author == userId && comment.postId == postId){
            await comment.deleteOne();
            res.status(200).json("Comment Deleted Successfully!");
        }else{
            return res.status(404).json({message: "Comment not found"});
        }
    }catch(error){
        res.status(500).json({message: "Failed to delete comment", error:error});
    }
}

