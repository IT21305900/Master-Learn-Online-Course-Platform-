import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";
import cors from "cors";
import morgan from "morgan";
import course_router from "./router/course.router.js";
import errorHandler from "./middleware/errorhandler.js";
import { connectDB } from "./config/db.config.js";
// import authenticate from "./middleware/authenticate.mjs";

const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
  })
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/course", course_router);

app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Course Service Started ${PORT}`);
      connectDB();
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
