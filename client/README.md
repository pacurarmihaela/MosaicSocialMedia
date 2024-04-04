# MOSAIC - Social Media App

## Description
MOSAIC is a social media platform designed to connect users through posts, comments, messages, and more. It offers an intuitive user interface with a wide range of features including user authentication, post sharing, commenting, and real-time chat capabilities.

## Features
- **User Authentication:** Secure login and registration forms.
- **Navigation Bar:** Quick access to home, user profile, explore accounts, messaging, and logout.
- **Home Page:** Users can share posts with text and images, and view posts from their followings.
- **Post Interaction:** Like, save to board, and view posts individually.
- **Comments:** Add and delete comments on posts. Post authors can delete their posts and any related comments.
- **User Profile Page:** Displays user details, followers/following lists, and user posts. Includes follow/unfollow and profile viewing functionalities.
- **Profile Editing:** Users can edit their profiles and delete their accounts.
- **Boards:** Users can create, edit, and delete boards to save and organize posts.
- **Explore Accounts:** Discover and follow users not currently being followed.
- **Messaging:** Chat with any user, with support for text messages and emojis. View chat history and user online status.

## Technologies

MOSAIC is built with the MERN stack, leveraging the following key technologies:

- **MongoDB**: NoSQL database used to store user data, posts, and messages.
- **Express.js**: Web application framework for Node.js, used to build our REST API.
- **React**: A JavaScript library for building the user interface, particularly the single-page frontend application.
- **Node.js**: The JavaScript runtime environment that executes the server-side code.

### Frontend
- **React Router**: Used for handling navigation within the React application.
- **Redux**: For state management across the React app, facilitating the storage of user session states, posts, and messages.
- **Axios**: Promise-based HTTP client for making API requests from the frontend to the backend.

### Backend
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, making data interaction easier and more secure.
- **bcrypt**: For hashing and securing user passwords.
- **jsonwebtoken**: To implement JWT-based authentication, allowing secure access to the API.

### Real-Time Communication
- **Socket.IO**:  Enables real-time, bi-directional communication between web clients and servers, used for the chat feature.


## Getting Started

### Prerequisites
- Make sure you have installed node.js on your computer
- Make sure your server side `[server folder]` and socket side `[socket folder]` are correcly set up and running.
- The `.env` file will remain in the folder for demonstration purposes

### Installation
1. Install all required packages:
   ```bash
   npm install
2. Start the application
  npm start

### Do not forget to change directories, for example to enter in the right folder, when using VSCode, u need to enter in the terminal  cd socialMedia\client
