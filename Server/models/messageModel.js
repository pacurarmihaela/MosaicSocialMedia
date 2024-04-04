import mongoose from "mongoose";

//Defining the schema for the message model
const MessageSchema = new mongoose.Schema(
  {
    //ID of the chat the message belongs to
    chatId: {
      type: String,
    },
    //ID of the sender of the message
    senderId: {
      type: String,
    },
    //Text content of the message
    text: {
      type: String,
    },
  },
  {
     // Enabling timestamps to automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

//Creating a model using message Schema
const MessageModel = mongoose.model("Message", MessageSchema);

//Export the message model
export default MessageModel;