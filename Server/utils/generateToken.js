import jwt from "jsonwebtoken";


 const generateToken = (res, userId) => {
  //sign a new token wit user s ID and the secret form .env
   const token = jwt.sign({
    userId
   }, process.env.JWT_SECRET, {
    expiresIn: '30d' //token expires in 30days
   });

   //set the token in an Http only cookie in the response object
   res.cookie('jwt', token,{
    httpOnly: true, //cookie inaccessible to client side scripts, for security
    sameSite: 'strict', //strict sameSite policy avoid CSRF attacks
    maxAge: 30 * 24 *60 * 60 * 1000 //Cookie expiration time for 30days
   })
}

export default generateToken;
