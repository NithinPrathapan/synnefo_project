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
      id,
    } = req.body;

    console.log(
      typeof id,
      "============================= ================================================="
    );

    console.log(req.file);

    console.log(
      req.body,
      "================================================================ req body"
    );

    if (!id || !applicationDeadLine) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: id or application deadline.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Job thumbnail is required.",
      });
    }

    let parsedSkills = [];

    try {
      parsedSkills =
        typeof skillsRequired === "string"
          ? JSON.parse(skillsRequired)
          : skillsRequired;
      if (!Array.isArray(parsedSkills))
        throw new Error("Invalid skills format");
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid format for skillsRequired. Must be a valid JSON array.",
      });
    }

    const jobData = {
      title,
      description,
      thumbnail: req.file.filename,
      jobType,
      salary: Number(salary) || 0,
      location,
      vaccancy: Number(vaccancy) || 0,
      skillsRequired: parsedSkills,
      postedBy: id,
      applicationDeadLine: new Date(applicationDeadLine),
      status: "Open",
    };

    console.log(jobData);

    const newJob = await Job.create(jobData);
    return res
      .status(201)
      .json({ success: true, message: "Job created", data: newJob });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

export const getJobsPostedByRecruiter = async (req, res) => {
  const recruiterId = req.params.id;
  console.log(recruiterId);
  try {
    const jobs = await Job.find({ postedBy: recruiterId })

      .populate("postedBy", "position companyDetails")
      .select(
        "_id title description location salary postedBy applicationDeadLine status vaccancy jobType "
      )
   

    return res
      .status(200)
      .json({ success: true, message: "jobs found successfully", jobs: jobs });
  } catch (error) {
    console.log(error, "error file finding jobs");
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error: error });
  }
};
