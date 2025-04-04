import express from "express";
import Job from "../models/jobSchema.js";
import mongoose from "mongoose";
import JobSeeker from "../models/job_seekerSChema.js";

export const createJob = async (req, res) => {
  console.log("create job");
  const {
    title,
    description,
    jobType,
    salary,
    thumbnail,
    location,
    vaccancy,
    skillsRequired,
    applicationDeadLine,
    postedBy,
  } = req.body;

  try {
    const job = new Job({
      title,
      description,
      jobType,
      salary,
      thumbnail,
      location,
      vaccancy,
      skillsRequired,
      applicationDeadLine,
      postedBy,
    });
    await job.save();
    return res
      .status(200)
      .json({ success: true, message: "job created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal severity error in job" });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const { id, jobSeekerId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id) &&
      !mongoose.Types.ObjectId.isValid(jobSeekerId)
    ) {
      return res.status(404).json({
        success: false,
        message: "invalid  job id or job seeker id",
      });
    }

    const jobSeeker = await JobSeeker.findById(jobSeekerId);

    if (!jobSeeker) {
      return res
        .status(404)
        .json({ success: false, message: "job seeker not found" });
    }
    if (jobSeeker.appliedJobs.includes(id)) {
      return res.status(404).json({
        success: false,
        message: "You are already applied to this job",
      });
    }

    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      jobSeekerId,
      {
        $push: { appliedJobs: id },
      },
      { new: true, runValidators: true }
    );

    if (!updatedJobSeeker) {
      return res
        .status(404)
        .json({ success: false, message: "job seeker not found" });
    }
    return res.status(200).json({
      success: true,
      message: "job applied successfully",
      data: updatedJobSeeker,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const findAppliedJobs = async (req, res) => {
  try {
    const { jobSeekerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobSeekerId)) {
      return res.status(400).json({ message: "Invalid job seeker ID" });
    }

    const jobSeeker = await JobSeeker.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(jobSeekerId),
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "appliedJobs",
          foreignField: "_id",
          as: "appliedJobs",
        },
      },
      {
        $project: {
          appliedJobs: 1,
          _id: 0,
        },
      },
    ]);

    if (!jobSeeker.length) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    console.log(jobSeeker[0]);
    return res.status(200).json({
      success: true,
      message: "fetched applied jobs successfully",
      jobs: jobSeeker[0].appliedJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
