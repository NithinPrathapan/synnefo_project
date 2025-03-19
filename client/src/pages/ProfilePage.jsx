import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProfilePage = () => {
  const { userData } = useSelector((state) => state.auth);

  const [role, setRole] = React.useState(userData?.role || null);
  const [resume, setResume] = useState(null);
  const [updateButton, setUpdateButton] = useState(false);
  console.log(userData);
  console.log(role, "role changed");
  const [upDatedData, setUpDatedData] = React.useState({
    country: userData?.address?.country || "",
    state: userData?.address?.state || "",
    city: userData?.address?.city || "",
    companyName: userData?.recruiter?.companyDetails?.companyName || "",
    companyWebsite: userData?.recruiter?.companyDetails?.website || "",
    companyLocation: userData?.recruiter?.companyDetails?.location || "",
    companyDescription: userData?.recruiter?.companyDetails?.description || "",
    position: userData?.recruiter?.position || "",
    experience: userData?.jobSeeker?.experience || "",
    skills: userData?.jobSeeker?.skills || [],
    description: userData?.jobSeeker?.description || "",
  });
  const [errors, setErrors] = React.useState({});

  console.log(upDatedData, "updated data");
  const navigate = useNavigate();
  const diapatch = useDispatch();

  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded && !isSignedIn) {
      navigate("/");
    }
  });

  const fileName = encodeURIComponent(userData?.jobSeeker?.resume);
  console.log(fileName);

  async function downloadResume() {
    try {
      window.location.href = `http://localhost:4000/uploads/${fileName}`;
    } catch (error) {
      console.log(error, "failed to download resume");
    }
  }

  const data = userData?.jobSeeker?.resume.split("-")[0];
  console.log(data);

  // async function fettchFile() {
  //   const response = await axios.get(
  //     `http://localhost:4000/${userData?.jobSeeker?.resume}`
  //   );
  //   console.log(response, "kskdfhkhdskf");
  // }

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
    console.log(updateButton);
    if (e.target.type === "file") {
      setResume(e.target.files[0]);
    } else {
      setUpDatedData({
        ...upDatedData,
        [e.target.name]: e.target.value,
        file: resume,
      });
    }
    setUpdateButton(true);
  };
  const handleSubmit = async (e) => {
    setUpdateButton(false);
    e.preventDefault();
    console.log(upDatedData, "before the form submisstion");
    const formData = new FormData();
    for (const key in upDatedData) {
      formData.append(key, upDatedData[key]);
    }

    formData.append("role", role);
    if (role === "job_seeker") {
      formData.append("file", resume);
    }

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
            <h2 className="text-2xl font-semibold">
              {userData && userData.role ? "Role" : "Select Role"}
            </h2>
            {userData && userData?.role ? (
              <p className="uppercase w-[400px]  ">{userData.role}</p>
            ) : (
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                id=""
              >
                <option value="recruiter">Recruiter</option>
                <option value="job_seeker">Job Seeker</option>
              </select>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Address</h2>
            <input
              onChange={handleChange}
              type="text"
              className="w-[90%] md:w-[80%]"
              name="country"
              placeholder="country"
              value={upDatedData.country}
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
              value={upDatedData.state}
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
              value={upDatedData.city}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          {role === "recruiter" ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Company Details</h2>
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={upDatedData.companyName}
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
                value={upDatedData.companyWebsite}
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
                value={upDatedData.companyLocation}
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
                value={upDatedData.companyDescription}
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
                value={upDatedData.position}
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
                value={upDatedData?.experience}
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
                <p>{upDatedData?.resume}</p>

                {userData && userData?.jobSeeker?.resume && (
                  <div className="flex  items-center  gap-6 relative  relativeborder border">
                    <div className="w-[40px] h-[60px] text-white  bg-[#F80707] flex items-center justify-center">
                      Pdf
                    </div>
                    <div className="flex flex-col ">
                      <h1>{data}</h1>
                      <button
                        type="button"
                        onClick={downloadResume}
                        className=" cursor-pointer   absolute right-12 text-blue-600 "
                        href=""
                      >
                        download
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <input
                onChange={handleChange}
                className="w-[90%] md:w-[80%]"
                type="text"
                name="skills"
                placeholder="Your Skills (comma-separated)"
                value={upDatedData.skills}
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
                value={upDatedData.description}
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
            onClick={handleSubmit}
            disabled={!updateButton}
            type="submit"
            className={`bg-black w-[90%] md:w-[80%] text-white px-4 py-2 rounded-md cursor-pointer ${
              !updateButton && "opacity-50 cursor-not-allowed"
            }`}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
