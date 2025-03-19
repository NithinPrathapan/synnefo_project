import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
const CreateJob = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log(userData);
  const [skillSet, setSkillSet] = useState([]);
  const [skill, setSkill] = useState("");

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    location: "",
    skillsRequired: skillSet,
    salary: 0,
    vaccancy: 0,
    applicationDeadLine: "",
    jobType: "",
    thumbnail: "",
  });

  console.log(formdata);
  useEffect(() => {
    formdata.skillsRequired = skillSet;
  }, [skillSet]);

  const handleChange = (e) => {
    if (e.target.file) {
      setFormdata({ ...formdata, thumbnail: e.target.files[0] });
    }
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleAddToSkillSet = (e) => {
    e.preventDefault();
    if (skill.length > 2) {
      setSkillSet([...skillSet, skill]);
      setSkill("");
    } else {
      alert("enter valid skill");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // form validation and alert all fields are required before submitting
    if (
      formdata.title === "" ||
      formdata.description === "" ||
      formdata.location === "" ||
      formdata.skillsRequired.length === 0 ||
      formdata.salary === 0 ||
      formdata.vaccancy === 0 ||
      formdata.applicationDeadLine === "" ||
      formdata.jobType === "" ||
      formdata.thumbnail === ""
    ) {
      alert("All fields are required");
      return;
    } else {
      const response = await axios.post(
        "http://localhost:4000/api/recruiter/createjob",
        formdata
      );
      console.log(response);
    }
  };
  return (
    <div className="">
      <form action="" className="flex gap-12 justify-center items-start ">
        <div className="gap-6 flex flex-col">
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Title</label>
            <input
              onChange={handleChange}
              id="title"
              name="title"
              type="text"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Description</label>
            <input
              onChange={handleChange}
              id="description"
              name="description"
              type="text"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Location</label>
            <input
              onChange={handleChange}
              id="location"
              name="location"
              type="text"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Skills Required</label>
            <div className="w-full flex border  items-center justify-center rounded-md group ">
              <input
                onChange={(e) => setSkill(e.target.value)}
                className=" "
                type="text"
                name="skill"
                value={skill}
              />
              <button
                className="bg-black ring-2  text-white h-[48px] rounded-r-md w-[60px] text-2xl font-bold"
                type="button"
                onClick={handleAddToSkillSet}
              >
                +
              </button>
            </div>
            <div className=" flex gap-2 my-2">
              {skillSet.map((skill) => (
                <div
                  key={skill}
                  className="border-1 border-black p-2 rounded-md bg-slate-300 "
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* second seciton */}
        <div className=" gap-6 flex flex-col">
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Application DeadLine</label>
            <input
              onChange={handleChange}
              id="applicationDeadLine"
              name="applicationDeadLine"
              type="date"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Job Type</label>
            <select onChange={handleChange} className="" name="jobType" id="">
              <option value="Full-time">Full-Time</option>
              <option value="Part-time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Thumbnail</label>
            <input
              onChange={handleChange}
              id="thumbnail"
              name="thumbnail"
              type="file"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Salary</label>
            <input
              onChange={handleChange}
              id="salary"
              name="salary"
              type="text"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="">Vaccancy</label>
            <input
              onChange={handleChange}
              id="vaccancy"
              name="vaccancy"
              type="text"
            />
          </div>
        </div>
      </form>
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center mx-auto my-12 w-[400px] bg-black py-2 rounded-md text-white font-semibold"
      >
        Create job
      </button>
    </div>
  );
};

export default CreateJob;
