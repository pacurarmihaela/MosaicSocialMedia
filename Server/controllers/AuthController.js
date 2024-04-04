import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/* 
Register a new user in the system.
Creates anew user with the provided firstname, lastname, username, password
Before saving the user it checks if a user wit the same username already exists to avoid duplicates
after successful creation, it generates a token for the user
*/
 export const registerUser = async(req,res)=>{
    const {firstname,lastname, username, password} = req.body;

    //Check if the user already exists in the database
    const userExists = await UserModel.findOne({username});
    if(userExists){
        return res.status(400).json({ message: 'User already exists' });
    }

    //create a new user with the provided details
    const user = await UserModel.create({
        firstname,
        lastname,
        username,
        password
    });

    if(user){
    //Generate a JWT token for the new user and send user details in the response
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        });
    }
      else{
        res.status(400);
        throw new Error('Invalid user data');
      }
    
}

/*
 Authentucate a user based on username and password
 Function checks if a user exists with the give username, then verifies the password
 If credentials are valid, it generates a JWT token for the session
*/

 export const loginUser = async(req,res)=>{
   const {username,password} = req.body;
   
   //Find user by username
   const user = await UserModel.findOne({username});
    //check if user exists and the password matches
   if(user && (await user.matchPassword(password))){
    //Generate a JWT token for the logged-in user, send user details in the response
    generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        });
    }
      else{
        res.status(400);
        throw new Error('Invalid email or password');
      }
    
}

/*
 Logs out the current user,
 This function clears the JWT cookie, logging out the user
*/

 export const logoutUser = async(Req,res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({messsage: "User logged out"})
}

