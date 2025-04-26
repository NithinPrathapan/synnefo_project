import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditJob = () => {
  const { postedJobs } = useSelector((state) => state.recruiter);
  const { id } = useParams();
  console.log(postedJobs);

  const [newThumbnail, setNewThumbnail] = useState(null);

  const job = postedJobs.find((job) => job._id === id);
  const today = new Date().toISOString().split("T")[0];
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    location: "",
    skillsRequired: [],
    salary: "",
    vaccancy: "",
    applicationDeadLine: "",
    jobType: "",
    thumbnail: null,
  });

  const [skill, setSkill] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (job) {
      setFormdata({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        skillsRequired: job.skillsRequired || [],
        salary: job.salary || "",
        vaccancy: job.vaccancy || "",
        applicationDeadLine: job.applicationDeadLine || "",
        jobType: job.jobType || "",
        thumbnail: job.thumbnail || null,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setThumbnail(files[0]);
      setNewThumbnail(URL.createObjectURL(files[0]));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddToSkillSet = (e) => {
    e.preventDefault();
    if (skill.trim().length > 2) {
      setFormdata((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill],
      }));
      setSkill("");
    } else {
      alert("Enter a valid skill (min 3 letters)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    Object.keys(formdata).forEach((key) => {
      if (Array.isArray(formdata[key])) {
        updatedFormData.append(key, JSON.stringify(formdata[key]));
      } else {
        updatedFormData.append(key, formdata[key]);
      }
    });

    if (thumbnail) {
      updatedFormData.append("file", thumbnail);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/recruiter/updatejob/${id}`,
        updatedFormData
      );
      console.log("Job Updated:", response.data);
      alert("Job Updated Successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };
  const handleRemoveSkill = (indexToRemove) => {
    setFormdata((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-4/5 md:w-3/5 mx-auto lg:flex gap-6 lg:justify-evenly"
      >
        <div className="gap-6 flex flex-col justify-center">
          {/* First Column */}
          <div className="flex flex-col gap-1">
            <label>Title</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="title"
              name="title"
              value={formdata.title}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Description</label>
            <textarea
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              cols={30}
              rows={5}
              onChange={handleChange}
              id="description"
              name="description"
              value={formdata.description}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Location</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="location"
              name="location"
              value={formdata.location}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Skills Required</label>
            <div className="w-full flex border items-center justify-center rounded-md">
              <input
                className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
                onChange={(e) => setSkill(e.target.value)}
                type="text"
                name="skill"
                value={skill}
              />
              <button
                className="bg-black text-white h-[48px] rounded-r-md w-[60px] text-2xl font-bold"
                type="button"
                onClick={handleAddToSkillSet}
              >
                +
              </button>
            </div>

            <div className="flex gap-2 my-2 flex-wrap">
              {formdata.skillsRequired.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-black px-2 py-1 rounded-md bg-slate-300 text-black"
                >
                  <span>{skill}</span>
                  <button
                    type="button "
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="gap-6 flex flex-col">
          <div className="flex flex-col gap-1">
            <label>Application Deadline</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="applicationDeadLine"
              name="applicationDeadLine"
              type="date"
              value={formdata.applicationDeadLine.split("T")[0]}
              min={today}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Job Type</label>
            <select
              onChange={handleChange}
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              name="jobType"
              value={formdata.jobType}
            >
              <option value="">Choose Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Thumbnail (Optional)</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="thumbnail"
              name="thumbnail"
              type="file"
            />
            <div>
              {newThumbnail ? (
                <img
                  src={newThumbnail}
                  alt="New Thumbnail Preview"
                  width={400}
                  className="object-cover rounded-md"
                />
              ) : formdata.thumbnail ? (
                // Display the existing thumbnail from the backend if no new file is selected
                <img
                  src={`http://localhost:4000/uploads/${formdata.thumbnail}`}
                  alt="Existing Thumbnail"
                  width={400}
                  className="object-cover rounded-md"
                />
              ) : (
                <div>No Thumbnail Selected</div> // If no thumbnail exists or selected
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>Salary</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="salary"
              name="salary"
              value={formdata.salary}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Vacancy</label>
            <input
              className="border-2 border-gray-300 py-2 px-2 rounded-md outline-none"
              onChange={handleChange}
              id="vaccancy"
              name="vaccancy"
              value={formdata.vaccancy}
              type="text"
            />
          </div>
        </div>
      </form>
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center mx-auto my-12 w-[400px] bg-black py-3 cursor-pointer hover:bg-[#0000009c] rounded-md text-white font-semibold"
      >
        Update Job
      </button>
    </div>
  );
};

export default EditJob;
