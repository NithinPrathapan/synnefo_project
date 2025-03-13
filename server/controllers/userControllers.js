import JobSeeker from "../models/job_seekerSChema.js";
import Recruiter from "../models/recruiterSchema.js";
import User from "../models/userSchema.js";

export const updateProfile = async (req, res) => {
  console.log("reached updateProfile fn");
  const { id } = req.params;

  const {
    role,
    country,
    state,
    city,
    companyName,
    companyWebsite,
    companyLocation,
    companyDescription,
    position,
    experience,
    skills,
    description,
  } = req.body;

  // console.log(req.body,'req.body ');
  // console.log(role);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.address.country = country;
    user.address.state = state;
    // user.address.street = street;
    user.address.city = city;
    // user.zipcode = zipcode;
    user.role = role;
    await user.save();

    if (role === "recruiter") {
      const recruiterExist = await Recruiter.findOne({ user: id });
      if (recruiterExist) {
        recruiterExist.companyDetails.name = companyName;
        recruiterExist.companyDetails.website = companyWebsite;
        recruiterExist.companyDetails.location = companyLocation;
        recruiterExist.companyDetails.description = companyDescription;
        await recruiterExist.save();
        return res.status(200).json({
          success: true,
          message: "recruiter profile updated successfully",
        });
      }
      const recruiter = new Recruiter({
        user: user._id,
        companyDetails: {
          name: companyName,
          website: companyWebsite,
          location: companyLocation,
          description: companyDescription,
        },
        position: position,
      });
      await recruiter.save();
      return res.status(200).json({
        success: true,
        message: "recruiter profile updated successfully",
      });
    }
    const jobSeekerExist = await JobSeeker.findOne({ user: id });
    if (jobSeekerExist) {
      jobSeekerExist.experience = experience;
      jobSeekerExist.skills = skills;
      // jobSeekerExist.resume = req.file.filename;
      jobSeekerExist.description = description;
      await jobSeekerExist.save();
      return res.status(200).json({
        success: true,
        message: "jobSeeker profile updated successfully",
      });
    }
    const jobSeeker = new JobSeeker({
      user: user._id,
      experience: experience,
      skills: skills,
      resume: req.file.filename,
      description: description,
    });
    await jobSeeker.save();
    return res.status(200).json({
      success: true,
      message: "jobSeeker profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUserDetails = async (req, res) => {
  // console.log("inside the get user details function");
  try {
    const { id } = req.params;
    const user = await User.findOne({ clerkId: id }).lean();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const userData = { ...user };
    // console.log(userData, "from the backend");
    if (user.role === "job_seeker") {
      // console.log("inisde the job seeker fun");
      const jobSeeker = await JobSeeker.findOne({ user: user._id }).lean();
      if (!jobSeeker) {
        return res
          .status(404)
          .json({ success: false, message: "Job Seeker not found" });
      }

      // console.log("job seeker", jobSeeker);
      userData.jobSeeker = jobSeeker;
      // console.log(
      //   userData,
      //   "from the backend ================================================================="
      // );
      return res.status(200).json({ success: true, user: userData });
    }
    if (user.role === "recruiter") {
      // console.log("insinde the recruiter role");
      const recruiter = await Recruiter.findOne({ user: user._id }).lean();
      // console.log(
      //   recruiter,
      //   "from teh recruiter ================================================================="
      // );
      if (!recruiter) {
        return res
          .status(404)
          .json({ success: false, message: "Recruiter not found" });
      }
      userData.recruiter = recruiter;
      return res.status(200).json({
        success: true,
        message: "recruiter data found successfully",
        user: userData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "user data found successfully",
      user: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


