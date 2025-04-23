import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../components/userCard/UserCard";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  async function fetchApplicants() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruiter/viewapplicants/${id}`
      );

      console.log(response.data.applicants);
      setApplicants(response.data.applicants);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  }

  console.log(id);
  return (
    <div>
      {applicants.map((item, index) => {
        return <UserCard key={index} userData={item} />;
      })}
    </div>
  );
};

export default ViewApplicants;
