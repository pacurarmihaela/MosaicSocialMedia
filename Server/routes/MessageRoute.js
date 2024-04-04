import express from 'express';
import { addMessage, getMessages } from '../controllers/MessageController.js';

const router = express.Router();

//CREATE MESSAGE IN THE SESSION
router.post('/', addMessage);

//GET ALL MESSAGES FROM THE SESSIOn
router.get('/:chatId', getMessages);

export default router