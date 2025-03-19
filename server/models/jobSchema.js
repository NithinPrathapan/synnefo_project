import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"],
      default: "Full-Time",
    },
    salary: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
    vaccancy: {
      type: Number,
      required: true,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    applicationDeadLine: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Pending"],
      default: "Open",
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
      },
    ],
    shortlistedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
      },
    ],
    selectedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
