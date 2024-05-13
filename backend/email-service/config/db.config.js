import mongoose from "mongoose";

export async function connectDB() {
  const uri = `mongodb+srv://isuruakalanka071:8xICZKJslfuWrkos@masterlearn.8gdgair.mongodb.net/?retryWrites=true&w=majority&appName=MasterLearn`;
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Atlas Server Connection Error ${err}`);
  }
}
