import express from "express";
import connectDB from "./database/connectDB.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  console.log("fn call");
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.post("/api/upload", (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "file not found" });
  const { fileUrl } = `http://localhost:4000/api/uploads/${file.filename}`;
  res.json({ fileUrl });
});

app.get("/api/download/:filename", (req, res) => {
  console.log("fn call");
  try {
    const filename = req.params.filename;
    console.log(filename);
    const filePath = path.join(__dirname, "uploads", filename);

    return res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return res.status(500).send("File not found or server error");
      }
    });
  } catch (error) {
    return res.status(404).json({ message: "file not found" });
  }
});

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
