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
        "_id title description location salary postedBy applicationDeadLine status vaccancy jobType thumbnail applicants createdAt skillsRequired"
      );

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

export const editJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.aggregate([]);

  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

export const getApplicantsTothisJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate({
      path: "applicants",
      select: "skills experiance resume user",
      populate: {
        path: "user",
        select: "firstName lastName imageUrl phoneNumber",
      },
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "applicants not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "applicants found",
      applicants: job.applicants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error,
    });
  }
};

export const shortLIstOrSelectOrRejectApplicant = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId, action } = req.body;

    const uid = userId.toString();
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }
    const isSelected = job.selectedApplicants.includes(uid);
    if (action === "shortlist") {
      if (!isSelected) {
        if (!job.shortlistedApplicants.includes(uid)) {
          job.shortlistedApplicants.push(uid);
          await job.save();
          return res.status(200).json({
            success: true,
            message: "applicant shortlisted successfully",
          });
        } else {
          return res.status(409).json({
            success: false,
            message: "Applicant already shortlisted",
          });
        }
      } else {
        return res.status(409).json({
          success: false,
          message: "Applicant already selected",
        });
      }
    }

    if (action === "reject") {
      if (isSelected) {
        job.selectedApplicants = job.selectedApplicants.filter((id) => {
          return id.toString() !== uid;
        });
      }
      job.shortlistedApplicants = job.shortlistedApplicants.filter((id) => {
        return id.toString() !== uid;
      });
      await job.save();
      return res.status(200).json({
        success: true,
        message: "Applicant rejected successfully",
      });
    }

    if (action === "select") {
      if (isSelected) {
        return res.status(409).json({
          success: false,
          message: "Applicant already selected",
        });
      }
      const isShortListed = job.shortlistedApplicants.includes(uid);
      console.log(isShortListed);
      if (!isShortListed) {
        if (!isSelected) {
          job.selectedApplicants.push(uid);
          await job.save();
          return res.status(200).json({
            success: true,
            message: "Applicant selected successfully",
          });
        }
      }
      job.shortlistedApplicants = job.shortlistedApplicants.filter((id) => {
        return id.toString() !== uid;
      });
      if (!job.selectedApplicants.includes(uid)) {
        job.selectedApplicants.push(uid);
      }
      await job.save();
      return res.status(200).json({
        success: true,
        message: "Applicant selected successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
