import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();

//Parser
// app.use(express.json());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin);
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//Routes Configuration
app.use("/api", router);

const getAController = async (req: Request, res: Response) => {
  res.send("Welcome to Birthday Reminder Project");
};
app.get("/", getAController);

//Global Error Handler
app.use(globalErrorHandler);
//Not Found Route
app.use(notFound);

export default app;
