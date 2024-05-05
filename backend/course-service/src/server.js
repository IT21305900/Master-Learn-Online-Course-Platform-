import express from "express"
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const startServer = async () => {

    try {
        app.listen(PORT, () => {
            console.log(`Course Service Started ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

export { startServer }