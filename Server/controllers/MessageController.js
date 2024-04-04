import MessageModel from "../models/messageModel.js";


//Add a new message to the chat
export const addMessage = async (req, res) => {
  //destructure chatId, senderId, and the text from the request body
  const { chatId, senderId, text } = req.body;

  // create a new message instance with the provided data
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    //saving the message to the database
    const result = await message.save();
    //sending a success response with the saved message data
    res.status(200).json(result);
  } catch (error) {
    //send an error if theres an issue with saving the message
    res.status(500).json(error);
  }
};

//Get messages from the chat
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};