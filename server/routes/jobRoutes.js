import express from "express";
import {
  applyToJob,
  fetchSavedJobsByJobSeeker,
  findAppliedJobs,
  saveJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/:id/:jobSeekerId", applyToJob);
router.get("/:jobSeekerId", findAppliedJobs);
router.post("/savejob/:id/:jobSeekerId", saveJob);
router.get("/savedJobs/:jobSeekerId", fetchSavedJobsByJobSeeker);

export default router;
