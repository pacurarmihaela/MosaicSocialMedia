import express from "express";
import { loginUser, registerUser,logoutUser } from "../controllers/AuthController.js";

//Create new router to define routes related to authentication
const router = express.Router();

//Route for registering a new user, the controller will handle the business logic 
router.post('/register', registerUser);
//Route for login user
router.post('/login',loginUser);
//Route for logout
router.post('/logout', logoutUser);

export default router;