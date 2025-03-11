import express from "express";
import {
  getUserDetails,
  updateProfile,
} from "../controllers/userControllers.js";
import upload from "../middlewares/multerConfig.js";
const router = express.Router();

router.post("/update/:id", upload.single("file"), updateProfile);
router.get("/userdetails/:id", getUserDetails);

export default router;
