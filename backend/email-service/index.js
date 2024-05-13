import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import EmailService from "./service/email.service.js";

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

const emailService = new EmailService();
// app.use(cookieParser());

// app.use(errorHandler);


const startServer = async () => {
  try {
    app.listen(PORT, async () => {
      console.log(`Email Service Started ${PORT}`);
    //   connectDB();
     await emailService.listenForMessages();
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
