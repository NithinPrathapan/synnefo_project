import express from "express";
import connectDB from "./database/connectDB.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import authRoutes from "./routes/authRoutes.js";

import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

app.use(helmet());

app.use(cors());

app.use(clerkMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("fn call");
  res.send("API is running");
});

app.use("/api/auth", authRoutes);

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
