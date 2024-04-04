import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import "./Chat.css";
import { useEffect } from "react";
import { userChats, getUsersNotInChat, createChat } from "../../api/ChatRequest";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const  user  = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [usersNotInChat, setUsersNotInChat] = useState([]);


  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
       
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    const fetchUsersNotInChat = async () => {
      try {
        const response = await getUsersNotInChat(user._id);
        setUsersNotInChat(response.data);
      } catch (error) {
        console.error("Failed to fetch users not in chat:", error);
      }
    };
  
    if (user._id) {
      fetchUsersNotInChat();
    }
  }, [user._id]);
  


  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    console.log(user._id + " userId");

    return () => {
      socket.current.disconnect();
    };
  }, [user._id]);


  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const initiateChat = async (userNotInChat) => {
    try {
      const chatData = {
        senderId: user._id,
        receiverId: userNotInChat._id,
      };
      const response = await createChat(chatData);
      // Update your state or Redux store as needed, possibly fetching chats again or directly adding the new chat
      setCurrentChat(response.data);
    } catch (error) {
      console.error("Failed to initiate chat:", error);
    }
  };
  

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
         <div className="Chat-list">
          <div className="ExistingChatList">

            {chats.length>0 ? (
              chats.map((chat) => (
                <div key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
                >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                  />
              </div>
            ))
            ) : (
              <div>
                No chats yet. start a new Conversation
              </div>
            )
          }
          </div>
          </div>

  <div className="NewConversations">
  <h3>Start New Conversations</h3>
  <div className="UserListContainer">

  {usersNotInChat.length > 0 ? (
    usersNotInChat.map((userNotInChat) => (
      <div key={userNotInChat._id} onClick={() => initiateChat(userNotInChat)} className="chatUserList">
      {userNotInChat.username}
      </div>
    ))
    ) : (
      <p>No users available to start a new chat.</p>
      )}
      </div>
</div>

        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;