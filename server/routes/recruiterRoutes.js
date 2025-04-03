import express from "express";
import {
  createJob,
  getJobsPostedByRecruiter,
  editJob,
} from "../controllers/recruiterController.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/createjob", upload.single("file"), createJob);
router.get("/getAllJobs/:id", getJobsPostedByRecruiter);
router.post("/editJob/:id", upload.single("file"), editJob);

export default router;
