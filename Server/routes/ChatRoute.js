import express from 'express'
import { createChat, findChat, userChats,usersNotInChatWithCurrentUser } from '../controllers/ChatController.js';
const router = express.Router()

// CREATE CHAT
//Route for creating Chat session between users
router.post('/', createChat);

//GET ALL CHATS
//Retrieves all chat sessions of a specific user
router.get('/:userId', userChats);
//Retrieves an existing chat session between 2 users

//GET CHAT BETWEEN 2 USERS
router.get('/find/:firstId/:secondId', findChat);
//Retrieves the users dthat do not have an existing chat with the current user

//GET USERS THAT DONT HAVE AN EXISTING CHAT
router.get('/notInChat/:userId', usersNotInChatWithCurrentUser);

export default router