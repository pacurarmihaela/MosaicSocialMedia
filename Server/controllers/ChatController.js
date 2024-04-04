import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";

/*
Creates a chat session between 2 users if it doesn t already exists
If a chat session with the specified members exists, it returns the existing chat session
*/
export const createChat = async (req, res) => {
  try {
    // check is a chat with given members already exists
    let chat = await ChatModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    //If it doesn't exist, create a new chat session
    if (!chat) {
      const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
      });
      chat = await newChat.save();
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};

/*
 Retrieves all chat sessions a user is part of
*/

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Find a chat session between 2 specific users
export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

// Retrieves all users who are not currently in a chat session with the current user
export const usersNotInChatWithCurrentUser = async (req, res) => {
  try {
      // Fetch all chats where the current user is a member
      const chats = await ChatModel.find({
          members: { $in: [req.params.userId] },
      });

      // Extract member IDs from these chats
      let memberIds = chats.reduce((acc, chat) => {
          acc.push(...chat.members);
          return acc;
      }, []);

      // Remove duplicates and the current user's ID
      memberIds = [...new Set(memberIds)].filter(id => id !== req.params.userId);

      // Fetch users that are  not in these chats
      const users = await UserModel.find({
          _id: { $nin: memberIds },
      });

      res.status(200).json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};