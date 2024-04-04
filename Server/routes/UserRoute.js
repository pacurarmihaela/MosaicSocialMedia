import express from "express";
import { deleteUser, getAllUsers,getUser,updateUser, followUser, unfollowUser, getExploreAccounts } from "../controllers/UserController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import { enhanceFollowerInfo } from "../middleware/FollowMiddleware.js";

const router = express.Router();

//GET ALL USERS
router.get('/', getAllUsers);

//GET SINGLE USER
//EnhanceFollowe Info provides details to the getUser controller
router.get("/:id",enhanceFollowerInfo,getUser);

//UPDATE USER
router.put("/:id/edit",updateUser);

//DELETE USER
router.delete("/:id",  deleteUser);

//FOLLOW USER
router.put("/:id/follow", followUser);

//UNFOLLOW USER
router.put("/:id/unfollow", unfollowUser);

//EXPLORE ACCOUNTS THAT ARE NOT IN THE FOLLOWING LIST
router.get("/exploreAccounts/:id", getExploreAccounts);

export default router;