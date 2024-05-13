import dotenv from 'dotenv';
import express from "express"
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js"
import errorHandler from "./middleware/errorhandler.js";
import enrollement from "./route/enrollement.router.js";
import mongoose from "mongoose";

dotenv.config();



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", enrollement)
app.use(errorHandler);

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://kavindu:kavindu10@cluster0.ydwmmwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
           
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export { startServer };