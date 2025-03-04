import mongoose, { mongo } from "mongoose";

const recruiterSchema = new mongoose.Schema({
  companyDetails: {
    name: {
      type: String,
      required: true,
    },
    website: String,
    location: String,
    description: String,
  },
  postition: {
    type: String,
    required: true,
  },
  createdJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Recruiter = new mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
