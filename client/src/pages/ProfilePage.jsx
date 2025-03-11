import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProfilePage = () => {
  const [role, setRole] = React.useState("");
  const [resume, setResume] = useState(null);

  console.log(role);

  console.log(resume);
  const [upDatedData, setUpDatedData] = React.useState({
    country: "",
    state: "",
    city: "",
    companyName: "",
    companyWebsite: "",
    companyLocation: "",
    companyDescription: "",
    position: "",
    resume: resume,
  });
  const [errors, setErrors] = React.useState({});

  console.log(upDatedData, "updated data");
  const navigate = useNavigate();
  const diapatch = useDispatch();

  const { isSignedIn, user, isLoaded } = useUser();
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoaded && !isSignedIn) {
      navigate("/");
    }
  });

  const validateForm = () => {
    let tempErrors = {};

    // Common fields validation
    if (!upDatedData.country?.trim())
      tempErrors.country = "Country is required";
    if (!upDatedData.state?.trim()) tempErrors.state = "State is required";
    if (!upDatedData.city?.trim()) tempErrors.city = "City is required";

    if (role === "recruiter") {
      if (!upDatedData.companyName?.trim())
        tempErrors.companyName = "Company Name is required";
      if (!upDatedData.companyWebsite?.trim())
        tempErrors.companyWebsite = "Company Website is required";
      if (!upDatedData.companyLocation?.trim())
        tempErrors.companyLocation = "Company Location is required";
      if (!upDatedData.companyDescription?.trim())
        tempErrors.companyDescription = "Company Description is required";
      if (!upDatedData.position?.trim())
        tempErrors.position = "Position is required";
    } else {
      if (!upDatedData.experience?.trim())
        tempErrors.experience = "Experience is required";
      if (!upDatedData.resume && !userData?.resume)
        tempErrors.resume = "Resume is required";
      if (!upDatedData.skills?.trim())
        tempErrors.skills = "Skills are required";
      if (!upDatedData.description?.trim())
        tempErrors.description = "Description is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setResume(e.target.files[0]);
    } else {
      setUpDatedData({
        ...upDatedData,
        [e.target.name]: e.target.value,
        file: resume,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(upDatedData);
    const formData = new FormData();
    for (const key in upDatedData) {
      formData.append(key, upDatedData[key]);
    }

    formData.append("role", role);

    try {
      const res = await axios.post(
        `http://localhost:4000/api/user/update/${userData._id}`,
        formData
      );
      console.log(res?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="flex justify-between  mt-12">
      <div className="w-full flex flex-col gap-4 ">
        {/* left section */}
        <h1 className="text-2xl font-semibold uppercase">Update Profile</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action="">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">You here as?</h2>
            <select
              className="w-[90%] md:w-[80%] px-2 py-3 outline-none border border-[#ccc] rounded-md "
              name=""
              id=""
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="recruiter">Recruiter</option>
              <option value="job_seeker">Job Seeker</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Address</h2>
            <input
              onChange={handleChange}
              type="text"
              className="w-[90%] md:w-[80%]"
              name="country"
              placeholder="country"
              value={userData?.country}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
            <input
              onChange={handleChange}
              type="text"
              className="w-[90%] md:w-[80%]"
              name="state"
              placeholder="state"
              value={userData?.state}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
            <input
              onChange={handleChange}
              type="text"
              className="w-[90%] md:w-[80%]"
              name="city"
              placeholder="city"
              value={userData?.city}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          {role === "recruiter" && role !== "" ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Company Details</h2>
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={userData?.companyName}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName}</p>
              )}
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="companyWebsite"
                placeholder="Company Website"
                value={userData?.companyWebsite}
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-sm">{errors.companyWebsite}</p>
              )}
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="companyLocation"
                placeholder="Company Location"
                value={userData?.companyLocation}
              />
              {errors.companyLocation && (
                <p className="text-red-500 text-sm">{errors.companyLocation}</p>
              )}
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="companyDescription"
                placeholder="Company Description"
                value={userData?.companyDescription}
              />
              {errors.companyDescription && (
                <p className="text-red-500 text-sm">
                  {errors.companyDescription}
                </p>
              )}
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="position"
                placeholder="Your Position"
                value={userData?.position}
              />
              {errors.position && (
                <p className="text-red-500 text-sm">{errors.position}</p>
              )}
              <button className="bg-black w-[90%] md:w-[80%] text-white px-4 py-2 rounded-md cursor-pointer">
                See Posted Jobs
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Fill Your Details</h2>
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="experience"
                placeholder="Experience in years"
                value={userData?.experience}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
              <div className="w-[90%] md:w-[80%] flex flex-col gap-1">
                <label htmlFor="resume">Resume</label>
                <input
                  onChange={handleChange}
                  className="w-full"
                  type="file"
                  name="file"
                  id="resume"
                />
                {errors.resume && (
                  <p className="text-red-500 text-sm">{errors.resume}</p>
                )}
              </div>
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="skills"
                placeholder="Your Skills (comma-separated)"
                value={userData?.skills}
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills}</p>
              )}
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="description"
                placeholder="Description"
                value={userData?.description}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <button
                type="button"
                className="bg-black w-[90%] md:w-[80%] text-white px-4 py-2 rounded-md cursor-pointer"
              >
                See all applied jobs
              </button>
            </div>
          )}
          <button
            type="submit"
            className="bg-black w-[90%] md:w-[80%] text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className="w-full">
        {/* right section */}
        right section
      </div>
    </div>
  );
};

export default ProfilePage;
