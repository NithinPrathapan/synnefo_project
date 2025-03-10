import express from "express";
import connectDB from "./database/connectDB.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import multer from "multer";

import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

app.use(helmet());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use(clerkMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
  console.log("fn call");
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server listening on port" + " " + PORT);
    });
  })
  .catch((error) => {
    console.log("error connecting to database", error);
  });
