export const createJob = async (req, res) => {
  try {
    const { title, description, jobType, salary, thumbnail, location } =
      req.body;

    console.log(req.file);

    const newJob = new Job({
      title,
      description,
      jobType,
      salary,
      thumbnail,
      location,
      recruiter: req.user._id,
    });

    await newJob.save();

    return res.status(201).json({ success: true, message: "Job created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
