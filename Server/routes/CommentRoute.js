import express from "express";
import { createComment, deleteComment, getAllComments } from "../controllers/CommentController.js";
import {   extractUserInfo } from "../middleware/CommentMiddleware.js";
const router = express.Router();

//CREATE COMMENT
router.post('/', createComment);

//GET ALL COMMENTS
//extractUserInfo Middleware provides new details tot the controller before its retrieved 
router.get('/:postId',extractUserInfo, getAllComments);

//DELETE COMMENT
router.delete('/:commentId', deleteComment);


export default router;
