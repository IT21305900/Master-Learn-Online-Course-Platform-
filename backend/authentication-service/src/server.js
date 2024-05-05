import express from "express"
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js"
import errorHandler from "./middleware/errorhandler.js";
import authentication from "./route/auth.router.js"

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authentication)
app.use(errorHandler);

const startServer = async () => {


    try {
        app.listen(PORT, () => {
            console.log(`Authentication Service Started in s ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

export { startServer }