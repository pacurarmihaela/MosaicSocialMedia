import BoardModel from "../models/boardModel.js";
import PostModel from "../models/postModel.js";


//Creates a new board with the provided information from the request body
export const createBoard = async(req,res) => {
   const newBoard = new BoardModel(req.body);
    try{
        await newBoard.save();

        res.status(201).json(newBoard);

    }catch(error){
        res.status(500).json({message: "Failed to create the board", error:error.message});
    }
}

//GET ALL
//Retrieves all boards created by a specific user
export const getMyBoards = async(req,res) => {
   const {userId} = req.params;
   console.log(userId);
  try{
    const boards = await BoardModel.find({createdBy: userId}).sort({updatedAt:-1});
    res.status(200).json(boards);
  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }
}




//Get single board, including all posts associated with it
export const getSingleBoard = async (req, res) => {
  try {
      const board = req.board;
      if (!board) {
          throw new Error("No posts found");
      }
      res.status(200).json(board);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


//Update board witht he data provided in the request body
export const updateBoard = async(req,res)=>{
  const {boardId} = req.params;
  const {userId, ...updateData} = req.body;

  try{
    const board = await BoardModel.findById(boardId);
    if(board.createdBy.toString() === userId){
      const updatedBoard = await BoardModel.findByIdAndUpdate(boardId, {$set: updateData}, {new: true});
      res.status(200).json(updatedBoard);
    } else {
      res.status(403).json("Authentication failed");
    }
  }catch(error){
      res.status(500).json({message: "Failed to update board", error});
  }
}

//Delete board identified by boardId in the request parameters
export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const {userId} = req.body;

  try {
    const board = await BoardModel.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Check if the authenticated user is the creator of the board
    if (board.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this board' });
    }

    await board.deleteOne();
    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete board', error: error.message });
  }
};
//Add a post to a board
export const addPostToBoard = async(req,res)=>{
  const {boardId} = req.params;
  const {postId} = req.body;
console.log(boardId);
  try{
    const board = await BoardModel.findById(boardId);
    const post = await PostModel.findById(postId);

    if(!board){
      return res.status(404).json({ message: "Board not found" });
    }else{
      if(!post){
        return res.status(404).json({ message: "Post not found" });
      }else{
        if (!board.posts.includes(postId)) {
          await board.updateOne({ $push: { posts: postId } });
          return res.status(200).json({ message: "Post added to board" });
        } else {
          return res.status(400).json({ message: "Post already exists on board" });
        }
      }
    }
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}

//Removes post from a board
export const removePostFromBoard = async(req,res)=>{
  const {boardId} = req.params;
  const {postId} = req.body;

  console.log(postId);

  try{
    const board = await BoardModel.findById(boardId);
    const post = await PostModel.findById(postId);

    if(!board){
      return res.status(404).json({ message: "Board not found" });
    }else{
      if(!post){
        return res.status(404).json({ message: "Post not found" });
      }else{
        if (board.posts.includes(postId)) {
          await board.updateOne({ $pull: { posts: postId } });
          return res.status(200).json({ message: "Post removed from board" });
        } else {
          return res.status(400).json({ message: "Post does not exist on board" });
      }
    }
    }
  }catch(error){
    res.status(500).json({ message: "Internal server error" });
  }
}