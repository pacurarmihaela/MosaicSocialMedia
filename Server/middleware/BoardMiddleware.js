
import boardModel from "../models/boardModel.js";
import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";

/*
 Middleware to enhance BOARD with details that contains Posts and User information

 Middleware responsible to fetch a board from the id provided, 
 then enriches with information about the post and user who created the post, 
 then attaches the information to the req object
*/
export const extractBoardInfo = async (req, res, next) => {
    try {
        //extract boardId from request parameters
        const { boardId } = req.params;

        // Fetch the board based on the boardId
        let board = await boardModel.findById(boardId).lean();

        //If the board does not exist, return 404 Not Found response
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        //For each postID in the BOARD, fetch the post and the user who created the post, enhance the post info wit user details( profile picture + username)
        const enhancedPosts = await Promise.all(board.posts.map(async postId => {
            const post = await PostModel.findById(postId).lean();
            if (!post) return null; //If post doesnt exist return null

            const user = await UserModel.findById(post.userId).lean();
            if (!user) return null; //If user doesn t exist return null

            //Return the enhanced post information including the user details
            return {
                ...post,
                userInfo: {
                    username: user.firstname,
                    profilePicture: user.profilePicture,
                }
            };
        }));

        //Filter out any null values from the array of enhanced posts
        const filteredPosts = enhancedPosts.filter(post => post !== null);

        // Attach the enhanced posts to the board object
        board.postInfo = filteredPosts;

        //Attach the enhanced board object to the request object
        req.board = board;
        next();
    } catch (error) {
        //Log any errors and return 500 Internal Server Error response
        console.error("Error enhancing board with post and user info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
