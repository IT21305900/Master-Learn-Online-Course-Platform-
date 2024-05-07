import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";

import lesson_router from "./router/lesson.router.js";
import course_router from "./router/course.router.js";
import errorHandler from "./middleware/errorhandler.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/courses", course_router);
app.use("/lessons", lesson_router);

app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Course Service Started ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
