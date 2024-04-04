import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

//Middleware to authenticate requests

//Checking for a JWT token in the req cookies and validates it
//If token is valid it extracts the user Id from the token, fetching from database
//if token invalid it will send 401 - Unauthorized response

const protect = async (req, res, next) => {
    //initialize token variable
  let token;

  //log cookie for debugging
  console.log(req.cookies);

  //Attempt to retrieve the JWT token from cookies
  token = req.cookies.jwt;
  
    //IF token was found
  if (token) {
    try {
        //verify token using the secret from .env and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Retrieve the user from the database
        req.user = await UserModel.findById(decoded.userId).select('-password');
        
        //User authenticated proceed to the next middleware
        next();
    } catch (error) {
        //Log error and send 401 Unauthorized response if token verification fails
        console.error(error);
        res.status(401).json("Not authorized, token failed");
    }
} else {
    //Send a 401 Unauthorized response if no token is provided
    res.status(401).json("Not authorized, no token");
}
};

export { protect };