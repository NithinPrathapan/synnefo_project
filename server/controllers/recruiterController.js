import mongoose from "mongoose";
import Job from "../models/jobSchema.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      jobType,
      salary,
      location,
      vaccancy,
      skillsRequired,
      applicationDeadLine,
    } = req.body;

    console.log(req.file);

    console.log(
      req.body,
      "================================================================ req body"
    );

    if (!req.body.id || !applicationDeadLine) {
      return res.status(400).json({
        success: false,
        message: "Missing id or application deadline",
      });
    }

    console.log(req.file.filename, "file naame of the file");

    const newJob = new Job({
      title,
      description,
      jobType,
      salary: parseInt(salary),
      thumbnail: req.file.filename,
      location,
      postedBy: mongoose.Types.ObjectId(req.body.id),
      vaccancy: parseInt(vaccancy),
      skillsRequired: JSON.parse(skillsRequired) || [],

      applicationDeadLine: new Date(applicationDeadLine),
      status: "Open",
    });

    console.log("lskjdlf");

    await newJob.save();

    console.log(newJob);
    return res
      .status(201)
      .json({ success: true, message: "Job created", data: newJob });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
