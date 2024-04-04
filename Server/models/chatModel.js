import mongoose from "mongoose";

//Define schema for the chat model
const ChatSchema = new mongoose.Schema(
  {
    //Array containing the IDs of the memebers participating in te chat
    members: {
      type: Array,
    },
  },
  { // Enabling timestamps to automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);
// Creating a model using the chat schema
const ChatModel = mongoose.model("Chat", ChatSchema);

//Export Chat Model
export default ChatModel;