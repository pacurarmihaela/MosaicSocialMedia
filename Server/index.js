import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import BoardRouter from "./routes/BoardRoute.js";
import CommentRouter from "./routes/CommentRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessageRoute from "./routes/MessageRoute.js";

const app = express();

//Middleware setup
app.use(cookieParser()); //Parse cookies from request headers
app.use(express.static("public")) // Serve static files from the "public" directory
app.use("/images", express.static("images")) //Serve the image files from "Images directory"

//For loading evironment variables
dotenv.config();

//For mongoDB database connection
connectDB();

//CORS configuration to allow requests from all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//cors configuration to allow credentials from locaclhost:3000  
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    
//Setting the port for the server
const port = process.env.PORT || 5000; 


//Body Parses setup to handle JSON and URL-encoded data when it expects large sets of data 
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//Route fir initial page
app.get("/", (req,res)=> res.send('Server is ready!'));

//Routes setup 
app.use('/auth', AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/comment", CommentRouter);
app.use("/upload", UploadRoute);
app.use("/board", BoardRouter);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

//Starting the server
app.listen(port, ()=> console.log(`Server works on ${port}`));