import express from "express";
import Job from "../models/jobSchema.js";

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
      .json({ success: false, message: "internal severity error" });
  }
};
