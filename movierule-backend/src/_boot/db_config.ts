import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const db=async ()=>{
    try {

        const mongoUrl=process.env.MONGO_URL;
        console.log("mogourl is here",mongoUrl);
        

        if (!mongoUrl) {
          throw new Error("MONGO_URL environment variable is not defined");
        }

        await mongoose.connect(mongoUrl.trim());
        console.log("Database connection successful");
        
    } catch (error) {
        console.error(`Database Connection failed`);
        console.error((error as Error).message);
        process.exit(1);
    }
}
