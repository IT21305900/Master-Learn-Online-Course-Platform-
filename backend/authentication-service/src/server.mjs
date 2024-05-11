import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";
import errorHandler from "./middleware/errorhandler.js";
import authentication from "./route/auth.router.js";
import cors from "cors";
import morgan from "morgan";
import("@kinde-oss/kinde-node-express");

//express
const app = express();

const config = {
  clientId: "",
  domain: "",
  redirectUri: "",
  logoutUri: "",
};

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
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
      console.log(`Authentication Service Started in s ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
