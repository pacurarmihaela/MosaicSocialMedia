// Require the socket.io library and initialize it on port 8800 with CORS settings to accept connections from "http://localhost:3000"
const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Initialize an array to keep track of active users
let activeUsers = [];

//Listen for new connections to the socket.io server
io.on("connection", (socket) => {
  // Event listener for adding a new user. Triggered when a user connects and sends their ID
  socket.on("new-user-add", (newUserId) => {
    // Check if the new user is alread in the activeUsers array to avoid duplicates
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      //If the user is not in the array, add them with their userId and socketId
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // Emit an event to all connected clients with the updated list of active users
    io.emit("get-users", activeUsers);
  });

  
  //Event listener for when a socket connection is disconnected
  socket.on("disconnect", () => {
    // Filter the activeUsers array to remove the disconnected user based on their socketId
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // Emit an event to all connected clients with the updated list of active users
    io.emit("get-users", activeUsers);
  });

  //Event listener for sending a message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    //Find the recipient in the activeUsers array by userId
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    //If the recipient is found,emit an event to their socketId with the message data.
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});