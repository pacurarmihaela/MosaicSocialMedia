import express from "express";
const router = express.Router();
import multer from 'multer';


//configure multer storage settings
const storage = multer.diskStorage({
    //Set destination to store the uploaded files,"public/images"
    destination: (req,file, cb)=>{
        cb(null, "public/images");
    },
    //Set the filename for the stored files, in the reqbody
    filename: (req,file, cb)=>{
        cb(null, req.body.name);
    },
})

//Initialize multer with the defined storage settings
const upload = multer({storage: storage})

//POST route for file upload
router.post('/', upload.single("file"), (req,res)=>{
    try{
        //sends 200 OK response with a succcess message
      return res.status(200).json("File Uploaded Successfully")
    }catch(error){
        //Log any errors that occurs
        console.log(error);
    }
})

export default router;