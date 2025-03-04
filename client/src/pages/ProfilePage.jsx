import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [role, setRole] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoaded && !isSignedIn) {
      navigate("/");
    }
  });
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  function handleSubmit(e) {}
  return (
    <div className="flex justify-between  mt-12">
      <div className="w-full flex flex-col gap-4 ">
        {/* left section */}
        <h1 className="text-2xl font-semibold uppercase">Update Profile</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action="">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">You here as?</h2>
            <select name="" id="" value={role} onChange={handleRoleChange}>
              <option value="recruiter">Recruiter</option>
              <option value="job_seeker">Job Seeker</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Address</h2>
            <input type="text" placeholder="street" />
            <input type="text" placeholder="city" />
            <input type="text" placeholder="state" />
            <input type="text" placeholder="postal code" />
          </div>
          {role === "recruiter" ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Company Details</h2>
              <input type="text" placeholder="name" />
              <input type="text" placeholder="website" />
              <input type="text" placeholder="loaction" />
              <input type="text" placeholder="description" />
              <input type="text" placeholder="Your position" />
              <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
                See Posted Jobs
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Company Details</h2>
              <input type="text" placeholder="name" />
              <input type="text" placeholder="website" />
              <input type="text" placeholder="loaction" />
              <input type="text" placeholder="description" />
              <input type="text" placeholder="Your position" />
              <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">
                See all applied jobs
              </button>
            </div>
          )}
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
