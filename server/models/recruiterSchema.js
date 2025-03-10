import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyDetails: {
    companyName: { type: String },
    website: String,
    location: String,
    description: String,
  },
  position: { type: String },
  createdJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
