# MOSAIC - Social Media App

## Introduction
The server-side of MOSAIC is built with Node.js and Express.js, providing a backend that handles authentication, data processing, and API requests. It is designed to support a set of features including user management, post interactions, real-time messaging, and more.

## Technologies and Frameworks
   - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for executing server-side code

   - **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
   - **MongoDB**: A NoSQL database used to store all user data, posts, comments, and chat messages.
   - **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying interactions with the database by providing schema -validation and relationship management.
   - **bcrypt**: A library for hashing and securing user passwords.
   - **jsonwebtoken (JWT)**: Used for secure user authentication by generating and validating tokens.
   - **Multer**: A middleware for handling multipart/form-data, which is used for uploading files. In MOSAIC, Multer is configured to facilitate image uploads for user profiles and post content, enhancing the multimedia experience.
   - **nodemon**:  Simplifies development by automatically restarting the node application when file changes in the directory are detected. This tool is used in the development environment to increase productivity and reduce downtime.

## Getting Started
### Installation
    npm install

### Set up environments
    for demonstration purposes i will let the .env in the folder, but most likely you will need to get your own MONGO_URI, by creating your own cluster on MongoDB Website, then replace the current MONGO_URI in the .env file with your own

### Do not forget to change directories, for example to enter in the right folder, when using VSCode, u need to enter in the terminal  cd socialMedia\Server