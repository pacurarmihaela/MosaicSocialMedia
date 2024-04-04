import {createPost, deletePost, getPost,getAllPosts, getTimeLinePosts, likePost, updatePost} from "../controllers/PostController.js";
import  {extractPostAuthorInfo} from "../middleware/PostMiddleware.js";
import express from "express";

const router = express.Router();

//CREATE A POST
router.post("/", createPost);

//GET SINGLE POST
//ExtractPostAuthorInfo provides details for the Controllers
router.get("/:id",extractPostAuthorInfo,getPost);

//GET ALL POSTS
router.get("/:id/all", getAllPosts);

//UPDATE POSTS
router.put("/:id/desc", updatePost);

//DELETTE POST
router.delete("/:id", deletePost);

//LIKE A POST
router.put("/:id/like", likePost);

//GET TIMELINE OF POSTS
router.get("/:id/timeline", getTimeLinePosts);

export default router;
