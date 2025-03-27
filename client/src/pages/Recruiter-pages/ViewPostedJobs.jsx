import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/recruiterSlice";

const ViewPostedJobs = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = userData?.recruiter?._id;
    console.log(userId);
    if (!userId) {
      console.log("user not found");
      return;
    }
    dispatch(fetchJobs(userId));
  }, [dispatch, userData?.recruiter?._id]);

  return <div></div>;
};

export default ViewPostedJobs;
