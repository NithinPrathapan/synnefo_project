import express from "express";
import { applyToJob, findAppliedJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/:id/:jobSeekerId", applyToJob);
router.get("/:jobSeekerId", findAppliedJobs);

export default router;
