import express from "express";
import { updateProfile } from "../controllers/userControllers.js";
import upload from "../middlewares/multerConfig.js";
const router = express.Router();

router.post("/update/:id", upload.single("file"), updateProfile);

export default router;
