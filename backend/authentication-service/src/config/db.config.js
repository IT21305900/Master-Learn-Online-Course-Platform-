
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  const uri = `mongodb+srv://isuruakalanka071:8xICZKJslfuWrkos@masterlearn.8gdgair.mongodb.net/?retryWrites=true&w=majority&appName=MasterLearn`;
  
  if (!uri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }
  
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Atlas Server Connection Error ${err}`);
    throw err;
  }
}