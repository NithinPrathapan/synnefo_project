import express from "express";
import { createJob } from "../controllers/recruiterController.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/createjob", upload.single("file"), createJob);

export default router;
