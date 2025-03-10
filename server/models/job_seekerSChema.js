import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [String],
  experience: String,
  resume: String,
  description: String,
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);
export default JobSeeker;
