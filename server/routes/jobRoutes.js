import express from "express";
import { applyToJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/:id/:jobSeekerId", applyToJob);

export default router;
