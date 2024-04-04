import express from "express";
import { createBoard, getMyBoards, getSingleBoard, updateBoard,deleteBoard, addPostToBoard,removePostFromBoard } from "../controllers/BoardController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import { extractBoardInfo } from "../middleware/BoardMiddleware.js";

//Create new router to define routes related to authentication
const router = express.Router();

//CREATE BOARD
router.post('/', createBoard);

// GET ALL BOARDS
router.get('/:userId/all',getMyBoards);

//GET SINGLE BOARD
//Retrieves details of a single board by Id, the extractBoardInfo middleware processes the board Details before reaching the controller function
router.get('/:boardId', extractBoardInfo,getSingleBoard);

//UPDATE BOARD
router.put("/:boardId", updateBoard);

//DELETE BOARD
router.delete("/:boardId", deleteBoard);

//ADD - REMOVE POSTS FROM BOARD
router.put('/:boardId/addPost', addPostToBoard);
router.put('/:boardId/removePost', removePostFromBoard);

export default router;