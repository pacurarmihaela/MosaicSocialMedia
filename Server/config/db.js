import mongoose from "mongoose";

//Establish connection with MongoDb
const connectDB = async() => {
    try{
        //Connecting to MongoDb using the provided URI from .env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        //Logging a success message if connection is established
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(error){
        //Logging an error messafe and exiting the process if connection fails
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;