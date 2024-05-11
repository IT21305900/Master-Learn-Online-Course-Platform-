import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";
import cors from "cors";
import morgan from "morgan";
import lesson_router from "./router/lesson.router.js";
// import course_router from "./router/course.router.js";
import errorHandler from "./middleware/errorhandler.js";
import { connectDB } from "./config/db.config.js";
 
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use(morgan("dev"));

app.use("/lesson", lesson_router);

app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Lesson Service Started ${PORT}`);
      connectDB();
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
