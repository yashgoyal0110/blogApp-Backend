import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const DBcon = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected successfully");
    }
    catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}

export default DBcon;