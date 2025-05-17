import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorhandler.js";
import authentication from "./route/auth.router.js";
import cors from "cors";
import morgan from "morgan";
// import authenticate from "./middleware/authenticate.mjs";
import { connectDB } from "./config/db.config.js";


const PORT = 8001

//express
const app = express();

//middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.get("/authentication/signin", (req, res, next) => {
//   res.send("Auth Sign");
// });

app.use("/authentication", authentication);

app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      connectDB();
      console.log(`Authentication Service Started in s ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
