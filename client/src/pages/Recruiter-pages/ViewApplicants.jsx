import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewApplicants = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  async function fetchApplicants() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruiter/viewapplicants/${id}`
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  }

  console.log(id);
  return <div>ViewApplicants</div>;
};

export default ViewApplicants;
