import express from "express";
import {
  getAllJobs,
  getUserDetails,
  updateProfile,
} from "../controllers/userControllers.js";
import upload from "../middlewares/multerConfig.js";
const router = express.Router();

router.post("/update/:id", upload.single("file"), updateProfile);
router.get("/userdetails/:id", getUserDetails);
router.get("/alljobs", getAllJobs);

export default router;
